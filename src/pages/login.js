import Logo from "@/components/logo";
import Link from "next/link";
import LoginForm from "@/components/login/LoginForm";
import {useState} from "react";
import RegisterForm from "@/components/login/RegisterForm";

export default function Login() {

    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className={'main-background'}>
            <header className={'w-[90vw] h-[10vh] lg:w-[95vw] flex justify-between items-center text-white p-4'}>
                <Logo />

                <Link href={'/'} className="hidden md:block content-center text-center text-white font-bold">Página Inicial</Link>
            </header>

            <main className="w-[90vw] h-[89vh] lg:w-[95vw] bg-white rounded-[20px] mb-3 flex flex-col md:flex-row">

                {isLogin
                    ?
                    <LoginForm setIsLogin={setIsLogin}/>
                    :
                    <section
                        className="hidden md:flex md:w-4/12 h-full rounded-[15px] md:rounded-tl-[20px] md:rounded-bl-[20px] bg-[#F8F8FF] flex-col">
                        <div className="flex-[2]"></div>
                        <div className="flex-[8]"></div>
                        <footer
                            className="flex-[2] rounded-bl-[15px] md:rounded-bl-[20px] text-center flex items-center justify-center">
                            <p>
                                Já possui uma conta?{" "}
                                <button
                                    onClick={() => setIsLogin(true)}
                                    className="text-[14px] text-[#123524] font-semibold"
                                >
                                    Logar
                                </button>
                            </p>
                        </footer>
                    </section>

                }

                <div className={`hidden md:block w-[1px] bg-[#CCC] shadow-${isLogin ? 'l' : 'r'}g md:h-full`}/>

                {isLogin
                    ?
                    <section
                        className="hidden md:block w-full md:w-6/12 xl:w-8/12 h-full rounded-[15px] md:rounded-tr-[20px] md:rounded-br-[20px] bg-[#f8f8ff] p-4">
                    </section>
                    :
                    <RegisterForm setIsLogin={setIsLogin}/>
                }

            </main>
        </div>
    );
}