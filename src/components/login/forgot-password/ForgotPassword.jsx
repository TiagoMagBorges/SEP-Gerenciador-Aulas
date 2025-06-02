import { useState } from "react";
import EmailValidation from "@/components/login/forgot-password/EmailValidation";
import CodeValidation from "@/components/login/forgot-password/CodeValidation";
import NewPassword from "@/components/login/forgot-password/NewPassword";

export default function ForgotPassword({setForgotPassword}) {

    const [step, setStep] = useState('email');

    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={() => setForgotPassword(false)}>

            {step === 'email' && (
                <EmailValidation setStep={setStep} setForgotPassword={setForgotPassword}/>
            )}
            {step === 'validationCode' && (
                <CodeValidation setStep={setStep} setForgotPassword={setForgotPassword}/>
            )}
            {step === 'newPassword' && (
                <NewPassword setStep={setStep} setForgotPassword={setForgotPassword}/>
            )}
        </div>
    );
}