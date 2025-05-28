import '../styles/globals.css';
import { useEffect } from 'react';
import LoginController from '@/controllers/LoginController';

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        LoginController.initialize();
    }, []);

    return <Component {...pageProps} />;
}