import {useState} from "react";
import clsx from "@/utils/clsx";
import styles from "@/styles/modal.module.css";
import loginStyles from "@/styles/login.module.css";

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
      <>
        <div className={clsx(styles['header'], 'h-[16.665%]')}>

          <div className={clsx(styles['title'], 'w-full h-full flex items-center justify-center')}>
            <h1 className={'text-center'}>Definir nova senha</h1>
          </div>

        </div>

        <form onSubmit={handleNewPasswordSubmit} className={clsx(styles['body'], 'h-[83.335%]')}>

          <div className={'w-full h-[33.33%] flex items-center justify-center flex-col'}>

            <div className={clsx('label', "flex-[2] flex items-end justify-start w-[95%] mb-2")}>
              <label htmlFor="password">Nova senha</label>
            </div>

            <div className="relative w-[95%] h-12">

              <input id="password"
                     type={showPassword ? "text" : "password"}
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="Mínimo 8 caracteres, letras e números"
                     className={clsx(
                         loginStyles['input-base'],
                         'w-full',
                         'h-full',
                         'py-2.5',
                         error !== '' && (error.includes('A senha') || error.includes('não coincidem')) && '!border-red-500'
                     )}/>

              <button type="button"
                      className={styles['show-password-button']}
                      onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>

            </div>

            {error && (error.includes('A senha') || error.includes('não coincidem')) &&
                <p className={styles['error-text']}>{error}</p>}

          </div>

          <div className={'w-full h-[33.33%] flex items-center justify-center flex-col'}>

            <div className={clsx('label', "flex-[2] flex items-end justify-start w-[95%] mb-2")}>
              <label htmlFor="confirmPassword">Confirmar senha</label>
            </div>

            <div className="relative w-[95%] h-12">

              <input id="confirmPassword"
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     placeholder="Confirme sua nova senha"
                     type={showConfirmPassword ? "text" : "password"}
                     className={clsx(
                         loginStyles['input-base'],
                         'w-full',
                         'h-full',
                         'py-2.5',
                         error !== '' && error.includes('não coincidem') && '!border-red-500'
                     )}/>

              <button type="button"
                      className={styles['show-password-button']}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}>

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
      </>
  );
}