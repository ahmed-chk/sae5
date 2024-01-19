import { Form } from "@/components/post-demo/form"

export default async function PostDemo() {
  console
  return (
    <main className="grid grid-cols-1 gap-4">
      <h1 className="text-4xl font-bold">Create form</h1>
      <p>
        Create a new product!
      </p>
      <Form />
    </main>
  )
}
