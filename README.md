# Verificação de E-mails

> **Projeto de Portfolio** — Implementação didática de verificação de e-mail stateless para demonstrar boas práticas em Next.js, TypeScript e segurança web.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

🔗 **Demo:** [verificacao-email.vercel.app](https://verificacao-email.vercel.app/)

## Sobre o Projeto

Este projeto implementa um sistema de verificação de e-mail **do zero**, sem depender de serviços de autenticação prontos (Auth.js, Clerk, Firebase Auth). O objetivo é demonstrar:

- Compreensão profunda do fluxo de verificação de e-mail
- Implementação segura de tokens JWT
- Boas práticas de segurança (CORS, validação, sanitização)
- Arquitetura limpa com separação de responsabilidades
- Componentização e reutilização de código

### Por que não usar Auth.js/Clerk/Firebase?

Em produção, essas soluções são recomendadas. Este projeto existe para:

1. **Demonstrar conhecimento** — Entender o que acontece "por baixo dos panos"
2. **Aprendizado** — Servir como referência para estudos
3. **Customização total** — Cenários onde libs prontas não atendem

## Como Funciona

```
┌─────────────┐     ┌───────────────────┐     ┌─────────────────┐
│  Sua App    │────▶│  POST /api/       │────▶│  Resend (SMTP)  │
│             │     │  send-verification│     │                 │
└─────────────┘     └───────────────────┘     └─────────────────┘
                            │
                            │ JWT Token
                            ▼
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Usuário    │────▶│  GET /api/       │────▶│  Página de      │
│  clica link │     │  confirm-verif   │     │  Sucesso/Erro   │
└─────────────┘     └──────────────────┘     └─────────────────┘
```

1. Sua aplicação chama `POST /api/send-verification` passando o e-mail
2. A API gera um token JWT e envia o e-mail via Resend
3. O usuário clica no link do e-mail
4. A API valida o JWT e redireciona para sucesso ou erro

## Decisões Técnicas

| Decisão | Motivo |
|---------|--------|
| **JWT stateless** | Elimina necessidade de banco de dados para tokens simples |
| **jose (não jsonwebtoken)** | Compatível com Edge Runtime do Vercel |
| **CORS com allowlist** | Segurança contra requisições de origins não autorizados |
| **Env vars obrigatórias** | Falha rápida em vez de fallbacks inseguros |
| **TypeScript strict** | Maior segurança de tipos em tempo de compilação |

## Funcionalidades

- **Stateless**: Tokens JWT sem necessidade de banco de dados
- **Envio de E-mail**: Via Resend com template HTML responsivo
- **Validação de Token**: Verifica autenticidade e expiração (5 minutos)
- **Feedback Visual**: Páginas de sucesso e erro estilizadas
- **CORS Seguro**: Lista de origins permitidos via variável de ambiente

## Instalação

```bash
# Clone o repositório
git clone https://github.com/kenjimattos/verificacao-email.git
cd verificacao-email

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

## Variáveis de Ambiente

```env
# Chave secreta para assinar tokens JWT (obrigatório)
# Gere uma chave segura: openssl rand -base64 32
JWT_SECRET=sua-chave-secreta-muito-segura

# Resend - Envio de e-mails (https://resend.com) (obrigatório)
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=noreply@seudominio.com

# CORS - Origins permitidos (separados por vírgula)
# Use * apenas em desenvolvimento
ALLOWED_ORIGINS=http://localhost:3000,https://seudominio.com
```

> **Nota de segurança:** `JWT_SECRET` e `RESEND_API_KEY` são obrigatórios. A aplicação falha ao iniciar se não estiverem definidos.

## Uso

### Enviar E-mail de Verificação

```bash
curl -X POST 'http://localhost:3000/api/send-verification' \
  -H 'Content-Type: application/json' \
  -d '{"email": "usuario@exemplo.com"}'
```

**Resposta de sucesso:**
```json
{"message": "E-mail de verificação enviado com sucesso"}
```

### Confirmar Verificação

O usuário clica no link recebido por e-mail:
```
http://localhost:3000/api/confirm-verification?token=eyJhbGciOiJIUzI1NiIs...
```

- **Token válido**: Redireciona para `/success`
- **Token inválido/expirado**: Redireciona para `/error`

## Estrutura do Projeto

```
├── app/
│   ├── api/
│   │   ├── send-verification/      # Endpoint de envio
│   │   │   ├── route.ts            # POST - gera JWT e envia e-mail
│   │   │   └── email-template.ts   # Template HTML do e-mail
│   │   └── confirm-verification/   # Endpoint de confirmação
│   │       └── route.ts            # GET - valida JWT
│   ├── components/
│   │   └── ui/                     # Componentes de UI reutilizáveis
│   │       ├── icon-circle.tsx     # Círculo com ícone
│   │       ├── detail-item.tsx     # Ícone + label + valor
│   │       ├── info-box.tsx        # Caixa de informação
│   │       ├── alert.tsx           # Alertas de sucesso/erro
│   │       ├── button.tsx          # Botão
│   │       ├── card.tsx            # Card
│   │       ├── input.tsx           # Campo de entrada
│   │       └── ...
│   ├── success/                    # Página de sucesso
│   ├── error/                      # Página de erro
│   └── layout.tsx
└── package.json
```

## Customização

### Alterar Template de E-mail

Edite `app/api/send-verification/email-template.ts`

### Alterar Tempo de Expiração

Em `app/api/send-verification/route.ts`, linha 40:

```typescript
.setExpirationTime('5m')  // 5 minutos, 1h, 24h, etc.
```

### Alterar Páginas de Sucesso/Erro

- `app/success/page.tsx`
- `app/error/page.tsx`

## Tecnologias

- [Next.js 16](https://nextjs.org/) - Framework React
- [React 19](https://react.dev/) - Biblioteca UI
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática
- [jose](https://github.com/panva/jose) - JWT para Edge Runtime
- [Resend](https://resend.com/) - Envio de e-mails
- [Tailwind CSS 4](https://tailwindcss.com/) - Estilização

## Problemas e Sugestões

Encontrou um bug ou tem uma sugestão? Abra uma issue!

1. Acesse [GitHub Issues](https://github.com/kenjimattos/verificacao-email/issues)
2. Clique em "New Issue"
3. Descreva o problema ou sugestão com detalhes
4. Inclua passos para reproduzir (se for bug)

## Contribuição

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Limitações Conhecidas

Este projeto é **educacional**. Para produção, considere:

| Limitação | Solução em Produção |
|-----------|---------------------|
| Sem rate limiting | Implementar com Upstash/Redis |
| Sem revogação de tokens | Usar blacklist ou tokens stateful |
| Sem re-envio de email | Adicionar endpoint de resend com cooldown |
| Sem testes automatizados | Adicionar Jest/Vitest + Playwright |

## Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido por [Kenji Mattos Kinoshita](https://github.com/kenjimattos)
