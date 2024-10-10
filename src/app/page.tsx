import Image from "next/image";
import Header from "@/sections/header";
import Features from "@/sections/features";
import Community from "@/sections/community";
import Faq from "@/sections/faq";
import Pricing from "@/sections/pricing";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <Features />
      <Community />
      <Faq />
      <Pricing />
      <Footer />
    </>
  );
}
