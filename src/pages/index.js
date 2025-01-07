import Logo from "@/components/logo";
import Link from "next/link";

export default function Home() {
    return (
        <div className={'main-background'}>

            <nav className={'w-[90vw] h-[10vh] lg:w-[95vw] flex justify-between items-center text-white p-4'}>
                <Logo/>

                <Link href={'login'}>Login / Criar Conta</Link>
            </nav>

            <div className="w-[90vw] h-[90vh] lg:w-[95vw] bg-white rounded-[20px]">

            </div>

        </div>
    );
}