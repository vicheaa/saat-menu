"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { MenuItem } from "@/types";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

type AddToOrderButtonProps = {
  item: MenuItem;
  variant?: "primary" | "ghost";
};

export default function AddToOrderButton({ item }: AddToOrderButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [flying, setFlying] = useState(false);
  const [targetPos, setTargetPos] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [startPos, setStartPos] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    setStartPos({ top: rect.top, left: rect.left });

    const cartIcon = document.getElementById("cart-icon");
    if (cartIcon) {
      const cartRect = cartIcon.getBoundingClientRect();
      setTargetPos({
        top: cartRect.top + cartRect.height / 2 - 12,
        left: cartRect.left + cartRect.width / 2 - 12,
      });
      setFlying(true);
    } else {
      addItem(item);
    }
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={handleAdd}
        aria-live="polite"
        className="hover:text-blue-600 text-black cursor-pointer"
        whileTap={{ scale: 0.9 }}
      >
        <ShoppingCart />
      </motion.button>

      <AnimatePresence>
        {flying && startPos && targetPos && (
          <motion.div
            initial={{
              position: "fixed",
              top: startPos.top,
              left: startPos.left,
              opacity: 1,
              scale: 1,
              zIndex: 50,
              pointerEvents: "none",
            }}
            animate={{
              top: targetPos.top,
              left: targetPos.left,
              scale: 0.5,
              opacity: 0.5,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            onAnimationComplete={() => {
              setFlying(false);
              addItem(item);
            }}
          >
            <div className="text-blue-600 p-2 bg-white rounded-full shadow-lg border border-blue-100">
              <ShoppingCart size={24} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
