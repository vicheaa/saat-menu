import AddToOrderButton from "@/components/AddToOrderButton";
import { getMenuItem, getMenuItems } from "@/lib/menu";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  const menu = await getMenuItems();
  return menu.map((item) => ({ id: item.id }));
}

export default async function MenuDetailPage({ params }: Props) {
  const { id } = await params;
  const item = await getMenuItem(id);

  if (!item) {
    notFound();
  }

  return (
    <article className="rounded-xl bg-white p-8 ">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <Image
            src={item.image || "/placeholder.png"}
            alt={item.name}
            width={500}
            height={500}
            className="h-full w-full rounded-2xl object-cover aspect-square"
          />
        </div>

        <div className="flex flex-col space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase text-blue-600">{item.category}</p>
              <h1 className="text-4xl font-bold text-gray-900">{item.name}</h1>
            </div>
            <span className="shrink-0 text-3xl font-semibold text-gray-800">
              ${item.price.toFixed(2)}
            </span>
          </div>

          <p className="text-lg text-gray-700">{item.description}</p>

          {/* Spacer to push buttons to the bottom */}
          {/* <div className="flex-1" aria-hidden="true" /> */}

          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
            <Link
              href="/menu"
              className="rounded-md flex items-center gap-2 border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft />
              <p>Back</p>
            </Link>
            <div className="flex px-0 py-2 items-center gap-2 text-white cursor-pointer bg-blue-600 px-4 rounded-md">
              <AddToOrderButton item={item} />
              <p>Add to cart</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
