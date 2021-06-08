import React from 'react'
import { ListTasksPage } from '@/presentation/pages'
import { makeListTasksUseCase, makeCreateTaskUseCase, makeChangeTaskToConcludedUseCase } from '@/main/factories/todo-list/use-cases'

export const ListTasksPageFactory: React.FC = () => (
  <ListTasksPage
    listTasksUseCase={makeListTasksUseCase()}
    createTaskUseCase={makeCreateTaskUseCase()}
    changeTaskToConcludedUseCase={makeChangeTaskToConcludedUseCase()}
  />
)
