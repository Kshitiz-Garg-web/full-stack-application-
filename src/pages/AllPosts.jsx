import { useState, useEffect } from 'react'

import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components/index'

function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    appwriteService.getPosts([]).then((postsResponse) => {
      if (isMounted && postsResponse) {
        setPosts(postsResponse.documents)
      }
    }).finally(() => {
      if (isMounted) {
        setLoading(false)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return (
      <div className="page-section">
        <Container>
          <div className="page-header">
            <h1 className="page-heading">All posts</h1>
          </div>
          <div className="post-list-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="post-card-skeleton">
                <div className="skeleton post-card-skeleton__image" />
                <div className="skeleton post-card-skeleton__line post-card-skeleton__line--lg" />
                <div className="skeleton post-card-skeleton__line" />
                <div className="skeleton post-card-skeleton__line post-card-skeleton__line--sm" />
              </div>
            ))}
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="page-section">
      <Container>
        <div className="page-header">
          <div>
            <h1 className="page-heading">All posts</h1>
            <p className="page-subtitle">Browse every story published on the platform.</p>
          </div>
        </div>

        <div className="post-list-grid">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts