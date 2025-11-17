import MenuBrowser from "@/components/MenuBrowser";
import { getMenuItems } from "@/lib/menu";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAAT Menu",
  description: "Browse all food, drinks, and desserts available at SAAT.",
};

export default async function MenuPage() {
  const items = await getMenuItems();

  return (
    <div className="space-y-8">
      <MenuBrowser items={items} />
    </div>
  );
}
