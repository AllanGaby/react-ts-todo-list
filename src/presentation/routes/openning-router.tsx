import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ListTasksPage } from '@/presentation/pages'

export type OpennigRouterProps = {
  listPage: typeof ListTasksPage
}

const OpennigRouter: React.FC<OpennigRouterProps> = ({ listPage }: OpennigRouterProps) => {
  return (
    <Switch>
      <Route path="/" exact component={listPage} />
    </Switch>
  )
}

export default OpennigRouter
