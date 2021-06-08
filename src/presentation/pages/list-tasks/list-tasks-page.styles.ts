import styled, { css } from 'styled-components'
import { Form } from '@unform/web'
import { TaskState } from '@/domain/todo-list'

export const ListTaskContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 50%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 40px;

  h1 {
    margin-bottom: 40px;
  }
`

export const TabContainer = styled.ul`
  display: flex;  
  list-style-type: none;
  width: 100%;
`

type TabItemProps = {
  selected: boolean
}

export const TabItem = styled.li<TabItemProps>`
  cursor: pointer;
  flex-grow: 1;
  font-size: 24px;
  line-height: 32px;
  font-weight: 500;
  text-align: center;
  border-bottom: 3px solid #292C35;
  color: #596273;
  padding-bottom: 16px;  

  ${props =>
    props.selected &&
    css`
      color: #FBFBFC;
      border-color: #D30529;
    `} 
`

export const TaskContainer = styled.section`
  display: flex;  
  width: 100%;
  flex-direction: column;
  margin-top: 20px;
`

type TaskItemProps = {
  state: TaskState
}

export const TaskItem = styled.div<TaskItemProps>`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #292C35;
  
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  form {
    display: none;
  }

  h1 {
    margin-bottom: 10px;
    width: 100%;
    align-self: center;
  }

  p {
    width: 100%;
    margin-bottom: 10px;
  }

  &:hover {
    border: 1px solid white;
    ${props =>
      props.state === TaskState.concluded &&
      css`
        form {
          display: block;
        }
      `}
  }  

  button {
    border: 8px;    
    background-color: #dc3545;
    padding: 10px;
    cursor: pointer;
    border: unset;
    transition: 0.5ms;  
    border-radius: 8px;

    &:hover {
      opacity: 0.8;
    }

    ${props =>
      props.state === TaskState.pending
      ? css`
        background-color: #dc3545;
      `
      : css`
        background-color: #0d6efd;
      `}
  }
`

export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;  
  width: 100%;
  padding: 20px;

  input, button, label {
    width: 100%;
    margin: 8px;
    border-radius: 8px;    
  }

  input {
    padding: 5px;
  }

  button {
    background-color: #198754;
    padding: 10px;
    cursor: pointer;
    border: unset;
    transition: 0.5ms;    

    &:hover {
      opacity: 0.8;
    }
  }
`
