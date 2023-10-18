
import FeedContentSelector from '@/components/FeedContentSelector'
import HomeFeed from '@/components/HomeFeed/HomeFeed'

export default async function Home() {
  return (
    <div className='bg-base-100'>
      <div className='h-80 w-full bg-red-200'/>
      <FeedContentSelector/>
      <HomeFeed/>
    </div>
  )
}
