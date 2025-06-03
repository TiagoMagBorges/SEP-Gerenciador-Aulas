import Link from 'next/link';

export default function HeroSection() {
  return (
      <section className="text-center py-20 lg:py-32 w-[100%]">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--background-tertiary-color)] leading-tight">
          Menos tempo administrando, <br /> mais tempo <span className="text-[var(--primary-button-bg)]">ensinando</span>.
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
          A plataforma completa para professores particulares organizarem suas aulas, alunos e finanças de forma simples e eficiente.
        </p>
        <div className="mt-10">
          <Link
              href="/login"
              className="bg-[var(--primary-button-bg)] text-white font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-opacity"
          >
            Comece a usar gratuitamente
          </Link>
        </div>
        <div className="mt-16 max-w-4xl mx-auto bg-gray-100 rounded-lg p-4 border">
          <p className="text-gray-500">
            [Adicionar um print de alguma tela interna do sistema aqui, como o dashboard ou a página de agendamento de aulas.]
          </p>
        </div>
      </section>
  );
}