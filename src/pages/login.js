import {useState} from "react";
import Logo from "@/components/logo";
import Link from "next/link";
import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/login/RegisterForm";
import ForgotPassword from "@/components/login/forgot-password/ForgotPassword";
import styles from "@/styles/navbar.module.css";
import clsx from "clsx";

export default function Login() {

  const [isLogin, setIsLogin] = useState(true);

  const [forgotPassword, setForgotPassword] = useState(false);

  return (
      <div className={'main-background'}>
        {forgotPassword && <ForgotPassword setForgotPassword={setForgotPassword}/>}

        <nav className={'navbar'}>
          <Logo/>
          <Link href={'/'} className={styles['navLink']}>
            Página Inicial
          </Link>
        </nav>

        <main className={'main flex flex-col md:flex-row'}>
          {isLogin ? (
              <LoginForm setIsLogin={setIsLogin} setForgotPassword={setForgotPassword}/>
          ) : (
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
                        className={clsx('text-[14px]', 'text-[#123524]', 'font-semibold')}
                    >
                      Logar
                    </button>
                  </p>
                </footer>
              </section>
          )}

          <div
              className={clsx(
                  'hidden',
                  'md:block',
                  'w-[1px]',
                  'md:h-full',
                  'bg-[#CCC]',
                  isLogin ? 'shadow-lg' : 'shadow-rg'
              )}
          />

          {isLogin ? (
              <section
                  className={clsx(
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
                      'content-center'
                  )}
              >
                <h1
                    className={clsx(
                        'text-3xl',
                        'md:text-2xl',
                        'font-extrabold',
                        'text-[#333]',
                    )}
                >
                  Seja bem vindo de volta!
                </h1>
              </section>
          ) : (
              <RegisterForm setIsLogin={setIsLogin}/>
          )}
        </main>
      </div>
  );
}