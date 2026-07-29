import Image from "next/image";
import { getSession } from "@/features/shared/data/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const { data, error } = await getSession();

  if (error || !data) {
    redirect("/login");
  }

  return (
    <div className="font-quicksand text-2xl font-bold">
      This is fictional realm frontend
    </div>
  );
}
