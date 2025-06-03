import Logo from '@/components/logo';
import Link from 'next/link';

export function Footer() {
  return (
      <footer className="w-full max-w-6xl text-white p-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo />
          <div className="flex gap-6 font-medium">
            <Link href="/terms" className="hover:underline">Termos de Serviço</Link>
            <Link href="/privacy" className="hover:underline">Política de Privacidade</Link>
          </div>
        </div>
        <div className="mt-6 text-center text-gray-400 border-t border-gray-700 pt-6">
          © {new Date().getFullYear()} SEP. Todos os direitos reservados.
        </div>
      </footer>
  );
}