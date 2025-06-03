import {useState} from "react";
import clsx from 'clsx';
import styles from '@/styles/login.module.css';

export default function NewPassword({setStep, setForgotPassword}) {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleNewPasswordSubmit = (e) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError('A senha deve ter pelo menos 8 caracteres, incluindo letras e números.');
            return;
        } else {
            setError('');
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        } else {
            setError('');
        }

        setTimeout(() => {
            setStep('email');
            setForgotPassword(false);
        }, 500);
    };

    return (
        <div className={'w-[90vw] md:w-[70vw] lg:w-[50vw] h-[60vh] bg-white rounded-[20px] flex flex-col'}
             onClick={(e) => e.stopPropagation()}>

            <form onSubmit={handleNewPasswordSubmit} className="h-full flex flex-col">

                <div className={'w-full h-[16.665%] border-b-2 border-border-color'}>
                    <div
                        className={clsx(styles['modal-title'], 'w-full h-full flex items-center justify-center')}>
                        <h1 className={'text-center'}>Definir nova senha</h1>
                    </div>
                </div>

                <div className={'w-full h-[33.33%] flex items-center justify-center flex-col'}>

                    <div className="flex-[2] flex items-end justify-start w-[95%] mb-2">
                        <label htmlFor="password" className={styles['modal-label']}>Nova senha</label>
                    </div>

                    <div className="relative w-[95%] h-12">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className={clsx(
                                styles['input-base'],
                                'w-full',
                                'h-full',
                                'py-2.5',
                                error !== '' && (error.includes('A senha') || error.includes('não coincidem')) && '!border-red-500'
                            )}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mínimo 8 caracteres, letras e números"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-primary-green hover:underline"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </button>
                    </div>
                    {error && (error.includes('A senha') || error.includes('não coincidem')) && <p className={styles['error-text']}>{error}</p>}
                </div>

                <div className={'w-full h-[33.33%] flex items-center justify-center flex-col'}>

                    <div className="flex-[2] flex items-end justify-start w-[95%] mb-2">
                        <label htmlFor="confirmPassword" className={styles['modal-label']}>Confirmar senha</label>
                    </div>

                    <div className="relative w-[95%] h-12">
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            className={clsx(
                                styles['input-base'],
                                'w-full',
                                'h-full',
                                'py-2.5',
                                error !== '' && error.includes('não coincidem') && '!border-red-500'
                            )}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirme sua nova senha"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-primary-green hover:underline"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                        </button>
                    </div>
                    {error && error.includes('não coincidem') && <p className={styles['error-text']}>{error}</p>}
                </div>

                <div className={'w-full h-[33.33%] flex items-center justify-around'}>
                    <button type="button"
                            onClick={() => setForgotPassword(false)}
                            className={clsx('btn-secondary', 'w-[40%]', 'h-[40%]')}>
                        <h1 className={'text-center'}>Voltar</h1>
                    </button>

                    <button
                        type="submit"
                        className={clsx('btn-primary', 'w-[40%]', 'h-[40%]')}>
                        <h1 className={'text-center'}>Redefinir</h1>
                    </button>
                </div>

            </form>
        </div>
    );
}