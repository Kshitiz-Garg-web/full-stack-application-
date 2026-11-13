import { forwardRef, useId } from 'react'

const Select = forwardRef(function Select({
  options = [],
  label,
  className = '',
  ...props
}, ref) {
  const id = useId()
  const selectClassName = ['field-select', className].filter(Boolean).join(' ')

  return (
    <div className="field-group">
      {label && (
        <label className="field-label" htmlFor={id}>
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={selectClassName}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
})

export default Select