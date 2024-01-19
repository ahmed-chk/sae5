import Image from 'next/image'

async function getProducts () {
  const response = await fetch('https://jsonplaceholder.typicode.com/photos')
  const products = await response.json()
  return products
}

export default async function GetDemo() {
  const products = await getProducts()

  return (
    <main className="grid grid-cols-1 gap-4">
      <h1 className="text-4xl font-bold">Products ({products?.length ?? 0})</h1>
      <p>
        List of all our products, check them out!
      </p>
      <div className="grid grid-cols-4 gap-8 mt-6">
        {products?.length > 0 ? products.map(product => (
          <div key={product.id} className="bg-neutral-900 rounded-xl p-6">
            <Image src={product.thumbnailUrl} width={200} height={200} alt={product.title} className="w-full h-[100px] object-cover" />
            <p className="text-lg font-semibld mt-3">{product.title}</p>
          </div>
        )) : (
          <p className="col-span-4 text-center text-xl text-neutral-600">
            No products available
          </p>
        )}
      </div>
    </main>
  )
}
