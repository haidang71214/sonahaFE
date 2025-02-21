import BannerComponent from "../../components/Banner";

import SidebarNav from "@/components/SidebarNav";

export default function LocDuAn({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <BannerComponent />
      <div className="flex">
        <SidebarNav />
        <div style={{ width: "80%" }}>{children}</div>
      </div>
    </section>
  );
}
