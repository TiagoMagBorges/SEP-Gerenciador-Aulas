import { useState } from "react";
import LoginController from "@/controllers/LoginController";
import SuccessModal from "@/components/login/SuccesModal";

export default function RegisterForm({ setIsLogin }) {

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
                const userData = { name, email, password, phone };
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

    const inputBaseStyles = "rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-[95%] pl-3 disabled:opacity-70 disabled:cursor-not-allowed";
    const inputStyle = { boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)' };
    const focusClasses = "focus:outline-none focus:ring-2 focus:ring-[#123524]";
    const buttonDisabledClasses = "disabled:opacity-60 disabled:cursor-not-allowed";
    const inputVerticalPadding = "py-2.5";

    return (
        <>
            <section className="w-[100%] md:w-8/12 h-[100%] rounded-[15px] md:rounded-tr-[20px] md:rounded-br-[20px] flex flex-col bg-white">

                <div className="flex-[1] rounded-tr-[15px] md:rounded-tr-[20px] content-center text-center relative py-4">
                    <button onClick={() => setIsLogin(true)}
                            className={`md:hidden absolute top-1/2 left-3 -translate-y-1/2 bg-[#123524] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center z-10 ${buttonDisabledClasses}`}
                            disabled={isSubmitting || showSuccessModal}> {/* Disable if modal is open */}
                        {`<`}
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800 font-inter">Crie sua conta!</h1>
                </div>
                <form className="flex-[10] flex flex-col items-center px-4 pt-2 pb-1 overflow-y-auto" onSubmit={handleSubmit}>

                    {submissionError && <p className="text-red-500 text-sm w-[95%] text-center mb-3 mt-1">{submissionError}</p>}

                    <div className="w-[95%] mb-1">
                        <label htmlFor="name" className="block text-lg font-semibold text-gray-700 font-inter mb-1">Nome Completo</label>
                    </div>
                    <input
                        id="name"
                        className={`flex-grow-0 flex-shrink-0 basis-auto ${inputVerticalPadding} ${inputBaseStyles} border ${errors.name ? 'border-red-500' : 'border-transparent focus:border-[#123524]'} ${focusClasses}`}
                        style={inputStyle}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isSubmitting || showSuccessModal}
                        placeholder="Digite seu nome completo"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 w-[95%] text-left">Nome é obrigatório.</p>}

                    <div className="w-[95%] mb-1 mt-2">
                        <label htmlFor="email" className="block text-lg font-semibold text-gray-700 font-inter mb-1">Email</label>
                    </div>
                    <input
                        id="email"
                        className={`flex-grow-0 flex-shrink-0 basis-auto ${inputVerticalPadding} ${inputBaseStyles} border ${errors.email ? 'border-red-500' : 'border-transparent focus:border-[#123524]'} ${focusClasses}`}
                        style={inputStyle}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting || showSuccessModal}
                        placeholder="exemplo@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 w-[95%] text-left">Email inválido ou obrigatório.</p>}

                    <div className="w-[95%] mb-1 mt-2">
                        <label htmlFor="password" className="block text-lg font-semibold text-gray-700 font-inter mb-1">Senha</label>
                    </div>
                    <input
                        id="password"
                        className={`flex-grow-0 flex-shrink-0 basis-auto ${inputVerticalPadding} ${inputBaseStyles} border ${errors.password ? 'border-red-500' : 'border-transparent focus:border-[#123524]'} ${focusClasses}`}
                        style={inputStyle}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isSubmitting || showSuccessModal}
                        placeholder="Mínimo 6 caracteres"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1 w-[95%] text-left">Senha é obrigatória (mín. 6 caracteres).</p>}

                    <div className="w-[95%] mb-1 mt-2">
                        <label htmlFor="confirmPassword" className="block text-lg font-semibold text-gray-700 font-inter mb-1">Confirmar Senha</label>
                    </div>
                    <input
                        id="confirmPassword"
                        className={`flex-grow-0 flex-shrink-0 basis-auto ${inputVerticalPadding} ${inputBaseStyles} border ${errors.confirmPassword ? 'border-red-500' : 'border-transparent focus:border-[#123524]'} ${focusClasses}`}
                        style={inputStyle}
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isSubmitting || showSuccessModal}
                        placeholder="Confirme sua senha"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 w-[95%] text-left">As senhas não coincidem.</p>}

                    <div className="w-[95%] mb-1 mt-2">
                        <label htmlFor="phone" className="block text-lg font-semibold text-gray-700 font-inter mb-1">Telefone</label>
                    </div>
                    <input
                        id="phone"
                        className={`flex-grow-0 flex-shrink-0 basis-auto ${inputVerticalPadding} ${inputBaseStyles} border ${errors.phone ? 'border-red-500' : 'border-transparent focus:border-[#123524]'} ${focusClasses}`}
                        style={inputStyle}
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        disabled={isSubmitting || showSuccessModal}
                        placeholder="(XX) XXXXX-XXXX"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1 w-[95%] text-left">Formato de telefone inválido.</p>}


                    <div className="w-[95%] mt-auto pt-4 pb-3 flex flex-col items-center">
                        <button type="submit"
                                className={`h-12 w-[90%] rounded-[15px] md:rounded-[20px] bg-[#123524] hover:bg-[#0e2a1c] active:bg-[#0a1e15] shadow flex justify-center items-center text-white transition-colors duration-150 ${buttonDisabledClasses} disabled:bg-[#123524]`}
                                disabled={isSubmitting || showSuccessModal}>
                            <h1 className="text-[20px] font-semibold">{isSubmitting ? 'Cadastrando...' : 'Criar Conta'}</h1>
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