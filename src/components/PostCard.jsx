import React from 'react'
import appwriteService from '../appwrite/config'

export default function PostCard({
  $id,
  title,
  featuredImage
}) {
  return (
    <a href={`/post/${$id}`}>
      <div className=''>
        <div>
          <img src={`${appwriteService.getFilePreview(featuredImage)}`} alt={`${title}`} />
        </div>
        <h2 className=''>{`${title}`} </h2>
      </div>
    </a>
  )
}
