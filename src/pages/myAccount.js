import LoginController from "@/controllers/LoginController";
import Logo from "@/components/logo";
import styles from "@/styles/navbar.module.css";
import Link from "next/link";

export default function MyAccount(){
    return(
        <div className={'main-background'}>
            <nav className={'navbar'}>
              <Logo/>
              <Link href={'/'} className={styles['navLink']}>
                Página Inicial
              </Link>
            </nav>
            <div className="main">
                <h2 className="text-xl font-semibold mb-4">Dados do Usuário</h2>
                <p><strong>Nome:</strong> {LoginController.currentUserData?.name}</p>
                <p><strong>Email:</strong> {LoginController.currentUserData?.email}</p>
                <p><strong>Telefone:</strong> {LoginController.currentUserData?.phone}</p>
            </div>
        </div>
    );
}