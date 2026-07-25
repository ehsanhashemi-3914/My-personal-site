import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Journey } from "@/components/sections/Journey";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Github } from "@/components/sections/Github";
import { Social } from "@/components/sections/Social";
import { Contact } from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Journey />
      <Skills />
      <Projects />
      <Github />
      <Social />
      <Contact />
    </>
  );
}
