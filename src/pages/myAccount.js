import LoginController from "@/controllers/LoginController";
import Logo from "@/components/logo";
import styles from "@/styles/navbar.module.css";
import Link from "next/link";

export default function MyAccount() {

  const user = LoginController.getCurrentUser();

  return (
      <div className={'main-background'}>
        <nav className={'navbar'}>
          <Logo/>
          <Link href={'/'} className={styles['navLink']}>
            Página Inicial
          </Link>
        </nav>
        <div className={'main'}>
          <h2 className={'text-xl font-semibold mb-4'}>Dados do Usuário</h2>
          <p><strong>Nome:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Telefone:</strong> {user?.phone}</p>
        </div>
      </div>
  );
}