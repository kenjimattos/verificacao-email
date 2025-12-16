import { Check, Shield, Mail, Clock, ArrowLeft } from "lucide-react";
import { LinkBadge } from "../components/ui/link-badge";

async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const { email } = await searchParams;

  return (
    <div className="space-y-6">
      {/* Ícone de sucesso */}
      <div className="w-20 h-20 mx-auto bg-primary rounded-full flex items-center justify-center">
        <Check className="w-10 h-10 text-white stroke-[2]" />
      </div>

      <div>
        <h1 className="text-2xl font-semibold mb-2">E-mail Verificado!</h1>
        <p className="text-muted">
          Sua identidade foi confirmada com sucesso.
        </p>
      </div>

      {/* Detalhes da verificação */}
      {email && (
        <div className="bg-card rounded-lg p-4 space-y-3 text-left">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Detalhes da verificação</p>

          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">E-mail verificado</p>
              <p className="text-sm font-medium">{email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Data/hora</p>
              <p className="text-sm font-medium">
                {new Date().toLocaleString('pt-BR', {
                  dateStyle: 'short',
                  timeStyle: 'short'
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-success-600" />
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-sm font-medium text-success-600">Token JWT válido</p>
            </div>
          </div>
        </div>
      )}

      {/* O que aconteceu */}
      <div className="bg-info-50 border border-info-100 rounded-lg p-4 text-left">
        <p className="text-sm text-info-800 font-medium mb-2">O que aconteceu?</p>
        <ol className="text-xs text-info-700 space-y-1 list-decimal list-inside">
          <li>Você clicou no link enviado por e-mail</li>
          <li>O token JWT foi validado (assinatura + expiração)</li>
          <li>Seu e-mail foi extraído do token de forma segura</li>
        </ol>
      </div>

      {/* Voltar */}
      <LinkBadge
        href="/"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para o início
      </LinkBadge>
    </div>
  );
}

export default SuccessPage;
