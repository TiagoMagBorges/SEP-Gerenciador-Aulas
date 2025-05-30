import {useState} from "react";

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
        <div className={'w-[90vw] md:w-[70vw] lg:w-[50vw] h-[60vh] bg-white rounded-[20px] flex flex-col'}
             onClick={(e) => e.stopPropagation()}>

            <form onSubmit={handleCodeSubmit} className="h-full flex flex-col">

                <div className={'w-full h-[33.33%] border-b-2 border-[#CCC]'}>
                    <div
                        className={'w-full h-[50%] text-3xl font-bold text-[#333] font-inter flex items-center justify-center'}>
                        <h1 className={'text-center'}>Recuperar senha</h1>
                    </div>
                    <div className={'w-full h-[50%] text-1xl font-inter flex items-center justify-center'}>
                        <h1 className={'text-center'}>
                            O código de validação foi enviado para o seu email
                        </h1>
                    </div>
                </div>

                <div className={'w-full h-[33.33%] flex items-center justify-center flex-col'}>

                    <div
                        className="flex-[2] flex items-end justify-start w-[95%] mb-2 text-[22px] font-bold text-[#333] font-inter">
                        <label htmlFor="validationCode">Código de validação:</label>
                    </div>

                    <input
                        id="validationCode"
                        type="text"
                        className={`flex-[2] rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-[95%] pl-2 ${error !== '' ? 'border border-red-500' : ''}`}
                        style={{boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)'}}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    {error && <p className="text-red-500 text-sm mt-1 w-[95%] text-left">{error}</p>}
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
                        <h1 className={'text-center'}>Validar</h1>
                    </button>
                </div>

            </form>
        </div>
    );
}
