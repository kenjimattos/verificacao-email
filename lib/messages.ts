export const messages = {
  // Erros de validação
  emailRequired: 'E-mail é obrigatório',
  emailInvalid: 'E-mail inválido',
  tokenMissing: 'Nenhum token de verificação fornecido',
  tokenInvalid: 'Token de verificação inválido',
  tokenExpired: 'O token de verificação expirou',

  // Sucesso
  emailSent: 'E-mail de verificação enviado com sucesso',

  // Rate limiting
  rateLimitExceeded: 'Muitas requisições. Tente novamente em alguns instantes',

  // Erro genérico
  serverError: 'Erro interno do servidor',
} as const;

export function getVerificationErrorMessage(error: Error): string {
  if (error.message.includes('expired')) {
    return messages.tokenExpired;
  }
  if (error.message.includes('signature')) {
    return messages.tokenInvalid;
  }
  if (error.message === messages.tokenMissing) {
    return messages.tokenMissing;
  }
  return messages.tokenInvalid;
}
