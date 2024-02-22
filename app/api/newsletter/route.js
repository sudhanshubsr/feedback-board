import WelcomeEmail from '../../components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    const jsonbody = await req.json();
    const { email } = jsonbody;
    console.log(email);
  try {
    const data = await resend.emails.send({
      from: 'VoxBoard <support@sudhanshu.site>',
      to: [email],
      subject: 'VoxBoard',
      react: WelcomeEmail({ email, company: 'VoxBoard' })
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
