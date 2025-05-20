import Link from "next/link";
import {useState} from "react";

export default function RegisterForm({setIsLogin}) {

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');

    const [phone, setPhone] = useState('');

    const [errors, setErrors] = useState({ email: false, password: false });

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = {
            name: name === '',
            email: email === '',
            password: password === '',
            confirmPassword: confirmPassword === '' || password !== confirmPassword
        };
        setErrors(newErrors);

        if (!newErrors.email && !newErrors.password) {
            console.log({ email, password });
        }
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

                <div
                    className="flex-[1] flex items-end justify-start w-[95%] mb-2 text-lg font-bold text-[#333] font-inter">
                <label htmlFor="name">Nome Completo:</label>
                </div>

                <input
                    id="name"
                    className={`flex-[1] rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-[95%] pl-2 ${errors.name ? 'border border-red-500' : ''}`}
                    style={{boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)'}}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <div
                    className="flex-[1] flex items-end justify-start w-[95%] mb-2 text-lg font-bold text-[#333] font-inter">
                    <label htmlFor="email">Email:</label>
                </div>

                <input
                    id="email"
                    className={`flex-[1] rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-[95%] pl-2 ${errors.email ? 'border border-red-500' : ''}`}
                    style={{boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)'}}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div
                    className="flex-[1] flex items-end justify-start w-[95%] mb-2 text-lg font-bold text-[#333] font-inter">
                    <label htmlFor="password">Senha:</label>
                </div>

                <input
                    id="password"
                    className={`flex-[1] rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-[95%] pl-2 ${errors.confirmPassword ? 'border border-red-500' : ''}`}
                    style={{boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)'}}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div
                    className="flex-[1] flex items-end justify-start w-[95%] mb-2 text-lg font-bold text-[#333] font-inter">
                    <label htmlFor="confirmPassword">Confirmar Senha:</label>
                </div>

                <input
                    id="confirmPassword"
                    className={`flex-[1] rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-[95%] pl-2 ${errors.confirmPassword ? 'border border-red-500' : ''}`}
                    style={{boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)'}}
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div
                    className="flex-[1] flex items-end justify-start w-[95%] mb-2 text-lg font-bold text-[#333] font-inter">
                    <label htmlFor="phone">Telefone:</label>
                </div>

                <input
                    id="phone"
                    className={`flex-[1] rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-[95%] pl-2`}
                    style={{boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)'}}
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <div className="flex-[2] w-full flex justify-center items-center">
                    <button type="submit"
                            className="h-[50%] w-[90%] rounded-[15px] md:rounded-[20px] bg-[#123524] shadow items-center">
                        <h1 className="text-[20px] text-white font-bold">Entrar</h1>
                    </button>
                </div>

            </form>
        </section>
    );
}