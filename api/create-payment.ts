import { MercadoPagoConfig, Payment } from 'mercadopago';

/**
 * Mercado Pago - Checkout API (Integración Avanzada / Transparente)
 * Procesa pagos directamente desde el servidor sin salir de la web.
 */

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || '' 
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { 
      token, 
      payment_method_id, 
      amount, 
      email, 
      description, 
      installments,
      identificationType,
      identificationNumber
    } = req.body;

    if (!process.env.MP_ACCESS_TOKEN) {
      return res.status(500).json({ error: 'Falta MP_ACCESS_TOKEN en el servidor' });
    }

    const payment = new Payment(client);

    const body: any = {
      transaction_amount: Number(amount),
      description: description || 'Compra Merchandising EDAX',
      payment_method_id: payment_method_id,
      payer: {
        email: email,
      },
      installments: Number(installments || 1),
      external_reference: `EDAX_WEB_${Date.now()}`,
    };

    // Si es pago con tarjeta, enviamos el token generado por MercadoPago.js
    if (token) {
      body.token = token;
      // Para tarjetas en Perú, a veces se requiere identificación (DNI)
      if (identificationType && identificationNumber) {
        body.payer.identification = {
          type: identificationType,
          number: identificationNumber
        };
      }
    }

    // Para PagoEfectivo, Mercado Pago genera un código CIP
    // Para Yape, el proceso nativo requiere tokenización previa en el frontend

    const response = await payment.create({ body });

    // Retornamos la respuesta completa para manejar los estados (approved, in_process, rejected)
    // o para obtener la URL de PagoEfectivo (external_resource_url)
    return res.status(200).json(response);

  } catch (error: any) {
    console.error('Error en Pago Directo MP:', error);
    return res.status(500).json({ 
      error: 'Error al procesar el pago',
      details: error.message || error 
    });
  }
}
