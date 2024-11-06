import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplateInvestment } from '@/app/components/Recap/EmailTemplateInvestment';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { pseudo, email, amount, type } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'Oxelta <contact@oxelta.io>',
      to: ['contact@oxelta.io', 't.galante@gmail.com'],
      subject: "Nouvelle demande d'investissement",
      react: EmailTemplateInvestment({ 
        pseudo,
        email,
        amount,
        type
      }),
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 