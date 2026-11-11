import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, PostCard } from '../components'

function EditPost() {

  const [post, setPost] = useState(null)
  const navigate = useNavigate()
  const { slug } = useParams()

  useEffect(() => {
    appwriteService.getPost(alug).then((post) => {
      if (post) {
        setPost(post)
      } else {
        navigate('/')
      }
    })
  }, [navigate, slug])

  return post ? (
    <div>
      <Container>
        <PostCard post={post} />
      </Container>
    </div>
  ) : null

}

export default EditPost