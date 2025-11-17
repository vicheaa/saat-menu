import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-start gap-8 rounded-3xl bg-linear-to-br from-[#000046] to-[#1CB5E0] px-8 py-16 text-white shadow-xl lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-6 lg:max-w-xl">
        <p className="text-sm uppercase tracking-widest text-blue-100">
          SAAT Restaurant
        </p>
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
          SAAT Menu
        </h1>
        <p className="text-lg text-blue-100">
          Find your next favorite meal! Explore our tasty of all kinds of
          Dished, cool drinks, and sweet treats. Browse the menu and start your
          order in just a couple of clicks.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/menu"
            className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-[#000046] shadow-lg transition hover:bg-blue-50"
          >
            Explore the Menu
          </Link>
          <Link
            href="/order"
            className="rounded-full border border-white/60 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View Order
          </Link>
        </div>
      </div>
      <div className="rounded-3xl bg-white/10 p-6 text-sm text-blue-100 backdrop-blur">
        <p className="font-medium uppercase tracking-widest text-white">
          Hours
        </p>
        <p>Daily · 06:00 – 21:00</p>
        <p className="mt-4 font-medium uppercase tracking-widest text-white">
          Location
        </p>
        <p>Siem Reap, Cambodia</p>
      </div>
    </section>
  );
}
