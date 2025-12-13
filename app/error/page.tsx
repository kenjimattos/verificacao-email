import { X, ArrowLeft } from "lucide-react"
import Link from "next/link"

async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  const { message } = await searchParams

  return (
    <div className="space-y-6">
      <div className="w-20 h-20 mx-auto bg-secondary rounded-full flex items-center justify-center">
        <X className="w-10 h-10 text-white stroke-[2]" />
      </div>

      <div>
        <h1 className="text-2xl font-semibold mb-2">E-mail Não Verificado!</h1>
        <p className="text-muted">
          Não foi possível verificar seu e-mail. Por favor, tente novamente.
        </p>
      </div>

      {message && (
        <div className="bg-error-50 border border-error-200 rounded-lg p-4">
          <p className="text-sm text-error-800">{message}</p>
        </div>
      )}

      {/* Voltar */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para o início
      </Link>
    </div>
  );
}

export default ErrorPage;
