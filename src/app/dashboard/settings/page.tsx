import { auth } from "@/../auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
  const session = await auth()
  
  if (!session?.user?.email) return redirect("/login")

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  async function updateEmail(formData: FormData) {
    "use server"
    const newEmail = formData.get("email") as string
    if (!newEmail || !user?.id) return
    
    await prisma.user.update({
      where: { id: user.id },
      data: { email: newEmail }
    })
    revalidatePath("/dashboard/settings")
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings and preferences.</p>
      </div>

      <div className="bg-card rounded-xl border p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Profile</h2>
        
        <form action={updateEmail} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input 
              type="text" 
              value={user?.name || ""} 
              disabled 
              className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-70"
            />
            <p className="text-xs text-muted-foreground">Your name is managed by your organization (IB Afridi).</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input 
              name="email"
              type="email" 
              defaultValue={user?.email || ""} 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <button type="submit" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}
