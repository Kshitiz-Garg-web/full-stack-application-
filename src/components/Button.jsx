function Button({
  children,
  type = 'button',
  className = '',
  bgColor = '',
  variant = 'primary',
  ...props
}) {
  const variantClass = variant === 'secondary'
    ? 'btn btn-secondary'
    : variant === 'danger'
      ? 'btn btn-danger'
      : 'btn btn-primary'

  const classes = [variantClass, bgColor, className].filter(Boolean).join(' ')

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button