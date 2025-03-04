import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import BannerComponent from "@/components/Banner";

export default function Home() {
  return (
    <section className="h-full w-full">
      <BannerComponent/>
      <div style={{height:'2000px'}}>a</div>
    </section>
  );
}
