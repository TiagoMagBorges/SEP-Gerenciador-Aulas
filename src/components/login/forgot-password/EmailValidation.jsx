import {useState} from "react";
import clsx from "@/utils/clsx";
import styles from "@/styles/modal.module.css";
import loginStyles from "@/styles/login.module.css";

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
      <>
        <div className={clsx(styles['header'], 'h-[30%]')}>

          <div className={clsx(styles['title'], 'w-full h-[50%] flex items-center justify-center')}>
            <h1 className={'text-center'}>Recuperar senha</h1>
          </div>

          <div className={'w-full h-[50%] text-base flex items-center justify-center text-center px-4'}>
            <p>
              Insira seu email para receber o código de validação.
            </p>

          </div>

        </div>

        <form onSubmit={handleEmailSubmit} className={clsx(styles['body'], 'h-[70%]')}>

          <div className={'w-full h-[50%] flex items-center justify-center flex-col'}>

            <div className={clsx('label', "flex-[2] flex items-end justify-start w-[95%] mb-2")}>
              <label htmlFor="email">Email</label>
            </div>

            <input id="email"
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="Digite seu email"
                   className={clsx(
                       loginStyles['input-base'],
                       'w-[95%]',
                       'flex-[2]',
                       'py-2.5',
                       error && '!border-red-500'
                   )}/>

            {error && <p className={styles['error-text']}>{error}</p>}

          </div>

          <div className={'w-full h-[50%] flex items-center justify-around'}>

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
      </>
  );
}