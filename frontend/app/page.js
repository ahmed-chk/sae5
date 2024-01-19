import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="grid grid-cols-1 gap-4">
      <Image
        src="/assets/images/logo.svg" 
        alt="Picture of the author"
        width={150}
        height={150}></Image>
      <h1 className="text-4xl font-bold">Sae5</h1>
      <p>
        Envie d'un panier ?
      </p>
      <div>
        <Link href="/registration" className="bg-white rounded-xl px-5 py-4 inline-block text-neutral-800 font-semibold text-sm hover:bg-green-100 hover:text-black-100 transition-all duration-100">
          Inscrivez-vous !
        </Link>
      </div>
    </main>
  )
}
