import { Footer } from "@/components/landing/footer";
import { FAQ } from "@/components/landing/faq";
import { Stats } from "@/components/landing/stats";
import Header from "@/components/landing/header";
import Features from "@/components/landing/features";
export default function Home() {
  return (
    <>
      <Header />
      <Features />
      <Stats />
      <FAQ />
      <Footer />
    </>
  );
}
