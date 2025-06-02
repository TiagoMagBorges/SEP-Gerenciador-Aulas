import {useState} from "react";
import clsx from 'clsx';
import styles from '@/styles/login.module.css';

export default function CodeValidation({setStep, setForgotPassword}) {

    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleCodeSubmit = (e) => {
        e.preventDefault();
        const codeRegex = /^[0-9]{6}$/;
        if (!codeRegex.test(code)) {
            setError('Código inválido ou vazio.');
            return;
        } else {
            setError('');
        }

        setTimeout(() => {
            setStep('newPassword');
        }, 500);
    };

    return (
        <div className={'w-[90vw] md:w-[70vw] lg:w-[50vw] h-[60vh] bg-white rounded-[20px] flex flex-col'}
             onClick={(e) => e.stopPropagation()}>

            <form onSubmit={handleCodeSubmit} className="h-full flex flex-col">

                <div className={'w-full h-[33.33%] border-b-2 border-border-color'}>
                    <div
                        className={clsx(styles['modal-title'], 'w-full h-[50%] flex items-center justify-center')}>
                        <h1 className={'text-center'}>Recuperar senha</h1>
                    </div>
                    <div className={'w-full h-[50%] text-base font-inter flex items-center justify-center text-center px-4'}>
                        <p>
                            O código de validação foi enviado para o seu email.
                        </p>
                    </div>
                </div>

                <div className={'w-full h-[33.33%] flex items-center justify-center flex-col'}>

                    <div
                        className={clsx(styles['modal-label'], "flex-[2] flex items-end justify-start w-[95%] mb-2")}>
                        <label htmlFor="validationCode">Código de validação</label>
                    </div>

                    <input
                        id="validationCode"
                        type="text"
                        className={clsx(
                            styles['input-base'],
                            'w-[95%]',
                            'flex-[2]',
                            'py-2.5',
                            error && '!border-red-500'
                        )}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Digite o código de 6 dígitos"
                    />
                    {error && <p className={styles['error-text']}>{error}</p>}
                </div>

                <div className={'w-full h-[33.33%] flex items-center justify-around'}>
                    <button type="button"
                            onClick={() => setForgotPassword(false)}
                            className={styles['btn-secondary-bordered']}>
                        <h1 className={'text-center'}>Voltar</h1>
                    </button>

                    <button
                        type="submit"
                        className={clsx(styles['btn-primary'], 'w-[40%]', 'h-[40%]', 'border-2', 'border-border-color')}>
                        <h1 className={'text-center'}>Validar</h1>
                    </button>
                </div>

            </form>
        </div>
    );
}