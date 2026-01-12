import { Check, Shield, Mail, Clock, ArrowLeft } from "lucide-react";
import { LinkBadge } from "../components/ui/link-badge";
import { Card, IconCircle, DetailItem, InfoBox } from "../components/ui";

async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const { email } = await searchParams;

  return (
    <div className="space-y-6">
      {/* Ícone de sucesso */}
      <IconCircle icon={Check} variant="primary" />

      <div>
        <h1>E-mail Verificado!</h1>
        <p>Sua identidade foi confirmada com sucesso.</p>
      </div>

      {/* Detalhes da verificação */}
      
        <Card>
          <p className="text-label">Detalhes da verificação</p>

          <DetailItem
            icon={Mail}
            label="E-mail verificado"
            value={email ?? "N/A"}
          />

          <DetailItem
            icon={Clock}
            label="Data/hora"
            value={new Date().toLocaleString('pt-BR', {
              dateStyle: 'short',
              timeStyle: 'short'
            })}
          />

          <DetailItem
            icon={Shield}
            label="Status"
            value="Token JWT válido"
            iconColor="text-success-600"
            valueColor="text-success-600"
          />
        </Card>
      

      {/* O que aconteceu */}
      <InfoBox variant="info" title="O que aconteceu?">
        <ol className="text-xs space-y-1 list-decimal list-inside">
          <li>Você clicou no link enviado por e-mail</li>
          <li>O token JWT foi validado (assinatura + expiração)</li>
          <li>Seu e-mail foi extraído do token de forma segura</li>
        </ol>
      </InfoBox>

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
