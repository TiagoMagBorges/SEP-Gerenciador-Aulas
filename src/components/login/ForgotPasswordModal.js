import { useState } from "react";

export default function ForgotPasswordModal({ setForgotPassword }) {
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState({ email: '', validationCode: '' });

    const [emailChecked, setEmailChecked] = useState(false);

    const [validationCode, setValidationCode] = useState('');

    const handleEmailSubmit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrors({ ...errors, email: 'Email inválido ou vazio.' });
            return;
        } else {

            setErrors({ ...errors, email: '' });
        }

        setTimeout(() => {
            setEmailChecked(true);
            console.log('Validation code sent to:', email);
        }, 500);
    };

    const handleValidationCodeSubmit = () => {
        if (validationCode.length !== 6 || !/^\d+$/.test(validationCode)) {
            setErrors({ ...errors, validationCode: 'Código de validação inválido.' });
            return;
        } else {
            setErrors({ ...errors, validationCode: '' });
        }

        console.log('Validation code verified:', validationCode);
        setForgotPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        emailChecked ? handleValidationCodeSubmit() : handleEmailSubmit();
    };

    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={() => setForgotPassword(false)}>

            <div className={'w-[90vw] md:w-[70vw] lg:w-[50vw] h-[60vh] bg-white rounded-[20px] flex flex-col'}
                 onClick={(e) => e.stopPropagation()}>

                <form onSubmit={handleSubmit} className="h-full flex flex-col">

                    <div className={'w-full h-[33.33%] border-b-2 border-[#CCC]'}>
                        <div className={'w-full h-[50%] text-3xl font-bold text-[#333] font-inter flex items-center justify-center'}>
                            <h1 className={'text-center'}>Recuperar senha</h1>
                        </div>
                        <div className={'w-full h-[50%] text-1xl font-inter flex items-center justify-center'}>
                            <h1 className={'text-center'}>
                                {emailChecked
                                    ? 'O código de validação foi enviado para o seu email'
                                    : 'Insira seu email para receber o código de validação'}
                            </h1>
                        </div>
                    </div>

                    <div className={'w-full h-[33.33%] flex items-center justify-center flex-col'}>
                        {!emailChecked ? (
                            <>
                                <div className="flex-[2] flex items-end justify-start w-[95%] mb-2 text-[22px] font-bold text-[#333] font-inter">
                                    <label htmlFor="email">Email:</label>
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    className={`flex-[2] rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-[95%] pl-2 ${errors.email !== '' ? 'border border-red-500' : ''}`}
                                    style={{ boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)' }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1 w-[95%] text-left">{errors.email}</p>}
                            </>
                        ) : (
                            <>
                                <div className="flex-[2] flex items-end justify-start w-[95%] mb-2 text-[22px] font-bold text-[#333] font-inter">
                                    <label htmlFor="validationCode">Código de validação:</label>
                                </div>
                                <input
                                    id="validationCode"
                                    type="text"
                                    className={`flex-[2] rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-[95%] pl-2 ${errors.validationCode !== '' ? 'border border-red-500' : ''}`}
                                    style={{ boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)' }}
                                    value={validationCode}
                                    onChange={(e) => setValidationCode(e.target.value)}
                                />
                                {errors.validationCode && <p className="text-red-500 text-sm mt-1 w-[95%] text-left">{errors.validationCode}</p>}
                            </>
                        )}
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
                            <h1 className={'text-center'}>{emailChecked ? 'Validar' : 'Enviar'}</h1>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
