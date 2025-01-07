import Logo from "@/components/logo";

export default function Login() {
    return (
        <div className={'main-background'}>
            <nav className={'w-[90vw] h-[10vh] lg:w-[95vw] flex justify-between items-center text-white p-4'}>
                <Logo />
            </nav>

            <div className="w-[90vw] h-[89vh] lg:w-[95vw] bg-white rounded-[20px] mb-3 flex flex-col md:flex-row">
                <div className="w-[100%] md:w-6/12 xl:w-4/12 h-[100%] rounded-[15px] md:rounded-tl-[20px] md:rounded-bl-[20px] flex flex-col">

                    <div className="flex-[4] rounded-tl-[15px] md:rounded-tl-[20px] content-center text-center">
                        <h1>Login</h1>
                    </div>
                    <div className="flex-[6]">
                        Inputs
                    </div>

                    <div className="flex-[2] rounded-bl-[15px] md:rounded-bl-[20px]">
                        Bottom
                    </div>
                </div>

                <div className="hidden md:block w-[1px] bg-[#CCC] shadow-lg md:h-full"></div>

                <div
                    className="hidden md:block w-full md:w-6/12 xl:w-8/12 h-full rounded-[15px] md:rounded-tr-[20px] md:rounded-br-[20px] bg-[#f8f8ff] p-4">

                </div>

            </div>
        </div>
    );
}
