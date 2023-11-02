
import { Share2, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {
    FacebookShareButton,
    FacebookIcon,
    PinterestShareButton,
    PinterestIcon,
    RedditShareButton,
    RedditIcon,
    TelegramShareButton,
    TelegramIcon,
    TumblrShareButton,
    TumblrIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon,
    EmailShareButton,
    EmailIcon,
} from 'next-share'

const CloseButton  = (<button>
    <X/>
</button>);

const copyToClipboard = (text:string)=>{
    navigator.clipboard.writeText(text);
}

const SharePost = ({imageId,style}:{imageId: string,style:string}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const postUrl = `${process.env.NEXT_PUBLIC_CLIENT_URL}/photo/${imageId}`;
    const [isCopied,setIsCopied] = useState(false);

    useEffect(()=>{
        let timer: NodeJS.Timeout | undefined;

        if(isCopied){
            timer = setTimeout(()=>setIsCopied(false),4000);
        }

        return ()=>{
            clearTimeout(timer)
        }
    },[isCopied])

    return (
    <>
        <button onClick={onOpen} className={`btn p-3 hover:bg-primary hover:text-primary-800 ${style}`}>
            <Share2/>
        </button>

    <Modal closeButton={CloseButton} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className='bg-base-200 text-base-content'>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Share Post</ModalHeader>
              <ModalBody>
                <div className='flex flex-col gap-8 py-8'>
                <div className='flex gap-4 w-[300px] md:w-[400px] overflow-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-base-200'>
               
               <FacebookShareButton
               url={postUrl}
               quote={'Imagedash share your momemnts'}
               hashtag={'#Imagedash'}
               >
               <FacebookIcon size={44} round />
               </FacebookShareButton>

               <PinterestShareButton
               url={postUrl}
               media={'Imagedash, share your moments'}
               >
               <PinterestIcon size={44} round />
               </PinterestShareButton>

               <RedditShareButton
               url={postUrl}
               title={'Imagedash, share your moments'}
               >
               <RedditIcon size={44} round />
               </RedditShareButton>

               <TelegramShareButton
               url={postUrl}
               title={'Imagedash, share your moments'}
               >
               <TelegramIcon size={44} round />
               </TelegramShareButton>

               <TumblrShareButton
               url={postUrl}
               title={'Imagedash, share your moments'}
               >
               <TumblrIcon size={44} round />
               </TumblrShareButton>

               <TwitterShareButton
               url={postUrl}
               title={'Imagedash, share your moments'}
               >
               <TwitterIcon size={44} round />
               </TwitterShareButton>

               <WhatsappShareButton
               url={postUrl}
               title={'Imagedash, share your moments'}
               separator=":: "
               >
               <WhatsappIcon size={44} round />
               </WhatsappShareButton>

               <LinkedinShareButton url={postUrl}>
               <LinkedinIcon size={44} round />
               </LinkedinShareButton>

               <EmailShareButton
               url={postUrl}
               subject={'Next Share'}
               body='Imagedash'
               >
               <EmailIcon size={44} round />
               </EmailShareButton>

               
               </div>
               <div className='text-sm flex w-full justify-between h-12 items-center p-2 rounded-lg bg-base-100 text-base-content'>
                   <p className='w-[200px] md:w-[300px] overflow-hidden whitespace-nowrap text-ellipsis'>{postUrl}</p>
                   <button 
                   onClick={()=>{
                    copyToClipboard(postUrl);
                    setIsCopied(true);
                   }}
                   className={`btn btn-sm ${isCopied ?'btn-success':'btn-primary'}`}>
                    {
                        isCopied ? 'Copied':'Copy'
                    }
                   </button>
               </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default SharePost