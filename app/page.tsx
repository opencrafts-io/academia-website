import { Footer } from "@/components/landing/footer";
import { FAQ } from "@/components/landing/faq";
import { Stats } from "@/components/landing/stats";
import Header from "@/components/landing/header";
import Features from "@/components/landing/features";
import { Downloads } from "@/components/landing/downloads";
export default function Home() {
  return (
    <>
      <Header />
      <Features />
      <Stats />
      <Downloads />
      <FAQ />
      <Footer />
    </>
  );
}
