"use client";

import { useCartStore } from "@/store/cartStore";
import { MenuItem } from "@/types";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

type AddToOrderButtonProps = {
  item: MenuItem;
  variant?: "primary" | "ghost";
};

export default function AddToOrderButton({ item }: AddToOrderButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [didAdd, setDidAdd] = useState(false);

  useEffect(() => {
    if (!didAdd) {
      return;
    }
    const id = window.setTimeout(() => setDidAdd(false), 1500);
    return () => clearTimeout(id);
  }, [didAdd]);

  const handleAdd = () => {
    addItem(item);
    setDidAdd(true);
  };
  return (
    <button
      type="button"
      onClick={handleAdd}
      aria-live="polite"
      className="hover:text-blue-500 cursor-pointer"
    >
      <ShoppingCart />
    </button>
  );
}
