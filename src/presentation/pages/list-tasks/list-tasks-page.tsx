import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ListTasksUseCase, CreateTaskUseCase, CreateTaskDTO, TaskModel, TaskState, ChangeTaskToConcludedUseCase } from '@/domain/todo-list'
import { ListTaskContainer, TabContainer, TabItem, TaskContainer, TaskItem, FormContainer } from './list-tasks-page.styles'
import { FormHandles } from '@unform/core'
import { Input } from '@/presentation/components'

export type ListTasksPageProps = {
  listTasksUseCase: ListTasksUseCase
  createTaskUseCase: CreateTaskUseCase
  changeTaskToConcludedUseCase: ChangeTaskToConcludedUseCase
}

export const ListTasksPage: React.FC<ListTasksPageProps> = ({ listTasksUseCase, createTaskUseCase, changeTaskToConcludedUseCase }: ListTasksPageProps) => {
  const [tasks, setTasks] = useState<TaskModel[]>(undefined)
  const [taskState, setTaskState] = useState<TaskState>(TaskState.pending)
  const formRef = useRef<FormHandles>(null)

  useEffect(() => {
    const setTasksSync = async (): Promise<void> => {
      const remoteTasks = await listTasksUseCase.list(undefined)
      setTasks(remoteTasks)
    }

    setTasksSync()
  }, [])

  const handleViewPendingTasks = (): void => {
    setTaskState(TaskState.pending)
  }

  const handleViewConcludedTasks = (): void => {
    setTaskState(TaskState.concluded)
  }

  const handleSubmitTask = useCallback(async (data: CreateTaskDTO) => {
    try {
      await createTaskUseCase.create(data)
      const remoteTasks = await listTasksUseCase.list(undefined)
      setTasks(remoteTasks)
      formRef.current.reset()
    } catch (error) {
      window.alert(error)
    }
  }, [])

  const handleConcludedTask = useCallback(async (taskId: string) => {
    try {
      await changeTaskToConcludedUseCase.update(taskId, undefined)
      const remoteTasks = await listTasksUseCase.list(undefined)
      setTasks(remoteTasks)
    } catch (error) {
      window.alert(error)
    }
  }, [])

  return (
    <ListTaskContainer>
      <h1>Todo List</h1>
      <TabContainer>
        <TabItem selected={taskState === TaskState.pending} onClick={handleViewPendingTasks}>Pendentes</TabItem>
        <TabItem selected={taskState === TaskState.concluded} onClick={handleViewConcludedTasks}>Concluídas</TabItem>
      </TabContainer>
      {taskState === TaskState.pending &&
      <FormContainer onSubmit={handleSubmitTask} ref={formRef}>
        <label>Título</label>
        <Input name='title'/>
        <label>Descrição</label>
        <Input name='description'/>
        <label>E-mail</label>
        <Input name='email' type='email'/>
        <button type='submit'>Adicionar</button>
      </FormContainer>}
      <TaskContainer>
        {tasks?.filter(task => task.state === taskState).map(task =>
          <TaskItem key={task.id}>
            <h1>{task.title} - {task.id}</h1>
            <p>{task.description}</p>
            <button type='button' onClick={async () => await handleConcludedTask(task.id)}>Concluir?</button>
          </TaskItem>
        )}
      </TaskContainer>
    </ListTaskContainer>
  )
}
