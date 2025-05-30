import { useState } from "react";
import LoginController from "@/controllers/LoginController";

export default function RegisterForm({ setIsLogin }) {

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');

    const [phone, setPhone] = useState('');

    const [errors, setErrors] = useState({});

    const [submissionError, setSubmissionError] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmissionError('');
        setIsSubmitting(true);

        const newErrors = {
            name: name === '',
            email: email === '',
            password: password === '' || password.length < 6,
            confirmPassword: confirmPassword === '' || password !== confirmPassword,
        };
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error);

        if (!hasErrors) {
            try {
                const userData = { name, email, password, phone };
                await LoginController.register(userData);

                alert('Cadastro realizado com sucesso! Faça login com suas novas credenciais.');
                setIsLogin(true);
            } catch (error) {
                setSubmissionError(error.message || 'Erro inesperado durante o cadastro.');
            }
        }
        setIsSubmitting(false); // End loading
    };

    return (
        <section className="w-[100%] md:w-8/12 h-[100%] rounded-[15px] md:rounded-tr-[20px] md:rounded-br-[20px] flex flex-col bg-white">

            <div className="flex-[1] rounded-tr-[15px] md:rounded-tr-[20px] content-center text-center relative">
                <button onClick={() => setIsLogin(true)}
                        className="md:hidden absolute top-0 left-0 bg-[#123524] text-white font-black rounded-tl-[15px] rounded-br-[15px] w-10 h-10">
                    {`<`}
                </button>
                <h1 className="text-2xl font-extrabold text-[#333] font-inter">Crie sua conta!</h1>
            </div>
            <form className="flex-[10] flex flex-col items-center" onSubmit={handleSubmit}>

                {submissionError && <p className="text-red-500 text-sm mt-2">{submissionError}</p>}

                <div className="flex-[1] flex items-end justify-start w-[95%] mb-2 text-lg font-bold text-[#333] font-inter">
                    <label htmlFor="name">Nome Completo:</label>
                </div>
                <input
                    id="name"
                    className={`flex-[1] rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-[95%] pl-2 ${errors.name ? 'border border-red-500' : ''}`}
                    style={{boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)'}}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1 w-[95%] text-left">Nome é obrigatório.</p>}

                <div className="flex-[1] flex items-end justify-start w-[95%] mb-2 text-lg font-bold text-[#333] font-inter">
                    <label htmlFor="email">Email:</label>
                </div>
                <input
                    id="email"
                    className={`flex-[1] rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-[95%] pl-2 ${errors.email ? 'border border-red-500' : ''}`}
                    style={{boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)'}}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1 w-[95%] text-left">Email é obrigatório.</p>}

                <div className="flex-[1] flex items-end justify-start w-[95%] mb-2 text-lg font-bold text-[#333] font-inter">
                    <label htmlFor="password">Senha:</label>
                </div>
                <input
                    id="password"
                    className={`flex-[1] rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-[95%] pl-2 ${errors.password ? 'border border-red-500' : ''}`}
                    style={{boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)'}}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1 w-[95%] text-left">Senha é obrigatória e deve ter pelo menos 6 caracteres.</p>}

                <div className="flex-[1] flex items-end justify-start w-[95%] mb-2 text-lg font-bold text-[#333] font-inter">
                    <label htmlFor="confirmPassword">Confirmar Senha:</label>
                </div>
                <input
                    id="confirmPassword"
                    className={`flex-[1] rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-[95%] pl-2 ${errors.confirmPassword ? 'border border-red-500' : ''}`}
                    style={{boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)'}}
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isSubmitting}
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1 w-[95%] text-left">As senhas não coincidem ou a confirmação é obrigatória.</p>}

                <div className="flex-[1] flex items-end justify-start w-[95%] mb-2 text-lg font-bold text-[#333] font-inter">
                    <label htmlFor="phone">Telefone:</label>
                </div>
                <input
                    id="phone"
                    className={`flex-[1] rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-[95%] pl-2`}
                    style={{boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)'}}
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isSubmitting}
                />

                <div className="flex-[2] w-full flex justify-center items-center">
                    <button type="submit"
                            className="h-[50%] w-[90%] rounded-[15px] md:rounded-[20px] bg-[#123524] shadow items-center"
                            disabled={isSubmitting}>
                        <h1 className="text-[20px] text-white font-bold">{isSubmitting ? 'Cadastrando...' : 'Cadastrar'}</h1>
                    </button>
                </div>
            </form>
        </section>
    );
}