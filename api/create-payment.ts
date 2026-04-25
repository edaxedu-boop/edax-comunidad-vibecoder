import { MercadoPagoConfig, Preference } from 'mercadopago';

/**
 * Mercado Pago API Integration - V2 SDK
 * Soporta Yape, PagoEfectivo y tarjetas en Perú.
 */

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || '' 
});

export default async function handler(req: any, res: any) {
  // Solo permitimos peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { name, email, amount, cart, phone } = req.body;

    // Validación de credenciales
    if (!process.env.MP_ACCESS_TOKEN) {
      console.error('Error: MP_ACCESS_TOKEN no configurado.');
      return res.status(500).json({ error: 'Configuración del servidor incompleta (Falta Token)' });
    }

    // Determinar la URL base para los retornos
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : (process.env.APP_URL || 'http://localhost:3000');

    const preference = new Preference(client);

    // Estructura de la preferencia optimizada para Mercado Pago Perú
    const body = {
      items: cart.map((item: any) => ({
        id: item.id,
        title: item.name,
        description: `Talla: ${item.size} | Color: ${item.color}`,
        quantity: 1,
        unit_price: Number(item.price),
        currency_id: 'PEN'
      })),
      payer: {
        name: name,
        email: email,
        phone: {
          number: phone
        }
      },
      back_urls: {
        success: `${baseUrl}/tienda?status=success`,
        failure: `${baseUrl}/tienda?status=failure`,
        pending: `${baseUrl}/tienda?status=pending`
      },
      auto_return: 'approved',
      // Identificador único de la transacción para tu base de datos
      external_reference: `EDAX_${Date.now()}`,
      // Texto que aparecerá en el resumen de la tarjeta del cliente
      statement_descriptor: 'EDAX VIBECODER',
      // Configuración de métodos de pago
      payment_methods: {
        excluded_payment_types: [
          { id: 'ticket' } // Ejemplo: Excluir pagos físicos en agentes si prefieres solo digital
        ],
        installments: 1, // Limitar a 1 cuota por defecto
      },
      // Metadatos adicionales para control interno
      metadata: {
        source: 'EDAX Community Web',
        customer_name: name
      }
    };

    const response = await preference.create({ body });

    // El init_point es la URL a la que el frontend debe redirigir al usuario
    return res.status(200).json({ 
      redirectUrl: response.init_point,
      preferenceId: response.id 
    });

  } catch (error: any) {
    console.error('Error detallado de Mercado Pago:', error.message || error);
    return res.status(500).json({ 
      error: 'Error al procesar el pago con Mercado Pago',
      details: error.message 
    });
  }
}
