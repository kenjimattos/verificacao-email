'use client';

import { useState } from 'react';
import { Mail, Shield, Clock, Lock, ArrowRight, Github } from 'lucide-react';
import { Input, Button, Alert, Card, Badge } from './components/ui';
import { version, repository} from '@/package.json';

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
        <h1 className="text-2xl font-semibold mb-2">Verificação de E-mail</h1>
        <p className="text-muted text-sm">
          Sistema de verificação stateless com JWT
        </p>
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

      {/* Divider */}
      <div className="border-t border-border pt-6">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">Como funciona</p>
      </div>

      {/* Security Features */}
      <div className="grid gap-4 text-left">
        <Card className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm">Token JWT Assinado</p>
            <p className="text-xs text-muted mt-0.5">
              Token criptografado com HS256, impossível de falsificar sem a chave secreta
            </p>
          </div>
        </Card>

        <Card className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm">Expiração Automática</p>
            <p className="text-xs text-muted mt-0.5">
              Token expira em 5 minutos, protegendo contra uso indevido
            </p>
          </div>
        </Card>

        <Card className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm">Stateless (Sem Banco)</p>
            <p className="text-xs text-muted mt-0.5">
              Toda informação está no token, sem necessidade de armazenamento
            </p>
          </div>
        </Card>
      </div>

      {/* Tech Stack */}
      <div className="pt-4 border-t border-border">
        <div className="flex flex-wrap justify-center gap-2">
          <Badge href="https://nextjs.org">Next.js 16</Badge>
          <Badge href="https://jwt.io">JWT</Badge>
          <Badge href="https://resend.com">Resend</Badge>
          <Badge href="https://www.typescriptlang.org">TypeScript</Badge>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-3 text-sm text-muted">
        <a
          href={repository.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-primary transition-colors"
        >
          <Github className="w-5 h-5 flex-shrink-0 mt-0.5" />
          GitHub
        </a>
        <span className="text-muted-foreground">·</span>
        <span className="text-muted-foreground text-xs">v{version}</span>
      </div>
    </div>
  );
}
