import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { HomePage } from '@/presentation/pages'

const OpennigRouter: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
    </Switch>
  )
}

export default OpennigRouter
