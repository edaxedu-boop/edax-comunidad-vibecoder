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

    const body = {
      items: items ? items.map((i: any) => ({
        title: i.title || 'Producto EDAX',
        unit_price: Number(i.unit_price || amount),
        quantity: Number(i.quantity || 1),
        currency_id: 'PEN'
      })) : [
        {
          id: 'EDAX-CART',
          title: description || 'Compra Merch EDAX',
          quantity: 1,
          unit_price: Number(amount)
        }
      ],
      payment_methods: {
        excluded_payment_types: [],
        installments: 1
      },
      back_urls: {
        success: `${process.env.APP_URL || 'https://edax.es'}/tienda?status=success`,
        failure: `${process.env.APP_URL || 'https://edax.es'}/tienda?status=failure`,
        pending: `${process.env.APP_URL || 'https://edax.es'}/tienda?status=pending`
      },
      auto_return: 'approved' as const,
    };

    const response = await preference.create({ body });
    return res.status(200).json({ id: response.id });

  } catch (error: any) {
    console.error('Error al crear preferencia:', error);
    return res.status(500).json({ 
      error: 'No se pudo crear la preferencia de pago',
      message: error.message 
    });
  }
}
