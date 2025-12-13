import { X } from "lucide-react"

async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  const { message } = await searchParams

  return (
    <div>
        <div className="w-20 h-20 mx-auto mb-5 bg-secondary rounded-full flex items-center justify-center">
          <X className="w-10 h-10 text-white stroke-[2]" />
        </div>

        <h1 className="text-2xl font-normal mb-4">Email Não Verificado!</h1>

        <p className="mb-4 font-thin">
          Não foi possível verificar seu email. Por favor, tente novamente ou entre em contato com o suporte se o problema persistir.
        </p>

        {message && (
          <p className="mb-4 font-thin text-gray-400">{message}</p>
        )}
    </div>
  );
};

export default ErrorPage;
