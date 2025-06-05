import {useState} from 'react';
import LoginController from '@/controllers/LoginController';
import styles from '@/styles/login.module.css';
import {useRouter} from 'next/router';
import clsx from "@/utils/clsx";

export default function LoginForm({setIsLogin, setForgotPassword}) {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState({email: false, password: false});

  const [loginError, setLoginError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError('');
    setErrors({email: false, password: false});
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
      <section className={styles['login-container']}>

        <div className={styles['login-header']}>

          <h1 className={styles['login-title-text']}>
            Login
          </h1>

          <button onClick={() => router.push('/')} disabled={isSubmitting}
                  className={clsx(styles['close-button'], isSubmitting && 'opacity-70 cursor-not-allowed')}>
            X
          </button>

        </div>

        <form className={styles['login-form']} onSubmit={handleSubmit}>

          {loginError && <p className={styles['error-text']}>{loginError}</p>}

          <div className={clsx(styles['label-container'], 'flex-[2]')}>
            <label htmlFor="email" className={styles['label']}>
              Email
            </label>
          </div>

          <input id="email"
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 disabled={isSubmitting}
                 placeholder="seu@email.com"
                 className={clsx(
                     styles['input-base'],
                     'w-[95%]',
                     'flex-[2]',
                     errors.email && '!border-red-500')}/>

          {errors.email && <p className={styles['error-text']}>Email é obrigatório.</p>}

          <div className={clsx(styles['label-container'], 'flex-[2]')}>
            <label htmlFor="password" className={styles['label']}>
              Senha
            </label>
          </div>

          <input id="password"
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 disabled={isSubmitting}
                 placeholder="Digite sua senha"
                 className={clsx(
                     styles['input-base'],
                     'w-[95%]',
                     'flex-[2]',
                     errors.password && '!border-red-500')}/>

          {errors.password && <p className={styles['error-text']}>Senha é obrigatória.</p>}

          <div className={styles['options-container']}>

            <div className={'flex items-center space-x-2'}>
              <input type="checkbox"
                     id="remember-me"
                     checked={rememberMe}
                     onChange={(e) => setRememberMe(e.target.checked)}
                     disabled={isSubmitting}
                     className={clsx(
                         'h-4 w-4 text-primary-green border-gray-300 rounded focus:ring-primary-green',
                         isSubmitting && 'opacity-70 cursor-not-allowed')}/>
              <label htmlFor="remember-me" className={'text-sm font-semibold text-gray-700'}>
                Lembre de mim
              </label>
            </div>

            <button type={'button'} disabled={isSubmitting}
                    onClick={() => setForgotPassword(true)}
                    className={clsx(
                        styles['btn-text-link'],
                        isSubmitting && 'opacity-70 cursor-not-allowed')}>
              Esqueceu a senha?
            </button>

          </div>

          <button type="submit" disabled={isSubmitting}
                  className={clsx(
                      'btn-primary',
                      'flex-[2]',
                      'w-[90%]',
                      'mt-4',
                      'mb-2',
                      'py-2.5',
                      'md:py-0')}>

            <h1 className={'text-[20px]'}>{isSubmitting ? 'Entrando...' : 'Entrar'}</h1>

          </button>

        </form>

        <footer className={styles['login-footer']}>

          <p className={'text-sm text-gray-700'}>
            Não possui uma conta?{' '}
            <button onClick={() => setIsLogin(false)} disabled={isSubmitting}
                    className={clsx(
                        styles['btn-text-link'],
                        isSubmitting && 'opacity-70 cursor-not-allowed')}>
              Cadastre-se
            </button>
          </p>

        </footer>
      </section>
  );
}