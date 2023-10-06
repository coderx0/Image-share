"use client"

import React, { useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'
import { uploadFiles } from '@/lib/uploadthing';
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PostCreationRequest, PostValidator } from '@/lib/validators/post'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner';


type FormData = z.infer<typeof PostValidator>


const ImageUploader = () => {
  const { register, handleSubmit, formState: { errors },setValue} = useForm<FormData>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      title: '',
      imageUrl: '',
    },
  })

    const [selectedImageURL, setSelectedImageURL] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const uploadImage = async(e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        // console.log(file);
        if (file && file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file)
            setSelectedImageURL(url);
            setImageFile(file);
            setValue('imageUrl',url)
          } else {
            // Clear the selected image if it's not an image
            setSelectedImageURL(null);
            setImageFile(null)
            alert('Please select a valid image file (e.g., JPG, JPEG, PNG, GIF).');
        }
    }

    const { mutate: createPost } = useMutation({
      mutationFn: async ({
        title,
        imageUrl
      }: PostCreationRequest) => {
        const payload: PostCreationRequest = { title, imageUrl }
        const { data } = await axios.post('/api/post/create', payload)
        return data
      },
      onError: () => {
        return toast.error('Something Went Wrong',{
          description: 'Your post was not published. Please try again.',
          duration: 4000
        })
      },
      onSuccess: () => {
        // const newPathname = pathname.split('/').slice(0, -1).join('/')
        // router.push(newPathname)
  
        // router.refresh()
  
        return toast.success('Success',{
          description: 'Your post has been published.',
        })
      },
    })

    const onSubmit = async (data: FormData)=>{
      let url = '';

      if(imageFile){
          const [res] = await uploadFiles({endpoint:'imageUploader',files:[imageFile]})
          console.log({res})
          url = res.url;
      }

      const payload: PostCreationRequest = {
        title: data.title,
        imageUrl: url
      }
  
      createPost(payload)
    }

  return (
    <div className='flex flex-col justify-center items-center p-8 gap-4'>
      <h1 className='text-center text-2xl font-semibold'>
        {
          !selectedImageURL ? <span>Share your photos and share memories</span>
          : <span>Add some more information about your image</span>
        }
      </h1>
        {
          selectedImageURL ? (
            <div className='flex'>
              <div className='max-w-[600px] max-h-[600px]'>
              <img src={selectedImageURL} className='object-contain' alt="Selected" style={{ maxWidth: '100%' }} />
              </div>
              <div>
              <form onSubmit={handleSubmit(onSubmit)}>
              <input
              {...register('imageUrl')}
              type="text"
              name="uploadedFile"
              // onChange={uploadImage}
              className="hidden"
              />
              <input
                type='text'
                placeholder='Title'
                {...register('title')}
              />
              <button type='submit'>
                Submit
              </button>
              </form>
              </div>
            </div>
          )
          :
          (
          <div className='border-1 border-dashed rounded-xl border-gray-600'>
            <label>
              <div className="flex flex-col items-center justify-center h-full">
                <div className={`flex flex-col mt-12 justify-center items-center`}>
                  <p className="font-bold text-2xl">
                  <UploadCloud className="w-12 h-12"/>
                  </p>
                  <p className='text-xl font semibold mt-4'>Click to upload</p>
                </div>

              <p className={`text-gray-300 text-md mt-16 p-4`}>
                  Use high-quality JPG, JPEG,WEBP, PNG, GIF or TIFF less than 20MB
              </p>
              </div>
              <input
              type="file"
              name="uploadedFile"
              onChange={uploadImage}
              className="w-0 h-0"
              />
            </label>
          </div>
          )
        }
    </div>
  )
}

export default ImageUploader