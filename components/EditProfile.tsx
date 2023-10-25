"use client"

import { uploadFiles } from '@/lib/uploadthing';
import { ProfileDetailsUpdateRequest, ProfileDetailsValidator, ProfileImageUpdateRequest } from '@/lib/validators/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type FormData = z.infer<typeof ProfileDetailsValidator>

interface Props{
  userId: string,
  userName: string,
  bio: string,
}

const EditProfile = ({userId,userName,bio}:Props) => {
    const {data: session } = useSession();
    
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors },setValue, reset} = useForm<FormData>({
        resolver: zodResolver(ProfileDetailsValidator),
        defaultValues: {
            userName: userName || '',
            bio: bio || ''
        },
      })

    const { mutate: updateProfileImage } = useMutation({
        mutationFn: async ({
          imageUrl,
        }: ProfileImageUpdateRequest) => {
          const payload: ProfileImageUpdateRequest = { imageUrl }
          await axios.post(`/api/user/${userId}/updateImage`, payload)
        },
        onError: () => {
          setIsLoading(false);
          return toast.error('Something Went Wrong',{
            description: 'Your Profile Image was not updated. Please try again.',
            duration: 4000
          })
        },
        onSuccess: () => {
          setIsLoading(false);
  
          toast.success('Success',{
            description: 'Your Profile Image has been updated.',
          })

          window.location.reload();
          return;
        },
    })

    const { mutate: updateProfileDetails,isLoading: updatingProfileDetails } = useMutation({
        mutationFn: async ({
            userName,
            bio
        }: ProfileDetailsUpdateRequest) => {
          const payload: ProfileDetailsUpdateRequest = { userName,bio }
          const {data} = await axios.post(`/api/user/${userId}/updateDetails`, payload);

          return data;
        },
        onError: () => {
  
          return toast.error('Something Went Wrong',{
            description: 'Your profile details was not updated. Please try again.',
            duration: 4000
          })
        },
        onSuccess: ({user}) => {
          toast.success('Success',{
            description: 'Your profile details have been updated.',
          });

          window.location.reload();
          return;
        },
      })

    const uploadImage = async(e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];

        if(file){
          if((file.size/(1024*1024))>2){
            toast.error('Please select image file with size less than 2MB');
            return;
          }
          if (file.type.startsWith('image/')) {
            setIsLoading(true);
            const [res] = await uploadFiles({endpoint:'imageUploader',files:[file]})
            updateProfileImage({imageUrl:res.url});

          } else {
            toast.error('Please select a valid image file (e.g., JPG, JPEG, PNG, GIF).');
          }
        }
    }

    const submitProfileDetails = (data: FormData)=>{
        updateProfileDetails(data)
    }

  return (
    <div className='p-4 flex flex-col items-center'>
        <h3 className='text-3xl font-semibold mt-6'>
            Profile Settings 
        </h3>
        <div className='flex items-center gap-4 mt-8 bg-base-200 p-4 rounded-xl w-full md:w-[80%] max-w-[800px]'>
            <div className='h-24 w-24'>
                <img src={session?.user.image!} alt={session?.user.name!} className='h-full w-full object-cover rounded-full'/>
            </div>
            {
                isLoading ? (
                    <button className="btn btn-primary">
                    <span className="loading loading-spinner"></span>
                    Updating
                    </button>
                ):(
                    <label className='btn btn-primary'>
              <span>Change Image</span>
              <input
              type="file"
              name="uploadedFile"
              onChange={uploadImage}
              className="w-0 h-0"
              />
            </label>
                )
            }
        </div>
        <form
        onSubmit={handleSubmit(submitProfileDetails)}
         className='mt-6 flex flex-col p-4 bg-base-200 rounded-xl w-full md:w-[80%] max-w-[800px]'>
            <div className='flex flex-col gap-2 w-full my-4'>
                <label>User name</label>
                <input
                {...register('userName')}
                    type='text'
                    placeholder='User name you want to use'
                    className='input input-bordered border-primary rounded-md w-full'
                />
            </div>
            
            <div className='flex flex-col gap-2 w-full my-6'>
                <label>About You</label>
                <textarea 
                {...register('bio')}
                rows={5} className="textarea textarea-bordered border-primary" placeholder="Bio">
                </textarea>
            </div>
            
            <div className='flex mt-12'>
                {
                    updatingProfileDetails ? (
                        <button className="btn btn-primary m-auto">
                        <span className="loading loading-spinner"></span>
                        Updating
                        </button>
                    ):(
                        <button className='btn btn-primary m-auto w-36' type='submit'>
                            Save
                        </button>
                    )
                }
                
            </div>
        </form>
    </div>
  )
}

export default EditProfile