import menuData from "@/data/menu.json";
import { MenuItem } from "@/types";

export const MENU_CATEGORIES = [
  "All",
  "Food",
  "Drink",
  "Dessert",
  "Snack",
] as const;

export async function getMenuItems(): Promise<MenuItem[]> {
  return menuData as MenuItem[];
}

export async function getMenuItem(id: string): Promise<MenuItem | undefined> {
  const items = await getMenuItems();
  return items.find((item) => item.id === id);
}
