'use client';

import { useState } from 'react';
import { Mail, Shield, Clock, CheckCircle, AlertCircle, Lock, ArrowRight, Github } from 'lucide-react';
import { version } from '@/package.json';

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
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            disabled={status === 'loading'}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            'Enviando...'
          ) : (
            <>
              Testar Verificação
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Status Message */}
      {status === 'success' && (
        <div className="p-4 bg-success-50 border border-success-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
          <div className="text-left">
            <p className="text-success-800 font-medium">E-mail enviado!</p>
            <p className="text-success-600 text-sm mt-1">
              Verifique sua caixa de entrada e clique no link para completar a verificação.
            </p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-error-50 border border-error-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-error-600 flex-shrink-0 mt-0.5" />
          <div className="text-left">
            <p className="text-error-800 font-medium">Erro</p>
            <p className="text-error-600 text-sm mt-1">{message}</p>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-border pt-6">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">Como funciona</p>
      </div>

      {/* Security Features */}
      <div className="grid gap-4 text-left">
        <div className="flex items-start gap-3 p-3 bg-card rounded-lg">
          <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm">Token JWT Assinado</p>
            <p className="text-xs text-muted mt-0.5">
              Token criptografado com HS256, impossível de falsificar sem a chave secreta
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-card rounded-lg">
          <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm">Expiração Automática</p>
            <p className="text-xs text-muted mt-0.5">
              Token expira em 5 minutos, protegendo contra uso indevido
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-card rounded-lg">
          <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm">Stateless (Sem Banco)</p>
            <p className="text-xs text-muted mt-0.5">
              Toda informação está no token, sem necessidade de armazenamento
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="pt-4 border-t border-border">
        <div className="flex flex-wrap justify-center gap-2">
          {['Next.js 16', 'JWT', 'Resend', 'TypeScript'].map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-card text-muted text-xs rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-3 text-sm text-muted">
        <a
          href="https://github.com/kenjimattos/verificacao-email"
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
