# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2025-12-13

### Adicionado
- Endpoint `POST /api/send-verification` para envio de e-mails via Resend
- Endpoint `GET /api/confirm-verification` para validação de tokens JWT
- Template de e-mail HTML responsivo
- Páginas de sucesso e erro com feedback visual
- Tokens JWT stateless (sem necessidade de banco de dados)
- Validação de expiração de tokens (5 minutos)
- Configuração CORS para requisições cross-origin

### Stack Técnica
- Next.js 16 com App Router
- React 19
- TypeScript
- jose (JWT para Edge Runtime)
- Resend (envio de e-mails)
- Tailwind CSS 4
