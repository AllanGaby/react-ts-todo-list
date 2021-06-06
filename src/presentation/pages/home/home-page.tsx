import React from 'react'
import { useCustomTheme } from '@/presentation/hooks/custom-theme'

const HomePage: React.FC = () => {
  const { customTheme, toggleTheme } = useCustomTheme()
  return (
    <>
      <h1>Home Page</h1>
      <p onClick={toggleTheme}>{customTheme}</p>
    </>
  )
}

export default HomePage
