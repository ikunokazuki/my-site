import { Resend } from 'resend';

export const prerender = false;

export async function POST({ request }: { request: Request }) {
  const formData = await request.formData();
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const subject = String(formData.get('subject') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (!name || !email || !subject || !message) {
    return new Response(
      JSON.stringify({ message: '必須項目を入力してください。' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const fromEmail = import.meta.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const toEmail = import.meta.env.RESEND_TO_EMAIL || 'tennistekunosyan@yahoo.co.jp';

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        message: 'RESEND_API_KEY が設定されていません。環境変数を設定してください。',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  try {
    const resend = new Resend(apiKey);

    const response = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `[お問い合わせ] ${subject}`,
      html: `
        <p><strong>お名前:</strong> ${name}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        <p><strong>件名:</strong> ${subject}</p>
        <p><strong>お問い合わせ内容:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    });

    if (response.error) {
      return new Response(JSON.stringify({ message: response.error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'メール送信に失敗しました。';

    return new Response(JSON.stringify({ message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
