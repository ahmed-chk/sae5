import { useState } from 'react'

export const useForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submit = async (form) => {
    // fake loading of 1s
    setLoading(true)
    console.log(form)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // replace with fetch POST:
    // const request = await fetch('https://jsonplaceholder.typicode.com/posts', {
    //   method: 'POST',
    //   body: JSON.stringify(form),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // })

    setLoading(false)
  }

  return {
    submit,
    loading,
    error,
  }
}