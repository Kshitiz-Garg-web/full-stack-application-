import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import parse from 'html-react-parser'

import appwriteService from '../appwrite/config'
import { Button, Container } from '../components'

export default function Post() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { slug } = useParams()
  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug)
        .then((postData) => {
          if (postData) {
            setPost(postData)
          } else {
            navigate('/')
          }
        })
        .finally(() => setLoading(false))
    } else {
      navigate('/')
    }
  }, [slug, navigate])

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage)
        navigate('/')
      }
    })
  }

  if (loading) {
    return (
      <div className="page-section">
        <Container>
          <div className="skeleton" style={{ height: '26rem', borderRadius: '1.25rem' }} />
        </Container>
      </div>
    )
  }

  if (!post) {
    return null
  }

  return (
    <div className="page-section">
      <Container>
        <article className="post-article">
          <div className="post-hero">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="post-hero__image"
            />

            {isAuthor && (
              <div className="post-article__actions">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button variant="secondary" className="btn-small">Edit</Button>
                </Link>
                <Button variant="danger" className="btn-small" onClick={deletePost}>Delete</Button>
              </div>
            )}
          </div>

          <header className="post-meta">
            <h1 className="page-heading">{post.title}</h1>
            <span className="post-meta__status">{post.status || 'Active'}</span>
          </header>

          <div className="post-body post-content">
            {parse(post.content)}
          </div>
        </article>
      </Container>
    </div>
  )
}