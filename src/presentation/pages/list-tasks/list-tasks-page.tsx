import React, { useState, useEffect } from 'react'
import { ListTasksUseCase, TaskModel } from '@/domain/todo-list'

export type ListTasksPageProps = {
  listTasksUseCase: ListTasksUseCase
}

export const ListTasksPage: React.FC<ListTasksPageProps> = ({ listTasksUseCase }: ListTasksPageProps) => {
  const [tasks, setTasks] = useState<TaskModel[]>(undefined)

  useEffect(() => {
    const setTasksSync = async (): Promise<void> => {
      const remoteTasks = await listTasksUseCase.list(undefined)
      console.log(remoteTasks)
      setTasks(remoteTasks)
    }

    setTasksSync()
  }, [])

  return (
    <>
      <h1>Todo List</h1>
      <ul>
        {tasks?.map(task => <li key={task.id}>{task.title}</li>)}
      </ul>
    </>
  )
}
