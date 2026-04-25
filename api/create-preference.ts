import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || '' 
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { amount, description, items } = req.body;

    if (!amount && (!items || items.length === 0)) {
      return res.status(400).json({ error: 'Monto o items son requeridos' });
    }

    const preference = new Preference(client);

    // IMPORTANTE: No incluir "purpose: wallet_purchase" ya que bloquea
    // los pagos de invitados (sin cuenta MP), tickets y otros métodos.
    // Solo usarlo si quieres forzar pagos con cuenta Mercado Pago.
    const body: any = {
      items: items ? items.map((i: any) => ({
        title: String(i.title || 'Producto EDAX'),
        unit_price: Number(i.unit_price || amount),
        quantity: Number(i.quantity || 1),
        currency_id: 'PEN'
      })) : [
        {
          id: 'EDAX-CART',
          title: String(description || 'Compra Merch EDAX'),
          quantity: 1,
          unit_price: Number(amount),
          currency_id: 'PEN'
        }
      ],
    };

    const response = await preference.create({ body });
    console.log('Preferencia creada con éxito:', response.id);
    return res.status(200).json({ id: response.id });

  } catch (error: any) {
    console.error('Error al crear preferencia MP:', error);
    return res.status(500).json({ 
      error: 'No se pudo crear la preferencia de pago',
      message: error.message 
    });
  }
}
