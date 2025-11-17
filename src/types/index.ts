export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: "Food" | "Drink" | "Dessert";
  description: string;
  image: string;
};
