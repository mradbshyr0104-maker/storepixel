// Supabase Edge Function لإرسال الإيميلات
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = 're_123456789' // ضع مفتاح Resend هنا

serve(async (req) => {
  const { email, code } = await req.json()

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: 'متجر بكسل <onboarding@resend.dev>',
      to: email,
      subject: 'كود التحقق - متجر بكسل',
      html: `<h2>كود التحقق الخاص بك</h2><h1>${code}</h1><p>الكود صالح لمدة 10 دقائق</p>`
    })
  })

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
