import { prisma } from "@/lib/prisma"

export default async function TeamPage() {
  const users = await prisma.user.findMany()

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
          <p className="text-muted-foreground mt-2">People working on Afridi Tasks.</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium text-sm inline-flex items-center">
          <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          Managed by IB Afridi
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map(user => (
          <div key={user.id} className="bg-card rounded-xl border p-6 flex flex-col items-center text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center text-2xl font-bold">
              {user.name?.charAt(0) || "U"}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
