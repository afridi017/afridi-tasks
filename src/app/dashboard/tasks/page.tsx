import { prisma } from "@/lib/prisma"
import { TasksBoard } from "./tasks-board"

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({
    orderBy: {
      order: 'asc'
    }
  })

  return (
    <div className="h-full flex flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <p className="text-muted-foreground mt-2">Manage your tasks by dragging and dropping them.</p>
      </div>
      <div className="flex-1 overflow-hidden">
        <TasksBoard initialTasks={tasks} />
      </div>
    </div>
  )
}
