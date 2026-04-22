import crypto from 'crypto';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { name, email, amount, cart } = req.body;
    
    const apiKey = process.env.FLOW_API_KEY;
    const secretKey = process.env.FLOW_SECRET_KEY;
    const apiUrl = process.env.FLOW_API_URL;
    
    // Asumimos que estás usando Vercel. VERCEL_URL es la variable oficial automática.
    // Si estás en local (localhost), usamos un puerto por defecto.
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : (process.env.APP_URL || 'http://localhost:3000');

    if (!apiKey || !secretKey || !apiUrl) {
      return res.status(500).json({ error: 'Faltan las credenciales de Flow en las variables de entorno' });
    }

    // Parámetros para Flow
    const params: Record<string, string> = {
      apiKey: apiKey,
      commerceOrder: `EDAX_${Date.now()}`,
      subject: 'Compra Merchandising EDAX',
      currency: 'PEN', // Especificamos Soles Peruanos
      amount: Math.round(amount).toString(), // Flow requiere enteros
      email: email,
      paymentMethod: '9', // 9 = Mostrar todos los medios de pago disponibles
      urlConfirmation: `${baseUrl}/api/flow-webhook`, // Endpoint futuro para confirmar compra silenciosamente
      urlReturn: `${baseUrl}/tienda?status=success`,  // A dónde vuelve el usuario tras pagar
    };

    // 1. Ordenar llaves alfabéticamente
    const sortedKeys = Object.keys(params).sort();
    
    // 2. Concatenar llaves y valores
    let toSign = '';
    sortedKeys.forEach(key => {
      toSign += key + params[key];
    });

    // 3. Crear firma HMAC-SHA256
    const signature = crypto.createHmac('sha256', secretKey).update(toSign).digest('hex');
    params.s = signature; // Añadir firma al payload

    // 4. Preparar formulario (Flow recibe x-www-form-urlencoded)
    const formBody = new URLSearchParams();
    for (const key in params) {
      formBody.append(key, params[key]);
    }

    // 5. Llamar a la API de Flow
    const response = await fetch(`${apiUrl}/payment/create`, {
      method: 'POST',
      body: formBody,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error de Flow:', data);
      return res.status(400).json({ error: data.message || 'Error al crear la orden en Flow' });
    }

    // Flow responde con una URL base y un token. Concatenados forman el link de pago final.
    const redirectUrl = `${data.url}?token=${data.token}`;
    
    return res.status(200).json({ redirectUrl });

  } catch (error) {
    console.error('Error interno:', error);
    return res.status(500).json({ error: 'Error interno del servidor al procesar el pago' });
  }
}
