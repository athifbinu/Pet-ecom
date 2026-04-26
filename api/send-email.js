import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { formData, productList, totalAmount } = req.body;

    const html = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #2563eb;">🛒 New Order Received!</h2>
        
        <h3>Customer Details</h3>
        <p><b>Name:</b> ${formData.firstName} ${formData.lastName}</p>
        <p><b>Email:</b> ${formData.email}</p>
        <p><b>Phone:</b> ${formData.phone}</p>
        <p><b>Address:</b> ${formData.address}, ${formData.landmark || ""}, ${formData.city}, ${formData.pincode}, ${formData.country}</p>
        
        <hr />
        
        <h3>Order Summary</h3>
        <ul>
          ${productList
            .map(
              (p, i) =>
                `<li>${i + 1}. ${p.name} - ₹${p.price} x ${p.quantity} = ₹${p.total}</li>`
            )
            .join("")}
        </ul>
        
        <h3 style="color: #1e293b;">Total: ₹${totalAmount}</h3>
      </div>
    `;

    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // You need to verify a domain on Resend for production
      to: process.env.ADMIN_EMAIL || "mtmvetinerymedicalspkpm@gmail.com",
      subject: \`New Order from \${formData.firstName} \${formData.lastName}\`,
      html,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Resend error:", error);
    res.status(500).json({ error: error.message });
  }
}
