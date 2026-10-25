import React from 'react'

function Container({ children }) {
  return (
    <div
      style={{
        width: "100 %",
        backgroundColor: "red"
      }}>{children}</div>
  )
}

export default Container