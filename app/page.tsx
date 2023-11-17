
import FeedContentSelector from '@/components/FeedContentSelector'
import HomeFeed from '@/components/HomeFeed/HomeFeed'

export default async function Home() {
  return (
    <div className='bg-base-100'>
      <div 
      style={{backgroundImage: 'url(https://res.cloudinary.com/calmbit/image/upload/v1698936191/xydrokv22hcvypuw1qtl.jpg)'}}
      className='h-80 w-full bg-red-200 bg-cover bg-no-repeat bg-fixed bg-center'>
        <div className='text-3xl font-bold h-full w-full bg-black/30 p-8 flex justify-center items-center'>
          <h1 className='text-center'>
          Best Free Photos shared by people like you
          </h1>
        </div>
      </div>
        <FeedContentSelector/>
      <div className='md:px-10'>
        <HomeFeed/>
      </div>
    </div>
  )
}
