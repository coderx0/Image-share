import React from 'react'

interface Props {
    title: string,
    imageUrl: string
}

const Post = ({title, imageUrl}: Props) => {
  return (
    <div>
        <h3>{title}</h3>
        <div className='max-w-[400px]'>
            <img src={imageUrl} className='object-contain'/>
        </div>
    </div>
  )
}

export default Post