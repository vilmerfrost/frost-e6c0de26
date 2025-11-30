import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Welcome to Context Brain
        </h1>
        <p className="text-secondary text-lg mb-8">
          Your premium AI-powered context management platform.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard" className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded">
            Go to Dashboard
          </Link>
          <Link href="/projects" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View Projects
          </Link>
        </div>
      </div>
    </main>
  )
}