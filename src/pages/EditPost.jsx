import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, PostForm } from '../components'

function EditPost() {

  const [post, setPost] = useState(null)
  const navigate = useNavigate()
  const { slug } = useParams()
  console.log('-----------')
  console.log(slug)
  console.log('-----------')


  useEffect(() => {
    appwriteService.getPost(slug).then((post) => {
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
        <PostForm post={post} />
      </Container>
    </div>
  ) : null

}

export default EditPost