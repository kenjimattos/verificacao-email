'use client';

import { useState, useCallback } from 'react';
import { Mail, Shield, Clock, Lock, ArrowRight, Github } from 'lucide-react';
import { Input, Button, Alert, Card, Divider } from './components/ui';
import { version, repository} from '@/package.json';
import { TechStack } from './components/tech-stack';
import { LinkBadge } from './components/ui/link-badge';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
      } else {
        setStatus('error');
        setMessage(data.error);
      }
    } catch {
      setStatus('error');
      setMessage('Erro ao conectar com o servidor');
    }
  }

  return (
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h1>Verificação de E-mail</h1>
          <p>Sistema de verificação stateless com JWT</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            disabled={status === 'loading'}
          />
          <Button type="submit" disabled={status === 'loading' || !email}>
            {status === 'loading' ? (
              'Enviando...'
            ) : (
              <>
                Testar Verificação
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        {/* Status Message */}
        {status === 'success' && (
          <Alert variant="success" title="E-mail enviado!">
            Verifique sua caixa de entrada e clique no link para completar a verificação.
          </Alert>
        )}

        {status === 'error' && (
          <Alert variant="error" title="Erro">
            {message}
          </Alert>
        )}

        <Divider />

        {/* Security Features */}
        <div className="grid gap-4 text-left">

          <p className="text-label text-center">Como funciona</p>

          {cards.map((card, i) => <Cartao key={i} card={card} />)}
        </div>
        <Divider />
        <TechStack />
        {/* Footer */}
        <div className="flex items-center justify-center gap-3 text-sm text-muted">
          <LinkBadge
            href={repository.url}
            external
          >
            <Github className="w-5 h-5 shrink-0 mt-0.5" />
            GitHub
          </LinkBadge>

          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground text-xs">v{version}</span>
        </div>
      </div>
  );
}

interface ICard {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const cards: ICard[] = [
  {
    title: 'Token JWT Assinado',
    description: 'Token criptografado com HS256, impossível de falsificar sem a chave secreta',
    Icon: Lock,
  },
  {
    title: 'Expiração Automática',
    description: 'Token expira em 5 minutos, protegendo contra uso indevido',
    Icon: Clock,
  },
  {
    title: 'Stateless (Sem Banco)',
    description: 'Toda informação está no token, sem necessidade de armazenamento',
    Icon: Shield,
  },
];

const Cartao = ({ card }: { card: ICard }) => {
  return (
    <Card className="flex items-start gap-3">
      <card.Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
      <div>
        <h2>{card.title}</h2>
        <small>{card.description}</small>
      </div>
    </Card>
  );
};