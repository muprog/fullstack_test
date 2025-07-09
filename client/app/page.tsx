'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleUpload = () => {
    router.push('/upload')
  }
  return (
    <div className='h-screen flex items-center justify-center '>
      <div className='boxes'>
        <button
          onClick={handleUpload}
          className='upload bg-blue-300 px-2 rounded-[2px] hover:opacity-50 border border-blue-500 hover:border-2'
        >
          upload
        </button>
      </div>
    </div>
  )
}
