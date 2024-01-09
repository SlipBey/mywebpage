import { HeroAbout } from "./about";
import { HeroStacks } from "./stacks";

export const IndexHero: React.FC = () => {
  return (
    <section id="about" className="pb-12 md:pb-24 lg:pt-20">
      <div className="flex lg:flex-row flex-col justify-between items-center">
        <HeroAbout />
        <HeroStacks />
      </div>
    </section>
  );
};
