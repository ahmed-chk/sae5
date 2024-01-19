import Link from "next/link"

export const Navigation = () => {
  return (
    <nav className="text-white flex justify-between items-center mb-6 pb-6">
      <div className="w-12 h-4 bg-white rounded-lg"/>
      <ul className="flex gap-6">
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/connexion">
            Connexion
          </Link>
        </li>
        <li>
          <Link href="/get-demo">
            Get demo
          </Link>
        </li>
        <li>
          <Link href="/post-demo">
            Post demo
          </Link>
        </li>
      </ul>
    </nav>
  )
}