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
        setErrors({ email: false, password: false }); // Clear field errors on new submit
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

    const inputBaseStyles = "rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-[95%] pl-3 disabled:opacity-70 disabled:cursor-not-allowed";
    const inputStyle = { boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)' };
    const focusClasses = "focus:outline-none focus:ring-2 focus:ring-[#123524]";
    const buttonDisabledClasses = "disabled:opacity-60 disabled:cursor-not-allowed";

    return (
        <section className="w-[100%] md:w-6/12 xl:w-4/12 h-[100%] rounded-[15px] md:rounded-tl-[20px] md:rounded-bl-[20px] flex flex-col">

            <div className="flex-[4] rounded-tl-[15px] md:rounded-tl-[20px] content-center text-center relative">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-inter">Login</h1>
                <button onClick={() => router.push('/')}
                        className="md:hidden absolute top-0 right-0 bg-[#123524] text-white font-bold rounded-tr-[15px] rounded-bl-[15px] w-10 h-10 flex items-center justify-center"
                        disabled={isSubmitting}>
                    X
                </button>
            </div>
            <form className="flex-[6] flex flex-col items-center" onSubmit={handleSubmit}>

                {loginError && <p className="text-red-500 text-sm w-[95%] text-center mb-3 mt-1">{loginError}</p>}

                <div className="flex-[2] flex items-end justify-start w-[95%] mb-1">
                    <label htmlFor="email" className="text-lg font-semibold text-gray-700 font-inter">Email:</label>
                </div>
                <input
                    id="email"
                    type="email"
                    className={`flex-[2] ${inputBaseStyles} border ${errors.email ? 'border-red-500' : 'border-transparent focus:border-[#123524]'} ${focusClasses}`}
                    style={inputStyle}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    placeholder="seu@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 w-[95%] text-left">Email é obrigatório.</p>}

                <div className="flex-[2] flex items-end justify-start w-[95%] mb-1 mt-2">
                    <label htmlFor="password" className="text-lg font-semibold text-gray-700 font-inter">Senha:</label>
                </div>
                <input
                    id="password"
                    className={`flex-[2] ${inputBaseStyles} border ${errors.password ? 'border-red-500' : 'border-transparent focus:border-[#123524]'} ${focusClasses}`}
                    style={inputStyle}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                    placeholder="Digite sua senha"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1 w-[95%] text-left">Senha é obrigatória.</p>}

                <div className="flex-[2] flex justify-between items-center w-[95%] mt-3">
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="remember-me"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            disabled={isSubmitting}
                            className={`h-4 w-4 text-[#123524] border-gray-300 rounded focus:ring-[#123524] ${buttonDisabledClasses}`}
                        />
                        <label htmlFor="remember-me" className="text-sm font-semibold text-gray-700 font-inter">Lembre de mim</label>
                    </div>

                    <button type={'button'}
                            onClick={() => setForgotPassword(true)}
                            className={`text-sm text-[#123524] font-semibold hover:underline ${buttonDisabledClasses}`}
                            disabled={isSubmitting}>Esqueceu a senha?
                    </button>
                </div>

                <button type="submit"
                        className={`flex-[2] rounded-[15px] md:rounded-[20px] bg-[#123524] hover:bg-[#0e2a1c] active:bg-[#0a1e15] shadow w-[90%] mt-4 mb-2 flex justify-center items-center text-white transition-colors duration-150 py-2.5 md:py-0 ${buttonDisabledClasses} disabled:bg-[#123524]`}
                        disabled={isSubmitting}>
                    <h1 className="text-[20px] font-semibold">{isSubmitting ? 'Entrando...' : 'Entrar'}</h1>
                </button>
            </form>

            <footer className="flex-[2] rounded-bl-[15px] md:rounded-bl-[20px] text-center content-center border-t border-gray-200 pt-3">
                <p className="text-sm text-gray-700 font-inter">Não possui uma conta?{' '}
                    <button onClick={() => setIsLogin(false)}
                            className={`text-sm text-[#123524] font-semibold hover:underline ${buttonDisabledClasses}`}
                            disabled={isSubmitting}>
                        Cadastre-se
                    </button>
                </p>
            </footer>
        </section>
    );
}