import Logo from "@/components/logo";
import Link from "next/link";
import LoginForm from "@/components/login/LoginForm";
import {useState} from "react";

export default function Login() {

    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className={'main-background'}>
            <header className={'w-[90vw] h-[10vh] lg:w-[95vw] flex justify-between items-center text-white p-4'}>
                <Logo />

                <Link href={'/'} className="hidden md:block content-center text-center text-white font-bold">Página Inicial</Link>
            </header>

            <main className="w-[90vw] h-[89vh] lg:w-[95vw] bg-white rounded-[20px] mb-3 flex flex-col md:flex-row">

                <LoginForm setIsLogin={setIsLogin}/>

                <div className="hidden md:block w-[1px] bg-[#CCC] shadow-lg md:h-full"></div>

                <section className="hidden md:block w-full md:w-6/12 xl:w-8/12 h-full rounded-[15px] md:rounded-tr-[20px] md:rounded-br-[20px] bg-[#f8f8ff] p-4">
                </section>
            </main>
        </div>
    );
}