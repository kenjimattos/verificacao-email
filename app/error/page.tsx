import { X, ArrowLeft } from "lucide-react"
import { LinkBadge } from "../components/ui/link-badge";
import { IconCircle } from "../components/ui";

async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  const { message } = await searchParams

  return (
    <div className="space-y-6">
      <IconCircle icon={X} variant="secondary" />

      <div>
        <h1>E-mail Não Verificado!</h1>
        <small>
          Não foi possível verificar seu e-mail. Por favor, tente novamente.
        </small>
      </div>

      {message && (
        <div className="bg-error-50 border border-error-200 rounded-lg p-4">
          <p className="text-sm text-error-800">{message}</p>
        </div>
      )}

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

export default ErrorPage;
