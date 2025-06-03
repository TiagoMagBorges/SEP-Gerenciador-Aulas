import Logo from "@/components/logo";
import HeroSection from "@/components/landing-page/HeroSection";
import FeaturesSection from "@/components/landing-page/FeaturesSection";
import PricingSection from "@/components/landing-page/PricingSection";
import FaqSection from "@/components/landing-page/FaqSection";
import NavBarLinks from "@/components/NavBarLinks";

export default function Home() {
  return (
      <div className={'main-background'}>

        <nav className={'navbar'}>
          <Logo/>

          <NavBarLinks/>
        </nav>

        <main className={'main overflow-y-auto'}>
          <HeroSection/>
          <FeaturesSection/>
          <PricingSection/>
          <FaqSection/>
        </main>

      </div>
  );
}