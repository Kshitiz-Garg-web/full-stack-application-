import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
  label,
  type = 'text',
  className = "",
  ...props
}, ref) {
  const id = useId()
  return (
    <div className=''>
      {label && <label
        className=''
        htmlFor={id}>
      </label>
      }
      <input
        type={type}
        className={`{className}`}
        ref={ref} // yhi wo chij h jo apna parent component ma refrence degi , isi porpuse k lya forwardref use kya h hmna input ider h or ui kao orr h , ui s ref p[ass kerga or ider accept hoga or state k access user pricde kerga or ager n hua to fr kider onchane , handler sab elga 
        {...props}
        id={id}
      />
    </div>
  )
})
export default Input