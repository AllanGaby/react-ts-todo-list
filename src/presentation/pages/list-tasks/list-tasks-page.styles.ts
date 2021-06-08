import styled, { css } from 'styled-components'
import { Form } from '@unform/web'

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
`

export const TaskItem = styled.div`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #292C35;
  
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 10px;
    width: 100%;
    align-self: center;
  }

  p {
    width: 100%;
    margin-bottom: 10px;
  }

  button {
    border: 8px;
    background-color: #dc3545;
    padding: 10px;
    cursor: pointer;
    border: unset;
    transition: 0.5ms;    

    &:hover {
      opacity: 0.8;
    }
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
