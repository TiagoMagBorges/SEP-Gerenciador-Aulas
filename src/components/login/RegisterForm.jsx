import {useState} from "react";
import LoginController from "@/controllers/LoginController";
import styles from "@/styles/login.module.css";
import SuccessModal from "@/components/login/SuccesModal";
import clsx from "@/utils/clsx";

export default function RegisterForm({setIsLogin}) {

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState({});

  const [submissionError, setSubmissionError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmissionError('');
    setErrors({});
    setIsSubmitting(true);

    const newErrors = {
      name: name === '',
      email: email === '' || !/\S+@\S+\.\S+/.test(email),
      password: password === '' || password.length < 6,
      confirmPassword: confirmPassword === '' || password !== confirmPassword,
      phone: !/^\(\d{2}\) \d{5}-\d{4}$/.test(phone)
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error === true);

    if (!hasErrors) {
      try {
        const userData = {name, email, password, phone};
        await LoginController.register(userData);
        setSuccessMessage('Cadastro realizado com sucesso! Faça login com suas novas credenciais.');
        setShowSuccessModal(true);
      } catch (error) {
        setSubmissionError(error.message || 'Erro inesperado durante o cadastro.');
      }
    }
    setIsSubmitting(false);
  };

  const handlePhoneChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    let formattedValue = '';
    const val = rawValue.substring(0, 11);

    if (val.length === 0) {
      setPhone('');
      return;
    }
    if (val.length > 0)
      formattedValue = '(' + val.substring(0, 2);
    if (val.length >= 3)
      formattedValue += ') ' + val.substring(2, 7);
    if (val.length >= 8)
      formattedValue += '-' + val.substring(7, 11);

    setPhone(formattedValue);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setSuccessMessage('');
  };

  const handleRedirectToLogin = () => {
    setIsLogin(true);
  };

  return (
      <>
        <section className={styles['register-container']}>

          <div className={styles['register-header']}>

            <button onClick={() => setIsLogin(true)} disabled={isSubmitting || showSuccessModal}
                    className={clsx(styles['close-button'], isSubmitting || showSuccessModal && 'opacity-70 cursor-not-allowed')}>
              X
            </button>

            <h1 className={'text-2xl font-bold text-gray-800'}>Crie sua conta!</h1>

          </div>

          <form className={styles['register-form']} onSubmit={handleSubmit}>

            {submissionError && <p className={styles['error-text']}>{submissionError}</p>}

            <div className={clsx(styles['label-container'], 'mb-1', 'mt-2')}>
              <label htmlFor="name" className={clsx(styles['form-label'], 'mb-1')}>Nome Completo</label>
            </div>

            <input id="name"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   disabled={isSubmitting || showSuccessModal}
                   placeholder="Digite seu nome completo"
                   className={clsx(
                       styles['input-base'],
                       'w-[95%]',
                       'py-2.5',
                       errors.name && '!border-red-500')}/>

            {errors.name && <p className={styles['error-text']}>Nome é obrigatório.</p>}

            <div className={clsx(styles['label-container'], 'mb-1', 'mt-2')}>
              <label htmlFor="email" className={clsx(styles['form-label'], 'mb-1')}>Email</label>
            </div>

            <input id="email"
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   disabled={isSubmitting || showSuccessModal}
                   placeholder="exemplo@email.com"
                   className={clsx(
                       styles['input-base'],
                       'w-[95%]',
                       'py-2.5',
                       errors.email && '!border-red-500'
                   )}/>

            {errors.email && <p className={styles['error-text']}>Email inválido ou obrigatório.</p>}

            <div className={clsx(styles['label-container'], 'mb-1', 'mt-2')}>
              <label htmlFor="password" className={clsx(styles['form-label'], 'mb-1')}>Senha</label>
            </div>

            <input id="password"
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   disabled={isSubmitting || showSuccessModal}
                   placeholder="Mínimo 6 caracteres"
                   className={clsx(
                       styles['input-base'],
                       'w-[95%]',
                       'py-2.5',
                       errors.password && '!border-red-500'
                   )}/>

            {errors.password && <p className={styles['error-text']}>Senha é obrigatória (mín. 6 caracteres).</p>}

            <div className={clsx(styles['label-container'], 'mb-1', 'mt-2')}>
              <label htmlFor="confirmPassword" className={clsx(styles['form-label'], 'mb-1')}>
                Confirmar Senha
              </label>
            </div>

            <input id="confirmPassword"
                   type="password"
                   value={confirmPassword}
                   onChange={(e) => setConfirmPassword(e.target.value)}
                   disabled={isSubmitting || showSuccessModal}
                   placeholder="Confirme sua senha"
                   className={clsx(
                       styles['input-base'],
                       'w-[95%]',
                       'py-2.5',
                       errors.confirmPassword && '!border-red-500'
                   )}/>

            {errors.confirmPassword && <p className={styles['error-text']}>As senhas não coincidem.</p>}

            <div className={clsx(styles['label-container'], 'mb-1', 'mt-2')}>
              <label htmlFor="phone" className={clsx(styles['form-label'], 'mb-1')}>Telefone</label>
            </div>

            <input id="phone"
                   type="tel"
                   value={phone}
                   onChange={handlePhoneChange}
                   disabled={isSubmitting || showSuccessModal}
                   placeholder="(XX) XXXXX-XXXX"
                   className={clsx(
                       styles['input-base'],
                       'w-[95%]',
                       'py-2.5',
                       errors.phone && '!border-red-500'
                   )}/>

            {errors.phone && <p className={styles['error-text']}>Formato de telefone inválido.</p>}

            <div className={styles['register-footer']}>

              <button type="submit" disabled={isSubmitting || showSuccessModal}
                      className={clsx('btn-primary', 'h-12', 'w-[90%]')}>
                <h1 className="text-[20px]">{isSubmitting ? 'Cadastrando...' : 'Criar Conta'}</h1>
              </button>

            </div>
          </form>
        </section>

        {showSuccessModal && (
            <SuccessModal
                message={successMessage}
                onClose={handleCloseModal}
                onRedirect={handleRedirectToLogin}
            />
        )}
      </>
  );
}