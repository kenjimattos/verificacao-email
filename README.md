# Verificação de E-mails

> **Projeto de Portfolio** — API REST de verificação de e-mail com foco em segurança e boas práticas. Implementação stateless com JWT, rate limiting e CORS configurável.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

🔗 **Demo:** [verificacao-email.vercel.app](https://verificacao-email.vercel.app/)

## Sobre o Projeto

Este projeto implementa uma **API REST de verificação de e-mail do zero**, sem depender de serviços de autenticação prontos (Auth.js, Clerk, Firebase Auth).

O objetivo é demonstrar domínio em:

- **Design de API REST** — Endpoints bem definidos, status codes corretos, headers informativos
- **Segurança** — CORS com allowlist, rate limiting, validação de input, tokens seguros
- **Arquitetura** — Separação de responsabilidades, módulos reutilizáveis, configuração centralizada
- **TypeScript** — Strict mode, tipagem completa, sem `any`

### Por que implementar do zero?

Em produção, soluções como Auth.js ou Clerk são recomendadas. Este projeto existe para demonstrar **compreensão profunda** do que essas ferramentas fazem internamente.

## API

### `POST /api/send-verification`

Gera um token JWT e envia o e-mail de verificação.

```bash
curl -X POST 'http://localhost:3000/api/send-verification' \
  -H 'Content-Type: application/json' \
  -d '{"email": "usuario@exemplo.com"}'
```

| Status | Resposta | Quando |
|--------|----------|--------|
| `200` | `{"message": "E-mail de verificação enviado com sucesso"}` | E-mail enviado |
| `400` | `{"error": "E-mail é obrigatório"}` | Body sem email |
| `400` | `{"error": "E-mail inválido"}` | Formato inválido |
| `429` | `{"error": "Muitas requisições..."}` | Rate limit excedido |
| `500` | `{"error": "Erro interno do servidor"}` | Falha no envio |

**Headers de Rate Limiting:**

```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 4
X-RateLimit-Reset: 60
```

### `GET /api/confirm-verification?token=<jwt>`

Valida o token JWT e redireciona o usuário.

| Resultado | Redirecionamento |
|-----------|------------------|
| Token válido | `/success?email=usuario@exemplo.com` |
| Token expirado | `/error?message=O token de verificação expirou` |
| Token inválido | `/error?message=Token de verificação inválido` |

### Fluxo Completo

```
┌─────────────┐     ┌───────────────────┐     ┌─────────────────┐
│  Sua App    │────▶│  POST /api/       │────▶│  Resend (SMTP)  │
│             │     │  send-verification│     │                 │
└─────────────┘     └───────────────────┘     └─────────────────┘
                            │
                            │ JWT Token (HS256, 5min)
                            ▼
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Usuário    │────▶│  GET /api/       │────▶│  /success ou    │
│  clica link │     │  confirm-verif   │     │  /error         │
└─────────────┘     └──────────────────┘     └─────────────────┘
```

## Segurança

| Camada | Implementação |
|--------|---------------|
| **Autenticação de token** | JWT assinado com HS256 via `jose` |
| **Expiração** | Token expira em 5 minutos |
| **Rate Limiting** | Sliding window por IP (5 req/min configurável) |
| **CORS** | Allowlist de origins via variável de ambiente |
| **Validação de input** | Regex para e-mail no backend |
| **Env vars obrigatórias** | Falha ao iniciar se `JWT_SECRET` ou `RESEND_API_KEY` não definidas |
| **TypeScript strict** | Tipagem completa, sem fallbacks inseguros |

## Decisões Técnicas

| Decisão | Alternativa | Motivo da escolha |
|---------|-------------|-------------------|
| **JWT stateless** | Session com banco | Elimina dependência de DB para caso simples |
| **jose** | jsonwebtoken | Compatível com Edge Runtime do Vercel |
| **Rate limit in-memory** | Redis/Upstash | Zero dependência externa; suficiente para single-instance |
| **CORS dinâmico** | Wildcard `*` | Segurança; valida origin por request |
| **Validação com regex** | Zod/Yup | Caso simples; sem overhead de lib para 1 campo |

## Instalação

```bash
git clone https://github.com/kenjimattos/verificacao-email.git
cd verificacao-email
npm install
cp .env.example .env.local
npm run dev
```

## Variáveis de Ambiente

```env
# Obrigatórias
JWT_SECRET=            # openssl rand -base64 32
RESEND_API_KEY=        # https://resend.com
EMAIL_FROM=noreply@seudominio.com

# Segurança
ALLOWED_ORIGINS=http://localhost:3000   # separados por vírgula

# Rate Limiting (opcional)
RATE_LIMIT_MAX=5             # requisições por janela
RATE_LIMIT_WINDOW_MS=60000   # janela em ms (1 min)
```

> `JWT_SECRET` e `RESEND_API_KEY` são obrigatórios. A aplicação lança erro ao iniciar se não estiverem definidos.

## Estrutura do Projeto

```
├── app/
│   ├── api/
│   │   ├── send-verification/      # POST - gera JWT e envia e-mail
│   │   └── confirm-verification/   # GET - valida JWT e redireciona
│   ├── components/ui/              # Componentes reutilizáveis
│   ├── success/                    # Página de verificação bem-sucedida
│   └── error/                      # Página de erro
├── lib/
│   ├── config.ts                   # Env vars com validação obrigatória
│   ├── jwt.ts                      # Criação e verificação de tokens
│   ├── rate-limiter.ts             # Sliding window por IP
│   ├── cors.ts                     # CORS dinâmico com allowlist
│   ├── validation.ts               # Validação de e-mail
│   ├── messages.ts                 # Mensagens centralizadas
│   └── url.ts                      # Helper de URL base
└── package.json
```

## Tecnologias

- [Next.js 16](https://nextjs.org/) — Framework React com App Router
- [TypeScript](https://www.typescriptlang.org/) — Strict mode
- [jose](https://github.com/panva/jose) — JWT para Edge Runtime
- [Resend](https://resend.com/) — Envio de e-mails
- [Tailwind CSS 4](https://tailwindcss.com/) — Estilização
- [React 19](https://react.dev/) — UI

## Limitações Conhecidas

Este projeto é **educacional**. Para produção, considere:

| Limitação | Solução recomendada |
|-----------|---------------------|
| Rate limit in-memory | Redis/Upstash para ambientes multi-instance |
| Sem revogação de tokens | Blacklist em cache ou tokens stateful |
| Sem re-envio de email | Endpoint de resend com cooldown |
| Sem testes automatizados | Vitest + Playwright |

## Licença

ISC — Veja [LICENSE](LICENSE) para detalhes.

---

Desenvolvido por [Kenji Mattos Kinoshita](https://github.com/kenjimattos)
