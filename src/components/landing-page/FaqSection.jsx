const faqs = [
  {
    question: "Meus alunos precisam ter uma conta?",
    answer: "Não! O SEP foi desenhado para o professor. Toda a gestão é sua, e você pode enviar as notificações e lembretes para os canais de comunicação do aluno (WhatsApp/Email)."
  },
  {
    question: "Meus dados estão seguros?",
    answer: "Sim. A segurança é nossa prioridade. Usamos criptografia de ponta e as melhores práticas do mercado para garantir que suas informações e as de seus alunos estejam sempre protegidas."
  },
  {
    question: "Posso usar o SEP no celular?",
    answer: "Com certeza! A plataforma é totalmente responsiva e foi projetada para funcionar perfeitamente em computadores, tablets e celulares."
  }
];

export default function FaqSection() {
  return (
      <section className="py-20 bg-[var(--background-secondary-color)] -mx-4 md:-mx-8 lg:-mx-12 px-4 md:px-8 lg:px-12 w-[100%]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--background-tertiary-color)]">Perguntas Frequentes</h2>
        </div>
        <div className="mt-12 max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
              <details key={index} className="p-4 border rounded-lg bg-white group" open={index === 0}>
                <summary className="font-bold text-lg cursor-pointer list-none flex justify-between items-center">
                  {faq.question}
                  <span className="transform transition-transform duration-300 group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-4 text-gray-600">
                  {faq.answer}
                </p>
              </details>
          ))}
        </div>
      </section>
  );
}