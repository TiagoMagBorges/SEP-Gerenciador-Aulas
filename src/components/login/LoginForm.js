import Link from "next/link";
import {useState} from "react";

export default function LoginForm({setIsLogin}) {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [rememberMe, setRememberMe] = useState(false);

    const [errors, setErrors] = useState({ email: false, password: false });

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = {
            email: email === '',
            password: password === ''
        };
        setErrors(newErrors);

        if (!newErrors.email && !newErrors.password) {
            console.log({ email, password, rememberMe });
        }
    };

    return (
        <section
            className="w-[100%] md:w-6/12 xl:w-4/12 h-[100%] rounded-[15px] md:rounded-tl-[20px] md:rounded-bl-[20px] flex flex-col">

            <div className="flex-[4] rounded-tl-[15px] md:rounded-tl-[20px] content-center text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#333] font-inter">Login</h1>
            </div>
            <form className="flex-[6] flex flex-col items-center" onSubmit={handleSubmit}>

                <div
                    className="flex-[2] flex items-end justify-start w-[95%] mb-2 text-[22px] font-bold text-[#333] font-inter">
                    <label htmlFor="email">Email:</label>
                </div>

                <input
                    id="email"
                    className={`flex-[2] rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-[95%] pl-2 ${errors.email ? 'border border-red-500' : ''}`}
                    style={{boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)'}}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div
                    className="flex-[2] flex items-end justify-start w-[95%] mb-2 text-[22px] font-bold text-[#333] font-inter">
                    <label htmlFor="password">Senha:</label>
                </div>

                <input
                    id="password"
                    className={`flex-[2] rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-[95%] pl-2 ${errors.password ? 'border border-red-500' : ''}`}
                    style={{boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)'}}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="flex-[2] flex justify-between items-center w-[95%]">
                    <div className="flex w-[50%] justify-items-start space-x-2">
                        <input
                            type="checkbox"
                            id="remember-me"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="remember-me" className="text-[14px] text-[#333] font-semibold">Lembre de
                            mim</label>
                    </div>

                    <Link href={'/'} className="text-[14px] text-[#123524] font-semibold">Esqueceu a senha?</Link>
                </div>

                <button type="submit"
                        className="flex-[2] rounded-[15px] md:rounded-[20px] bg-[#123524] shadow w-[90%] items-center">
                    <h1 className="text-[20px] text-white font-bold">Entrar</h1>
                </button>
            </form>

            <footer className="flex-[2] rounded-bl-[15px] md:rounded-bl-[20px] text-center content-center">
                <p>Não possui uma conta? <button onClick={() => setIsLogin(false)}
                                                 className="text-[14px] text-[#123524] font-semibold">
                    Cadastre-se
                </button>
                </p>
            </footer>
        </section>
    )
}