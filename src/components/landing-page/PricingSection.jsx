import Link from 'next/link';
import { Check } from 'lucide-react';

export default function PricingSection() {
  return (
      <section className="py-20 w-[100%]">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--background-tertiary-color)]">
            Comece a usar sem nenhum custo
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Aproveite todos os recursos essenciais do SEP, de graça. Sem pegadinhas.
          </p>
        </div>
        <div className="mt-12 flex justify-center">
          <div className="border-2 border-[var(--primary-button-bg)] rounded-lg p-8 max-w-sm w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-[var(--form-text-color)]">Plano Essencial</h3>
            <p className="mt-4">
              <span className="text-5xl font-extrabold">Grátis</span>
            </p>
            <p className="mt-2 text-gray-500">Para sempre. Sem necessidade de cartão de crédito.</p>
            <ul className="mt-8 space-y-4 text-left">
              {['Alunos ilimitados', 'Agenda de aulas', 'Controle financeiro', 'Notificações por e-mail'].map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
              ))}
            </ul>
            <Link href="/login" className="block w-full text-center mt-10 bg-[var(--primary-button-bg)] text-white font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-opacity">
              Criar minha conta gratuita
            </Link>
          </div>
        </div>
      </section>
  );
}