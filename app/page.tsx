import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Journey } from "@/components/sections/Journey";
import { Skills } from "@/components/sections/Skills";
import { Works } from "@/components/sections/Works";
import { Social } from "@/components/sections/Social";
import { Contact } from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Journey />
      <Skills />
      <Works />
      <Social />
      <Contact />
    </>
  );
}
