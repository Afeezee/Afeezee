import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { IdentityCards } from "@/components/IdentityCards";
import { Nav } from "@/components/Nav";

export default function Page() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <IdentityCards />
      <ContactForm />
      <Footer />
    </main>
  );
}
