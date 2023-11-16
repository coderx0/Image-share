import { ExtendedPost } from '@/types/db';
import React from 'react'
import Masonry from 'react-masonry-css'
import Post from './Post';


const breakpointColumnsObj = {
    default: 3,
    1000: 2,
    500: 1
};

interface Props {
    posts: ExtendedPost[],
    lastPostref?: any
}

const FeedLayout = ({posts,lastPostref}: Props) => {

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column">
          {
        posts.map((post,index)=>{
          if(index === posts.length - 1){
            return (
              <div key={post.id} ref={lastPostref}>
                <Post 
                  id={post.id} 
                  title={post.title} 
                  imageUrl={post.imageUrl} 
                  author={post.author}/>
              </div>
            )
          }
          else{
            return (
              <div key={post.id}>
                <Post 
                  id={post.id} 
                  title={post.title} 
                  imageUrl={post.imageUrl} 
                  author={post.author}
                  />
              </div>
            )
          }
        })
        }
    </Masonry>
  )
}

export default FeedLayout