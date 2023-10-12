import FeedContentSelector from '@/components/FeedContentSelector'
import HomeFeed from '@/components/HomeFeed/HomeFeed'
import { getAuthSession } from '@/lib/auth'


export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Home() {

  const session = await getAuthSession()

  return (
    <div className=''>
      <div className='h-80 w-full bg-red-200'/>
      <FeedContentSelector/>
      <HomeFeed/>
    </div>
  )
}
