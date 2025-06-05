import { useState } from "react";
import EmailValidation from "@/components/login/forgot-password/EmailValidation";
import CodeValidation from "@/components/login/forgot-password/CodeValidation";
import NewPassword from "@/components/login/forgot-password/NewPassword";
import styles from '@/styles/modal.module.css';

export default function ForgotPassword({setForgotPassword}) {

    const [step, setStep] = useState('email');

    return (
        <div className={styles['overlay']} onClick={() => setForgotPassword(false)}>
            <div className={styles['container']} onClick={(e) => e.stopPropagation()}>

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
        </div>
    );
}