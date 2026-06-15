import { prisma } from "@/lib/prisma"

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    include: {
      tasks: true
    }
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground mt-2">View and manage all your ongoing projects.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map(project => (
          <div key={project.id} className="bg-card rounded-xl border p-6 flex flex-col space-y-4 shadow-sm hover:border-primary/50 transition-colors">
            <div>
              <h3 className="font-semibold text-lg">{project.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
            </div>
            <div className="pt-4 border-t flex justify-between items-center text-sm text-muted-foreground">
              <span>{project.tasks.length} Tasks</span>
              <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed rounded-xl text-muted-foreground">
            No projects found.
          </div>
        )}
      </div>
    </div>
  )
}
