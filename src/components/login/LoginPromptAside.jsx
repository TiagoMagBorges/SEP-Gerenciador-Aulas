import clsx from "@/utils/clsx";

export default function LoginPromptAside({setIsLogin}) {
  return (
      <section
          className={clsx(
              'hidden',
              'md:flex',
              'md:w-4/12',
              'h-full',
              'rounded-[15px]',
              'md:rounded-tl-[20px]',
              'md:rounded-bl-[20px]',
              'bg-[#F8F8FF]',
              'flex-col'
          )}>
        <div className={'flex-[2]'}></div>
        <div className={'flex-[8]'}></div>
        <footer
            className={clsx(
                'flex-[2]',
                'rounded-bl-[15px]',
                'md:rounded-bl-[20px]',
                'text-center',
                'flex',
                'items-center',
                'justify-center'
            )}>
          <p>
            Já possui uma conta?{" "}
            <button
                onClick={() => setIsLogin(true)}
                className={clsx('text-[14px]', 'text-[#123524]', 'font-semibold')}>
              Logar
            </button>
          </p>
        </footer>
      </section>
  );
}