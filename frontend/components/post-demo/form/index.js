'use client';

import { useState } from 'react'

import { useForm } from './hook/useForm';

export const Form = () => {
  const { submit, loading } = useForm()
  const [form, setForm] = useState({
    name: '',
    description: '',
  })

  return (
    <div className="max-w-xl grid grid-cols-1 gap-5">
      {loading && (
        <div className="bg-pink-500 text-neutral-100 rounded-xl px-5 py-4">
          Loading...
        </div>
      )}
      <div>
        <label className="block mb-2 text-xs text-neutral-300 uppercase">Name</label>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          className="border-none bg-neutral-800/80 focus:ring-blue-300/30 ring-4 ring-transparent outline-none text-neutral-100 rounded-lg px-4 py-3 w-full"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div>
        <label className="block mb-2 text-xs text-neutral-300 uppercase">Description</label>
        <textarea
          type="text"
          placeholder="Description"
          rows={8}
          value={form.description}
          className="border-none resize-none bg-neutral-800/80 focus:ring-blue-300/30 ring-4 ring-transparent outline-none text-neutral-100 rounded-lg px-4 py-3 w-full"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
      <div>
        <button
          className="bg-white rounded-xl px-5 py-4 inline-block text-neutral-800 font-semibold text-sm hover:bg-pink-500 hover:text-neutral-100 transition-all duration-100"
          onClick={() => submit(form)}
        >
          Submit
        </button>
      </div>
    </div>
  )
}