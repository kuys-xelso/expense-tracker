import { redirect } from "next/navigation";
import { hasServerSession } from "@/lib/auth-server";

export default async function Home() {
  const isAuthed = await hasServerSession();
  redirect(isAuthed ? "/dashboard" : "/login");
}
