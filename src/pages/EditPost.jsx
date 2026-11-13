import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import appwriteService from '../appwrite/config'
import { Container, PostForm } from '../components'

function EditPost() {
  const [post, setPost] = useState(null)
  const navigate = useNavigate()
  const { slug } = useParams()

  useEffect(() => {
    appwriteService.getPost(slug).then((postData) => {
      if (postData) {
        setPost(postData)
      } else {
        navigate('/')
      }
    })
  }, [navigate, slug])

  if (!post) {
    return (
      <div className="page-section">
        <Container>
          <div className="skeleton" style={{ height: '22rem', borderRadius: '1.25rem' }} />
        </Container>
      </div>
    )
  }

  return (
    <div className="page-section">
      <Container>
        <div className="page-header">
          <div>
            <h1 className="page-heading">Edit post</h1>
            <p className="page-subtitle">Update the story while keeping your message consistent.</p>
          </div>
        </div>
        <PostForm post={post} />
      </Container>
    </div>
  )
}

export default EditPost