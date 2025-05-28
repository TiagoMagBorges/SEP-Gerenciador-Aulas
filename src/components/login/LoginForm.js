import { useState } from "react";
import LoginController from "@/controllers/LoginController";
import { useRouter } from 'next/router';

export default function LoginForm({ setIsLogin, setForgotPassword }) {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [rememberMe, setRememberMe] = useState(false);

    const [errors, setErrors] = useState({ email: false, password: false });

    const [loginError, setLoginError] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoginError('');
        setIsSubmitting(true);

        const newErrors = {
            email: email === '',
            password: password === ''
        };
        setErrors(newErrors);

        if (!newErrors.email && !newErrors.password) {
            try {
                await LoginController.login(email, password);
                await router.push('/');
            } catch (error) {
                setLoginError(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
            }
        }
        setIsSubmitting(false);
    };

    return (
        <section className="w-[100%] md:w-6/12 xl:w-4/12 h-[100%] rounded-[15px] md:rounded-tl-[20px] md:rounded-bl-[20px] flex flex-col">

            <div className="flex-[4] rounded-tl-[15px] md:rounded-tl-[20px] content-center text-center relative">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#333] font-inter">Login</h1>
                <button onClick={() => router.push('/')}
                        className="md:hidden absolute top-0 right-0 bg-[#123524] text-white font-black rounded-tr-[15px] rounded-bl-[15px] w-10 h-10">
                    X
                </button>
            </div>
            <form className="flex-[6] flex flex-col items-center" onSubmit={handleSubmit}>

                {loginError && <p className="text-red-500 text-sm mt-2">{loginError}</p>}

                <div className="flex-[2] flex items-end justify-start w-[95%] mb-2 text-[22px] font-bold text-[#333] font-inter">
                    <label htmlFor="email">Email:</label>
                </div>
                <input
                    id="email"
                    className={`flex-[2] rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-[95%] pl-2 ${errors.email ? 'border border-red-500' : ''}`}
                    style={{boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)'}}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                />

                <div className="flex-[2] flex items-end justify-start w-[95%] mb-2 text-[22px] font-bold text-[#333] font-inter">
                    <label htmlFor="password">Senha:</label>
                </div>
                <input
                    id="password"
                    className={`flex-[2] rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-[95%] pl-2 ${errors.password ? 'border border-red-500' : ''}`}
                    style={{boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)'}}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                />

                <div className="flex-[2] flex justify-between items-center w-[95%]">
                    <div className="flex w-[50%] justify-items-start space-x-2">
                        <input
                            type="checkbox"
                            id="remember-me"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            disabled={isSubmitting}
                        />
                        <label htmlFor="remember-me" className="text-[14px] text-[#333] font-semibold">Lembre de
                            mim</label>
                    </div>

                    <button type={'button'}
                            onClick={() => setForgotPassword(true)}
                            className="text-[14px] text-[#123524] font-semibold"
                            disabled={isSubmitting}>Esqueceu a senha?
                    </button>
                </div>

                <button type="submit"
                        className="flex-[2] rounded-[15px] md:rounded-[20px] bg-[#123524] shadow w-[90%] items-center"
                        disabled={isSubmitting}>
                    <h1 className="text-[20px] text-white font-bold">{isSubmitting ? 'Entrando...' : 'Entrar'}</h1>
                </button>
            </form>

            <footer className="flex-[2] rounded-bl-[15px] md:rounded-bl-[20px] text-center content-center">
                <p>Não possui uma conta?
                    <button onClick={() => setIsLogin(false)} className="text-[14px] text-[#123524] font-semibold" disabled={isSubmitting}>
                        Cadastre-se
                    </button>
                </p>
            </footer>
        </section>
    );
}