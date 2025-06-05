import clsx from "@/utils/clsx";

export default function LoginWelcomeAside() {
  return(
      <section className={clsx(
          'hidden',
          'md:block',
          'w-full',
          'md:w-6/12',
          'xl:w-8/12',
          'h-full',
          'rounded-[15px]',
          'md:rounded-tr-[20px]',
          'md:rounded-br-[20px]',
          'bg-[#f8f8ff]',
          'p-4',
          'text-center',
          'content-center')}>

        <h1 className={clsx(
                'text-3xl',
                'md:text-2xl',
                'font-extrabold',
                'text-[#333]')}>
          Seja bem vindo de volta!
        </h1>

      </section>
  );
}