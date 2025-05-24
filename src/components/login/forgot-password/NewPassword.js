import {useState} from "react";

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
            setError('Senha inválida. A senha deve ter pelo menos 8 caracteres, incluindo letras e números.');
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
        <div className={'w-[90vw] md:w-[70vw] lg:w-[50vw] h-[60vh] bg-white rounded-[20px] flex flex-col'}
             onClick={(e) => e.stopPropagation()}>

            <form onSubmit={handleNewPasswordSubmit} className="h-full flex flex-col">

                <div className={'w-full h-[16.665%] border-b-2 border-[#CCC]'}>
                    <div
                        className={'w-full h-full text-3xl font-bold text-[#333] font-inter flex items-center justify-center'}>
                        <h1 className={'text-center'}>Definir nova senha</h1>
                    </div>
                </div>

                <div className={'w-full h-[33.33%] flex items-center justify-center flex-col'}>

                    <div className="flex-[2] flex items-end justify-start w-[95%] mb-2 text-[22px] font-bold text-[#333] font-inter">
                        <label htmlFor="password">Nova senha:</label>
                    </div>

                    <div className="relative w-[95%] h-12">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className={`rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-full h-full pl-2 pr-10 ${error !== '' && (error.includes('Senha inválida') || error.includes('não coincidem')) ? 'border border-red-500' : ''}`}
                            style={{boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)'}}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </button>
                    </div>
                    {error && (error.includes('Senha inválida') || error.includes('não coincidem')) && <p className="text-red-500 text-sm mt-1 w-[95%] text-left">{error}</p>}
                </div>

                <div className={'w-full h-[33.33%] flex items-center justify-center flex-col'}>

                    <div className="flex-[2] flex items-end justify-start w-[95%] mb-2 text-[22px] font-bold text-[#333] font-inter">
                        <label htmlFor="confirmPassword">Confirmar senha:</label>
                    </div>

                    <div className="relative w-[95%] h-12">
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            className={`rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-full h-full pl-2 pr-10 ${error !== '' && error.includes('não coincidem') ? 'border border-red-500' : ''}`}
                            style={{boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)'}}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                        </button>
                    </div>
                    {error && error.includes('não coincidem') && <p className="text-red-500 text-sm mt-1 w-[95%] text-left">{error}</p>}
                </div>

                <div className={'w-full h-[33.33%] flex items-center justify-around'}>
                    <button type="button"
                            onClick={() => setForgotPassword(false)}
                            className={'w-[40%] h-[40%] flex items-center justify-center bg-[#F8F8F8] text-[#555] font-inter font-bold rounded-[20px] border-2 border-[#CCC] shadow'}>
                        <h1 className={'text-center'}>Voltar</h1>
                    </button>

                    <button
                        type="submit"
                        className={'w-[40%] h-[40%] flex items-center justify-center bg-[#123524] text-white font-inter font-bold rounded-[20px] border-2 border-[#CCC] shadow'}>
                        <h1 className={'text-center'}>Redefinir</h1>
                    </button>
                </div>

            </form>
        </div>
    );
}