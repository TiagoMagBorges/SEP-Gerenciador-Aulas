import { useState } from 'react';
import LoginController from '@/controllers/LoginController';
import styles from '@/styles/login.module.css';
import { useRouter } from 'next/router';
import clsx from 'clsx';

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
        setErrors({ email: false, password: false });
        setIsSubmitting(true);

        const newErrors = {
            email: email === '',
            password: password === '',
        };
        setErrors(newErrors);

        if (!newErrors.email && !newErrors.password) {
            try {
                await LoginController.login(email, password, rememberMe);
                await router.push('/');
            } catch (error) {
                setLoginError(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
            }
        }
        setIsSubmitting(false);
    };

    return (
        <section className="w-[100%] md:w-6/12 xl:w-4/12 h-[100%] rounded-[15px] md:rounded-tl-[20px] md:rounded-bl-[20px] flex flex-col">
            <div className="flex-[4] rounded-tl-[15px] md:rounded-tl-[20px] flex items-center justify-center text-center relative">
                <h1 className={styles['section-title']}>Login</h1>
                <button
                    onClick={() => router.push('/')}
                    className={clsx(
                        "md:hidden absolute top-0 right-0 bg-primary-green text-white font-bold rounded-tr-[15px] rounded-bl-[15px] w-10 h-10 flex items-center justify-center",
                        isSubmitting && 'opacity-70 cursor-not-allowed'
                    )}
                    disabled={isSubmitting}
                >
                    X
                </button>
            </div>
            <form className="flex-[6] flex flex-col items-center" onSubmit={handleSubmit}>
                {loginError && <p className="text-red-500 text-sm w-[95%] text-center mb-3 mt-1">{loginError}</p>}

                <div className="flex-[2] flex items-end justify-start w-[95%] mb-1">
                    <label htmlFor="email" className={styles['form-label']}>
                        Email
                    </label>
                </div>
                <input
                    id="email"
                    type="email"
                    className={clsx(
                        styles['input-base'],
                        'w-[95%]',
                        'flex-[2]',
                        errors.email && '!border-red-500'
                    )}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    placeholder="seu@email.com"
                />
                {errors.email && <p className={styles['error-text']}>Email é obrigatório.</p>}

                <div className="flex-[2] flex items-end justify-start w-[95%] mb-1 mt-2">
                    <label htmlFor="password" className={styles['form-label']}>
                        Senha
                    </label>
                </div>
                <input
                    id="password"
                    type="password"
                    className={clsx(
                        styles['input-base'],
                        'w-[95%]',
                        'flex-[2]',
                        errors.password && '!border-red-500'
                    )}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                    placeholder="Digite sua senha"
                />
                {errors.password && <p className={styles['error-text']}>Senha é obrigatória.</p>}

                <div className="flex-[2] flex justify-between items-center w-[95%] mt-3">
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="remember-me"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            disabled={isSubmitting}
                            className={clsx(
                                'h-4 w-4 text-primary-green border-gray-300 rounded focus:ring-primary-green',
                                isSubmitting && 'opacity-70 cursor-not-allowed'
                            )}
                        />
                        <label htmlFor="remember-me" className="text-sm font-semibold text-gray-700 font-inter">
                            Lembre de mim
                        </label>
                    </div>

                    <button
                        type={'button'}
                        onClick={() => setForgotPassword(true)}
                        className={clsx(
                            styles['btn-text-link'],
                            isSubmitting && 'opacity-70 cursor-not-allowed'
                        )}
                        disabled={isSubmitting}
                    >
                        Esqueceu a senha?
                    </button>
                </div>

                <button
                    type="submit"
                    className={clsx(
                        styles['btn-primary'],
                        'flex-[2]',
                        'w-[90%]',
                        'mt-4',
                        'mb-2',
                        'py-2.5',
                        'md:py-0'
                    )}
                    disabled={isSubmitting}
                >
                    <h1 className="text-[20px] ">{isSubmitting ? 'Entrando...' : 'Entrar'}</h1>
                </button>
            </form>

            <footer className="flex-[2] rounded-bl-[15px] md:rounded-bl-[20px] text-center content-center border-t border-gray-200 pt-3">
                <p className="text-sm text-gray-700 font-inter">
                    Não possui uma conta?{' '}
                    <button
                        onClick={() => setIsLogin(false)}
                        className={clsx(
                            styles['btn-text-link'],
                            isSubmitting && 'opacity-70 cursor-not-allowed'
                        )}
                        disabled={isSubmitting}
                    >
                        Cadastre-se
                    </button>
                </p>
            </footer>
        </section>
    );
}