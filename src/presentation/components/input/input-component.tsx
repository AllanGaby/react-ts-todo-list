import React, { InputHTMLAttributes, useRef, useEffect, PropsWithChildren } from 'react'
import { useField } from '@unform/core'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
}

type InputPropsWithChildren = PropsWithChildren<InputProps>

export const Input: React.FC<InputPropsWithChildren> = ({ name, ...rest }: InputPropsWithChildren) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, registerField, defaultValue } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <input
      ref={inputRef}
      defaultValue={defaultValue}
      {...rest}/>
  )
}
