import Logo from "@/components/logo";
import { HeroSection } from "@/components/landing-page/HeroSection";
import { FeaturesSection } from "@/components/landing-page/FeaturesSection";
import { PricingSection } from "@/components/landing-page/PricingSection";
import { FaqSection } from "@/components/landing-page/FaqSection";
import Link from "next/link";
import LoginController from "@/controllers/LoginController";

export default function Home() {
  return (
      <div className={'main-background'}>

        <nav className={'w-[90vw] h-[10vh] lg:w-[95vw] flex justify-between items-center text-white p-4'}>
          <Logo/>

          <Link href={LoginController.currentUserData === null ? '/login' : '/myAccount'}>
            {LoginController.currentUserData === null ? 'Login / Criar Conta' : 'Minha Conta'}
          </Link>
        </nav>

        <div className="w-[90vw] h-[90vh] lg:w-[95vw] bg-white rounded-[20px] overflow-y-auto overflow-x-hidden">
          <main>
            <HeroSection />
            <FeaturesSection />
            <PricingSection />
            <FaqSection />
          </main>
        </div>

      </div>
  );
}