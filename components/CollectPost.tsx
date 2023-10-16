"use client"

import { CollectionCreationRequest, CollectionValidator } from '@/lib/validators/collection';
import { zodResolver } from '@hookform/resolvers/zod';
import { Post } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowLeft, Bookmark, Plus } from 'lucide-react'
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import AddToCollection from './AddToCollection';

type FormData = z.infer<typeof CollectionValidator>

interface Collection {
    id: string,
    title: string,
    isPublic: boolean,
    creatorId: string,
    posts: Post[]
}

const CollectPost = ({postId}: {postId: string}) => {

    const {data: session} = useSession();

    const [openCollectionForm,setOpenCollectionForm] = useState<boolean>(false);

    const fetchUserCollections = useCallback(async ()=>{
        try{
            const response = await axios.get('/api/collection')
            return response.data;
        }
        catch(err){
            toast.error("Unable to fetch Collections")
        }
    },[session?.user.id]);

    const {data, isLoading: collectionLoading,refetch} = useQuery(['user_collections'],fetchUserCollections)
    
    const { register, handleSubmit, formState: { errors },reset} = useForm<FormData>({
        resolver: zodResolver(CollectionValidator),
        defaultValues: {
          title: '',
        },
      })

    const { mutate: createCollection,isLoading } = useMutation({
        mutationFn: async ({
          title,
        }: CollectionCreationRequest) => {
          const payload: CollectionCreationRequest = { title }
          const  {data}  = await axios.post('/api/collection/create', payload)

          return data
        },
        onError: () => {
          return toast.error('Something Went Wrong',{
            description: 'Can not create Collection. Please try again.',
            duration: 4000
          })
        },
        onSuccess: (data) => {
  
          toast.success('Success',{
            description: 'New Collection has been created.',
          })

          refetch();
          reset();
          setOpenCollectionForm(false);
  
        //   location.assign(`${process.env.NEXT_PUBLIC_CLIENT_URL}/photo/${data.postId}`)
          return;
        },
    })

    const onSubmit = (data: FormData) =>{
        createCollection(data)
    }

    console.log({data})

  return (
    <>
        <button className='btn rounded-md' onClick={()=>{
            //@ts-ignore
            document?.getElementById('my_modal_2').showModal()
        }}>
            <Bookmark/>
            <span className='hidden md:block'>
                Collect
            </span>
        </button>
        <dialog id="my_modal_2" className="modal backdrop-brightness-[0.2]">
            <div className="modal-box p-4 rounded-lg">
            <h3 className='text-center text-xl font-semibold'>
                Save to Collection
            </h3>
            {
                openCollectionForm ? null : (
                    <div className='mt-4 w-full text-sm flex justify-center'>
                        <span className='border-b-2 border-gray-400 border-dotted'>
                            All Collections
                        </span>
                    </div>
                )
            }
            {
                openCollectionForm ? 
                (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col gap-2 w-full px-8 mb-6 mt-4'>
                        <label>Title</label>
                        <input
                        {...register('title')}
                        type='text'
                        placeholder='enter a title'
                        className='input input-bordered rounded-md w-full'
                        />
                        <div className='flex mt-4 justify-between'>
                            <button 
                            type='button'
                            onClick={()=>setOpenCollectionForm(false)}
                            className='btn rounded-lg'>
                                <ArrowLeft/>
                                <span>
                                    Back
                                </span>
                            </button>
                            <button
                            type='submit'
                            disabled={isLoading}
                            className='btn btn-primary rounded-lg'>
                                {
                                    isLoading ? <span className="loading loading-spinner"></span>: 'Create New Collection'
                                }
                            </button>
                        </div>
                    </div>
                    </form>
                )
                :
                (
                    <div className='mt-6 px-4 flex flex-wrap gap-4'>
                        <button 
                        onClick={()=>{
                            setOpenCollectionForm(true)
                        }}
                        className='flex flex-col items-center gap-2'>
                            <span className='btn w-[100px] h-[100px] rounded-lg'>
                                <Plus/>
                            </span>
                            <span className='text-sm'>Create New</span>
                        </button>
                        {
                            data?.userCollections.map((collection:Collection)=>(
                                <AddToCollection key={collection.id} collection={collection} postId={postId}/>
                            ))
                        }
                    </div>                    
                )
            }
            <div>

            </div>
            </div>
            <form method="dialog" className="modal-backdrop">
            <button>close</button>
            </form>
        </dialog>
    </>
  )
}

export default CollectPost