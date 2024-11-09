'use client';
import { useEffect, useState } from 'react';
import rrweb from 'rrweb';
import { SessionData } from '@/app/types/recording';

interface Session {
  id: string;
  userId: string;
  timestamp: number;
  url: string;
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [replayer, setReplayer] = useState<rrweb.Replayer | null>(null);

  useEffect(() => {
    void loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const response = await fetch('/api/analytics/sessions');
      const data = await response.json();
      setSessions(data.sessions);
    } catch (error) {
      console.error('Erreur lors du chargement des sessions:', error);
    }
  };

  const replaySession = async (session: Session) => {
    try {
      const response = await fetch(session.url);
      const data: SessionData = await response.json();
      
      if (replayer) {
        replayer.destroy();
      }

      const container = document.querySelector('.replayer-container');
      if (!container) return;

      const newReplayer = new rrweb.Replayer(data.events, {
        root: container as HTMLElement,
        speed: 1,
        skipInactive: true,
      });
      
      setReplayer(newReplayer);
      newReplayer.play();
    } catch (error) {
      console.error('Erreur lors de la lecture de la session:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Sessions utilisateurs</h1>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4">
          <h2 className="text-xl mb-4">Liste des sessions</h2>
          <div className="space-y-2">
            {sessions.map((session) => (
              <div 
                key={session.id}
                className="p-2 border rounded cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSelectedSession(session);
                  void replaySession(session);
                }}
              >
                <p>Utilisateur: {session.userId}</p>
                <p>Date: {new Date(session.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border p-4">
          <h2 className="text-xl mb-4">Visualisation</h2>
          <div className="replayer-container bg-white" style={{ width: '100%', height: '600px' }} />
        </div>
      </div>
    </div>
  );
} 