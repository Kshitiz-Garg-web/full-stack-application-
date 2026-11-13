import { Link } from 'react-router-dom'

import appwriteService from '../appwrite/config'

function PostCard({ $id, title, featuredImage, status }) {
  return (
    <Link to={`/post/${$id}`} className="post-card">
      <div className="post-card__image-wrap">
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="post-card__image"
        />
      </div>

      <div className="post-card__body">
        <h2 className="post-card__title">{title}</h2>
        <div className="post-card__meta">
          {status ? status.toUpperCase() : 'BLOG POST'}
        </div>
      </div>
    </Link>
  )
}

export default PostCard