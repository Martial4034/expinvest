import { NextResponse } from 'next/server';
import { storageAdmin } from '@/app/firebaseAdmin';
import { Timestamp } from "firebase/firestore";

export async function POST() {
  try {
    const [files] = await storageAdmin.getFiles({ prefix: 'sessions/' });
    
    const sessions = await Promise.all(
      files.map(async (file) => {
        const [metadata] = await file.getMetadata();
        
        return {
          id: file.name.split('/')[1],
          userId: metadata.metadata?.userId || 'anonymous',
          timestamp: Timestamp.now(),
          url: await file.getSignedUrl({
            action: 'read',
            expires: new Date(Date.now() + 1000 * 60 * 60).toISOString(), // Convertir en string ISO
          })
        };
      })
    );

    return NextResponse.json({ sessions, success: true });
  } catch (error) {
    console.error('Erreur lors de la récupération des sessions:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 