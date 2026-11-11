import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from './../components/index'

function Home() {

  const [posts, setPosts] = useState([])
  useEffect(() => {
    appwriteService.getPosts().then((post) => {
      if (post) {
        setPosts(post)
      }
    })
  }, [])

  if (posts.length === 0) {
    return (
      <div>
        <Container >
          <div>
            <p1>No cards Available Right Now...</p1>
          </div>
        </Container>
      </div>
    )
  }
  return (
    <div>
      <Container>
        <div>
          {posts.map((post) => {
            return (
              <div key={post.$id}>
              <PostCard {...post} />
            </div>
            )
          })}
        </div>
      </Container>
    </div>
  )
}

export default Home