import { PostForm, Container } from '../components/index'

function AddPost() {
  return (
    <div className="page-section">
      <Container>
        <div className="page-header">
          <div>
            <h1 className="page-heading">Create a new post</h1>
            <p className="page-subtitle">Write something powerful, thoughtful, and worth reading.</p>
          </div>
        </div>
        <PostForm />
      </Container>
    </div>
  )
}

export default AddPost