import React, { useId } from 'react'

function Select({
  options = [],
  label,
  className = "",
  ...props
}, ref) {
  const id = useId()
  return (
    <div className=''>
      {label && <label className='' htmlFor={id}></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`${className}`}
      >
        {options?.map((option, i) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select)