export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: "Food" | "Drink" | "Dessert" | "Snack";
  description: string;
  image: string;
};
