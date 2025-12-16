# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.1.2] - 2025-12-15

### Alterado
- URL do repositório atualizada

### Refatorado
- Padronização do card na página de sucesso
- Unificação de estilos de texto em componente reutilizável
- Links externos e internos unificados no mesmo componente
- Componentização da seção de stack tecnológico
- Componente Divider extraído
- Reorganização de componentes de UI e estrutura do formulário
- Ícones SVG substituídos por ícones da biblioteca Lucide

### Adicionado
- Links nas badges do stack tecnológico

## [1.1.1] - 2025-12-13

### Alterado
- URL base capturada dinamicamente da requisição (headers `host` e `x-forwarded-proto`)
- Remove variável de ambiente `NEXT_PUBLIC_APP_URL` (não é mais necessária)
- Funciona automaticamente em qualquer ambiente sem configuração adicional

## [1.1.0] - 2025-12-13

### Adicionado
- Página principal com demo interativa para testar verificação
- Seção "Como funciona" explicando segurança (JWT, expiração, stateless)
- Página de sucesso mostra detalhes da verificação (e-mail, data/hora, status)
- Link para voltar ao início nas páginas de sucesso/erro
- Tags de tecnologias na página principal
- Link para repositório GitHub

### Refatorado
- Código reutilizável extraído para `lib/` (config, cors, jwt, validation, messages)
- Cores centralizadas em `globals.css` com variáveis semânticas
- Botão do template de e-mail usa cor primária do tema

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
