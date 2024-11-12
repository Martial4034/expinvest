import * as React from 'react';
import Image from 'next/image';

interface EmailTemplateProps {
  pseudo: string;
  email: string;
  amount: number;
  type: 'USDT' | 'USD';
}

export const EmailTemplateInvestment: React.FC<EmailTemplateProps> = ({
  pseudo,
  email,
  amount,
  type
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, backgroundColor: '#f4f4f4' }}>
    <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ backgroundColor: '#25A6D5', color: '#ffffff', textAlign: 'center', padding: '20px' }}>
        <Image 
          src="https://i.imgur.com/2oXap3g.png"
          alt="Logo"
          width={150}
          height={50}
        />
      </div>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', color: '#333333' }}>Nouvelle demande d&apos;investissement</h1>
        <p style={{ fontSize: '16px', color: '#555555', lineHeight: 1.5 }}>
          Le potentiel investisseur <strong>{pseudo}</strong>, avec l&apos;email : <a href={`mailto:${email}`} style={{ color: '#25A6D5', textDecoration: 'none' }}>{email}</a>, souhaite investir <strong>{amount} {type}</strong>.
        </p>
        <Image 
          src="https://i.imgur.com/T7Kl3lC.png"
          alt="Oxelta"
          width={100}
          height={50}
        />
      </div>
    </div>
  </div>
); 