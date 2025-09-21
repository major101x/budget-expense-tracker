"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { loginFormSchema } from "./page";

export async function login(formData: z.infer<typeof loginFormSchema>) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: z.infer<typeof loginFormSchema>) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp(formData);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
