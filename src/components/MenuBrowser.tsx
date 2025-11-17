"use client";

import { useEffect, useMemo, useState } from "react";
import { MenuItem } from "@/types";
import { MENU_CATEGORIES } from "@/lib/menu";
import AddToOrderButton from "./AddToOrderButton";
import Link from "next/link";
import Image from "next/image";

type Props = {
  items: MenuItem[];
};

export default function MenuBrowser({ items }: Props) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] =
    useState<(typeof MENU_CATEGORIES)[number]>("All");

  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedSearch(search), 300);
    return () => window.clearTimeout(id);
  }, [search]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        category === "All" ? true : item.category === category;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, debouncedSearch, category]);

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-blue-600">Menu</p>
          <h1 className="text-3xl font-bold text-gray-900">Pick your meals</h1>
          <p className="text-gray-600">
            Search and filter through various dishes and drinks.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <input
            type="search"
            placeholder="Search ..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-white rounded-md border border-none px-4 py-2 text-sm"
            aria-label="Search menu items by name"
          />
          <select
            className="rounded-md bg-white px-4 py-2 text-sm pr-4"
            value={category}
            onChange={(event) =>
              setCategory(
                event.target.value as (typeof MENU_CATEGORIES)[number]
              )
            }
            aria-label="Filter by category"
          >
            {MENU_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredItems.length === 0 && (
          <p className="col-span-full rounded-md border border-dashed border-gray-300 px-4 py-10 text-center text-gray-500">
            No menu items match your criteria.
          </p>
        )}

        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5"
          >
            <div className="relative mb-4 aspect-4/3 overflow-hidden rounded-xl bg-gray-100">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="font-semibold text-gray-800">
                {item.category}
              </span>
              <span>${item.price.toFixed(2)}</span>
            </div>
            <Link
              href={`/menu/${item.id}`}
              className="mt-3 text-xl font-semibold text-gray-900 hover:text-blue-600"
            >
              {item.name}
            </Link>
            <p className="mt-2 flex-1 text-sm text-gray-600">
              {item.description}
            </p>
            <div className=" flex items-center justify-between">
              <Link
                href={`/menu/${item.id}`}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              ></Link>
              <AddToOrderButton item={item} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
