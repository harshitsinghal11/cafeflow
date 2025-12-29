"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function adminLogin(formData: FormData) {
  const pin = formData.get("pin");
  // Make sure ADMIN_SECRET_PIN matches your .env.local file
  if (pin === process.env.ADMIN_SECRET_PIN) {
    
    // Set the cookie
    (await
      // Set the cookie
      cookies()).set("admin_session", "true", { 
      expires: Date.now() + 24 * 60 * 60 * 1000,
      httpOnly: true, 
      path: "/",
    });

    redirect("/admin");
  } else {
    redirect("/admin/login?error=Invalid PIN");
  }
}

// --- LOGOUT ACTION (Add this) ---
export async function adminLogout() {
  const cookieStore = await cookies();
  
  // 1. Delete the cookie
  cookieStore.delete("admin_session");

  // 2. Kick user back to login
  redirect("/admin/login");
}