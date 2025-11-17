"use client";

import { useCartStore } from "@/store/cartStore";
import toast, { Toaster } from "react-hot-toast";
import { Trash } from "lucide-react";

export default function OrderPage() {
  const cart = useCartStore((state) => state.cart);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearOrder = useCartStore((state) => state.clearOrder);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const total = cart.reduce(
    (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
    0
  );

  const notify = () => toast("Comming soon 😉 ...");

  if (cart.length === 0) {
    return (
      <section className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Your order</h1>
        <p className="mt-4 text-gray-600">No items in order.</p>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-wide text-blue-600">
          Current order
        </p>
        <div className="w-full flex justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Ready to checkout?
          </h1>
          <button
            onClick={clearOrder}
            className="text-red-600 hover:text-red-400 hover:cursor-pointer"
          >
            Clear order
          </button>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map(({ item, quantity }) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm uppercase text-gray-500">
                      {item.category}
                    </p>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>

                  <div className="flex flex-col items-start gap-4 sm:items-end">
                    <div className="flex gap-4">
                      <p className="text-sm font-semibold text-gray-900">
                        ${item.price.toFixed(2)} × {quantity}
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="rounded-md text-sm font-medium text-red-600 hover:text-red-300"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="rounded-md border border-gray-200 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        className="rounded-md border border-gray-200 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={() => increaseQuantity(item.id)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white">
              <div className="flex items-center justify-between px-6 py-4 ">
                <p className="text-lg font-semibold">Sub Total</p>
                <p className="text-3xl font-bold">${total.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between px-6 py-4 ">
                <p className="text-lg font-semibold">Total Discount</p>
                <p className="text-3xl font-bold">$0.00</p>
              </div>
              <div className="flex items-center justify-between px-6 py-4 ">
                <p className="text-lg font-semibold">Total</p>
                <p className="text-3xl font-bold">${total.toFixed(2)}</p>
              </div>
              <div className="p-6">
                <button
                  type="button"
                  className="w-full rounded-lg bg-blue-600 py-3 text-lg font-semibold text-white hover:bg-blue-700"
                  onClick={notify}
                >
                  Proceed to Checkout
                </button>
                <Toaster />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
