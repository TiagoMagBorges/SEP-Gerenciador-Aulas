import { useState, useRef, useEffect } from "react";
import LoginController from "@/controllers/LoginController";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from '@/styles/navbar.module.css';

export default function NavBarLinks() {

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    LoginController.logout();
    setOpen(false);
    router.push("/login");
  };

  if (!LoginController.isAuthenticated())
    return (
        <Link href="/login" className={styles.navLink}>
          Login / Criar Conta
        </Link>
    );

  const chevronClasses = `${styles.chevronIcon} ${open ? styles.chevronOpen : ''}`;
  const menuClasses = `${styles.menu} ${open ? styles.menuOpen : styles.menuClosed}`;

  return (
      <div className={styles.dropdownContainer} ref={dropdownRef}>
        <button
            onClick={() => setOpen((prev) => !prev)}
            className={styles.dropdownButton}
        >
          Minha Conta
          <svg
              className={chevronClasses}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className={menuClasses}>
          <div className={styles.menuContent}>
            <Link
                href="/myAccount"
                className={styles.menuItem}
                onClick={() => setOpen(false)}
            >
              Acessar Conta
            </Link>
            <button
                onClick={handleLogout}
                className={styles.menuItem}
            >
              Sair
            </button>
          </div>
        </div>
      </div>
  );
}