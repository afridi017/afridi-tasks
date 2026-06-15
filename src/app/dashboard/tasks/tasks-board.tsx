"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Task } from "@prisma/client"
import { MoreVertical } from "lucide-react"

type TasksBoardProps = {
  initialTasks: Task[]
}

const columns = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
]

export function TasksBoard({ initialTasks }: TasksBoardProps) {
  const [tasks, setTasks] = useState(initialTasks)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId !== destination.droppableId) {
      // moving between columns
      const sourceTasks = tasks.filter((t) => t.status === source.droppableId)
      const destTasks = tasks.filter((t) => t.status === destination.droppableId)
      const otherTasks = tasks.filter(
        (t) => t.status !== source.droppableId && t.status !== destination.droppableId
      )

      const sourceTask = sourceTasks[source.index]
      sourceTasks.splice(source.index, 1)
      sourceTask.status = destination.droppableId

      destTasks.splice(destination.index, 0, sourceTask)

      // Recalculate order
      const newTasks = [...otherTasks, ...sourceTasks, ...destTasks]
      setTasks(newTasks)
      
      // Here you would make an API call to update the DB
    } else {
      // moving within the same column
      const colTasks = tasks.filter((t) => t.status === source.droppableId)
      const otherTasks = tasks.filter((t) => t.status !== source.droppableId)

      const [reorderedItem] = colTasks.splice(source.index, 1)
      colTasks.splice(destination.index, 0, reorderedItem)

      const newTasks = [...otherTasks, ...colTasks]
      setTasks(newTasks)

      // Here you would make an API call to update the DB
    }
  }

  if (!isMounted) return null

  return (
    <div className="flex h-full gap-6 overflow-x-auto pb-4">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id)

          return (
            <div key={col.id} className="flex flex-col flex-shrink-0 w-80 bg-muted/50 rounded-xl">
              <div className="p-4 border-b">
                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                  {col.title}
                  <span className="bg-muted px-2 py-0.5 rounded-full text-xs font-semibold">{colTasks.length}</span>
                </h3>
              </div>
              <Droppable droppableId={col.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`flex-1 p-3 space-y-3 ${snapshot.isDraggingOver ? "bg-muted/80" : ""}`}
                  >
                    {colTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-card p-4 rounded-lg shadow-sm border group hover:border-primary/50 transition-colors ${
                              snapshot.isDragging ? "shadow-md ring-1 ring-primary" : ""
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
                              <button className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity">
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </div>
                            {task.description && (
                              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{task.description}</p>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )
        })}
      </DragDropContext>
    </div>
  )
}
