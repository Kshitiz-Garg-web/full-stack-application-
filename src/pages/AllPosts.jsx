import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components/index'
import appwriteService from '../appwrite/config'

function AllPosts() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
        console.log(posts)
      }
    })
  }, [])
  return (
    <div>
      <Container >
        {posts.map((post) => {
          return <div key={post.$id}>
            <PostCard {...post} />
          </div>
        })}
      </Container>
    </div>
  )
}

export default AllPosts