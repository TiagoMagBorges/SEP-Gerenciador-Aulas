import { CalendarClock, Wallet, Users, BellRing, BarChart3, GraduationCap } from 'lucide-react';

const features = [
  {
    icon: <CalendarClock className="w-10 h-10 text-[var(--primary-button-bg)]" />,
    title: "Agenda Inteligente",
    description: "Organize suas aulas, reagende com poucos cliques e tenha uma visão clara da sua semana."
  },
  {
    icon: <Wallet className="w-10 h-10 text-[var(--primary-button-bg)]" />,
    title: "Controle Financeiro",
    description: "Saiba exatamente quem pagou e quem está devendo. Nunca mais perca o controle das suas finanças."
  },
  {
    icon: <Users className="w-10 h-10 text-[var(--primary-button-bg)]" />,
    title: "Gestão de Alunos",
    description: "Centralize informações de contato, histórico de aulas e observações importantes de cada aluno."
  },
  {
    icon: <BellRing className="w-10 h-10 text-[var(--primary-button-bg)]" />,
    title: "Lembretes Automáticos",
    description: "Reduza faltas e atrasos com notificações automáticas por E-mail ou WhatsApp, configuradas por você."
  },
  {
    icon: <GraduationCap className="w-10 h-10 text-[var(--primary-button-bg)]" />,
    title: "Acompanhamento de Progresso",
    description: "Registre notas, anexe materiais e crie planos de estudo para acompanhar a evolução de cada aluno."
  },
  {
    icon: <BarChart3 className="w-10 h-10 text-[var(--primary-button-bg)]" />,
    title: "Relatórios Visuais",
    description: "Tenha uma visão clara do seu negócio com um dashboard que mostra seus principais indicadores."
  }
];

export default function FeaturesSection() {
  return (
      <section className="py-20 bg-[var(--background-secondary-color)] -mx-4 md:-mx-8 lg:-mx-12 px-4 md:px-8 lg:px-12  w-[100%]">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--background-tertiary-color)]">
            Tudo que você precisa para profissionalizar seu trabalho
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Conheça os recursos pensados para a rotina de um professor particular.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
                {feature.icon}
                <h3 className="mt-5 text-xl font-bold text-[var(--form-text-color)]">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
          ))}
        </div>
      </section>
  );
}