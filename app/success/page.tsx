import { Check } from "lucide-react"

function SuccessPage() {
  return (
    <div>
        <div className="w-20 h-20 mx-auto mb-5 bg-primary rounded-full flex items-center justify-center">
          <Check className="w-10 h-10 text-white stroke-[2]" />
        </div>

        <h1 className="text-2xl font-normal mb-4">Email Verificado com Sucesso!</h1>

        <p className="mb-4 font-thin">Obrigado por verificar seu endereço de email.<br />
        Você já pode voltar para o aplicativo e continuar usando.</p>
      
    </div>
  );
};

export default SuccessPage;
