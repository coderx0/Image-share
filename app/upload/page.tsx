import ImageUploader from '@/components/ImageUploader'
import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation';
import React from 'react'

const UploadPage = async() => {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/sign-in")
  }
  return (
    <div className='pt-4'>
        <ImageUploader/>
    </div>
  )
}

export default UploadPage