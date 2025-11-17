"use client"; // This component needs client-side interactivity

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function Header() {
  // We use this to prevent hydration mismatch.
  // The cart count is read from localStorage and might differ from server render.
  const [cartCount, setCartCount] = useState(0);
  const { cart } = useCartStore();

  useEffect(() => {
    setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
  }, [cart]);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          SAAT
        </Link>
        <div className="flex space-x-4">
          <Link href="/" className="text-gray-600 hover:text-blue-500">
            Home
          </Link>
          <Link href="/menu" className="text-gray-600 hover:text-blue-500">
            Menu
          </Link>
          <Link href="/admin/add" className="text-gray-600 hover:text-blue-500">
            Add Item
          </Link>
          <Link
            href="/order"
            className="relative text-gray-600 hover:text-blue-500"
          >
            Order
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
