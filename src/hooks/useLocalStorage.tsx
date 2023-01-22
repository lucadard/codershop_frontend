import React, { useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (err) {
      return initialValue
    }
  })
  function setValue(value: T) {
    try {
      setStoredValue(value)
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error(err)
    }
  }
  return { value: storedValue, setValue }
}

export default useLocalStorage
