import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST = async () => {
  try {
    const { data, error } = await resend.emails.send({
      from: "お問い合わせ <contact@kokoronagomu.net>",
      to: "tennistekunosyan@yahoo.co.jp",
      subject: "Resendテスト",
      text: "Astroから送信できました！",
    });

    if (error) {
      return new Response(JSON.stringify(error), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (err) {
    console.error(err);

    return new Response("Server Error", {
      status: 500,
    });
  }
};