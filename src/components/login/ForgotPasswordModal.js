import {useState} from "react";

export default function ForgotPasswordModal({setForgotPassword}) {

    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState({ email: false });

    const [validationCode, setValidationCode] = useState('');

    return(
        <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={() => setForgotPassword(false)}>

            <div className={'w-[90vw] md:w-[70vw] lg:w-[50vw] h-[60vh] bg-white rounded-[20px] flex flex-col'}
                 onClick={(e) => e.stopPropagation()}>

                <div className={'w-full h-[33.33%] border-b-2 border-[#CCC]'}>

                    <div className={'w-full h-[50%] text-3xl font-bold text-[#333] font-inter flex items-center justify-center'}>
                        <h1 className={'text-center'}>Recuperar senha</h1>
                    </div>

                    <div className={'w-full h-[50%] text-1xl  font-inter flex items-center justify-center'}>
                        <h1 className={'text-center'}>Enviaremos um código de validação para seu email</h1>
                    </div>

                </div>

                <div className={'w-full h-[33.33%] flex items-center justify-center flex-col'}>
                    <div className="flex-[2] flex items-end justify-start w-[95%] mb-2 text-[22px] font-bold text-[#333] font-inter">
                        <label htmlFor="email">Insira seu email:</label>
                    </div>

                    <input
                        id="email"
                        className={`flex-[2] rounded-[15px] md:rounded-[20px] bg-[#F8F8FF] w-[95%] pl-2 ${errors.email ? 'border border-red-500' : ''}`}
                        style={{boxShadow: 'inset 4px 4px 4px 0 rgba(0, 0, 0, 0.2)'}}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={'w-full h-[33.33%] flex items-center justify-around'}>

                    <button onClick={() => setForgotPassword(false)}
                        className={'w-[40%] h-[40%] flex items-center justify-center bg-[#F8F8F8] text-[#555] font-inter font-bold rounded-[20px] border-2 border-[#CCC] shadow'}>
                        <h1 className={'text-center'}>Voltar</h1>
                    </button>

                    <button className={'w-[40%] h-[40%] flex items-center justify-center bg-[#123524] text-white font-inter font-bold rounded-[20px] border-2 border-[#CCC] shadow'}>
                        <h1 className={'text-center'}>Enviar</h1>
                    </button>

                </div>

            </div>
        </div>
    );
}