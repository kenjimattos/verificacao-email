'use client';

import { useState } from 'react';
import { Mail, Shield, Clock, CheckCircle, AlertCircle, Lock, ArrowRight } from 'lucide-react';

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
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
        <span className="text-muted-foreground">·</span>
        <span className="text-muted-foreground text-xs">v1.1.0</span>
      </div>
    </div>
  );
}
