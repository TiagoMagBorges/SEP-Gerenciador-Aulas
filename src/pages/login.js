import {useState} from "react";
import Logo from "@/components/logo";
import Link from "next/link";
import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/login/RegisterForm";
import ForgotPassword from "@/components/login/forgot-password/ForgotPassword";
import styles from "@/styles/navbar.module.css";
import loginStyles from "@/styles/login.module.css";
import clsx from "@/utils/clsx";
import LoginPromptAside from "@/components/login/LoginPromptAside";
import LoginWelcomeAside from "@/components/login/forgot-password/LoginWelcomeAside";

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

          {isLogin ?
              <LoginForm setIsLogin={setIsLogin} setForgotPassword={setForgotPassword}/>
              :
              <LoginPromptAside setIsLogin={setIsLogin}/>
          }

          <div className={clsx(loginStyles['division-line'], isLogin ? 'shadow-lg' : 'shadow-rg')}/>

          {isLogin ?
              <LoginWelcomeAside/>
              :
              <RegisterForm setIsLogin={setIsLogin}/>
          }

        </main>

      </div>
  );
}