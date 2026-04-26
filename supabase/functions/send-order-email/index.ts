import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Handle CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { formData, productList, totalAmount } = await req.json();

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
              (p: any, i: number) =>
                `<li>${i + 1}. ${p.name} - ₹${p.price} x ${p.quantity} = ₹${p.total}</li>`
            )
            .join("")}
        </ul>
        
        <h3 style="color: #1e293b;">Total: ₹${totalAmount}</h3>
      </div>
    `;

    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // Note: Ensure you verify a domain in Resend for production
      to: "mtmvetinerymedicalspkpm@gmail.com",
      subject: `New Order from ${formData.firstName} ${formData.lastName}`,
      html,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
