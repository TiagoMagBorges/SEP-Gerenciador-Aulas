import {useState} from "react";
import clsx from "@/utils/clsx";
import styles from "@/styles/modal.module.css";
import loginStyles from "@/styles/login.module.css";

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
      <>


        <div className={clsx(styles['header'], 'h-[30%]')}>

          <div className={clsx(styles['title'], 'w-full h-[50%] flex items-center justify-center')}>
            <h1 className={'text-center'}>Recuperar senha</h1>
          </div>

          <div className={'w-full h-[50%] text-base flex items-center justify-center text-center px-4'}>
            <p>
              O código de validação foi enviado para o seu email.
            </p>
          </div>

        </div>

        <form onSubmit={handleCodeSubmit} className={clsx(styles['body'], 'h-[70%]')}>

          <div className={'w-full h-[50%] flex items-center justify-center flex-col'}>

            <div className={clsx('label', "flex-[2] flex items-end justify-start w-[95%] mb-2")}>
              <label htmlFor="validationCode">Código de recuperação</label>
            </div>

            <input id="validationCode"
                   type="text"
                   value={code}
                   onChange={(e) => setCode(e.target.value)}
                   placeholder="Digite o código de 6 dígitos"
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