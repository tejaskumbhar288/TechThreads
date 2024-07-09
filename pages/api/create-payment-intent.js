const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, description, customerDetails } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'inr',
        payment_method_types: ['card'],
        description,
        shipping: {
          name: customerDetails.name,
          address: {
            line1: customerDetails.address,
            city: customerDetails.city,
            state: customerDetails.state,
            postal_code: customerDetails.pincode,
            country: 'IN',
          },
        },
        receipt_email: customerDetails.email,
      });

      res.status(200).send({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      console.error('Error creating payment intent:', err); // Log the error
      res.status(500).send({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
