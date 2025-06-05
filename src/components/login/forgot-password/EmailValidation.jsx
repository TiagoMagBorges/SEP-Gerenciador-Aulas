import {useState} from "react";
import clsx from "@/utils/clsx";
import styles from '@/styles/login.module.css';

export default function EmailValidation({setStep, setForgotPassword}) {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.\S+$/;
        if (!emailRegex.test(email)) {
            setError('Email inválido ou vazio.');
            return;
        } else {
            setError('');
        }

        setTimeout(() => {
            setStep('validationCode');
        }, 500);
    };

    return (
        <div className={'w-[90vw] md:w-[70vw] lg:w-[50vw] h-[60vh] bg-white rounded-[20px] flex flex-col'}
             onClick={(e) => e.stopPropagation()}>

            <form onSubmit={handleEmailSubmit} className="h-full flex flex-col">

                <div className={'w-full h-[33.33%] border-b-2 border-border-color'}>
                    <div
                        className={clsx(styles['modal-title'], 'w-full h-[50%] flex items-center justify-center')}>
                        <h1 className={'text-center'}>Recuperar senha</h1>
                    </div>
                    <div className={'w-full h-[50%] text-base flex items-center justify-center text-center px-4'}>
                        <p>
                            Insira seu email para receber o código de validação.
                        </p>
                    </div>
                </div>

                <div className={'w-full h-[33.33%] flex items-center justify-center flex-col'}>

                    <div
                        className={clsx(styles['modal-label'], "flex-[2] flex items-end justify-start w-[95%] mb-2")}>
                        <label htmlFor="email">Email</label>
                    </div>

                    <input
                        id="email"
                        type="email"
                        className={clsx(
                            styles['input-base'],
                            'w-[95%]',
                            'flex-[2]',
                            'py-2.5',
                            error && '!border-red-500'
                        )}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                    />

                    {error && <p className={styles['error-text']}>{error}</p>}
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
                        <h1 className={'text-center'}>Enviar</h1>
                    </button>
                </div>

            </form>
        </div>
    );
}