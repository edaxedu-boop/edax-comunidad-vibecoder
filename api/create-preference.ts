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

    const preference = new Preference(client);

    const body = {
      items: items || [
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
      // Metadata importante para el backend
      metadata: {
        source: 'edax_store_bricks'
      }
    };

    const response = await preference.create({ body });

    return res.status(200).json({ id: response.id });

  } catch (error: any) {
    console.error('Error al crear preferencia:', error);
    return res.status(500).json({ error: error.message });
  }
}
