function Logo({ width = '100px' }) {
  return (
    <div className="brand" style={{ width }}>
      <span className="brand__mark">M</span>
      <span className="brand__text">MyBlog</span>
    </div>
  )
}

export default Logo