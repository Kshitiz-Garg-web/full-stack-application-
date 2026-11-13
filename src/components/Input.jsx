import { forwardRef, useId } from 'react'

const Input = forwardRef(function Input({
  label,
  type = 'text',
  className = '',
  ...props
}, ref) {
  const id = useId()
  const inputClassName = ['field-input', className].filter(Boolean).join(' ')

  return (
    <div className="field-group">
      {label && (
        <label className="field-label" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={inputClassName}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  )
})

export default Input