import styled from 'styled-components'

const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 5px;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  border: none;
  outline: none;

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          &:hover {
            opacity: 0.9;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          }
        `
      case 'danger':
        return `
          background: #e74c3c;
          color: white;
          &:hover {
            background: #c0392b;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
          }
        `
      case 'secondary':
        return `
          background: #95a5a6;
          color: white;
          &:hover {
            background: #7f8c8d;
            transform: translateY(-2px);
          }
        `
      default:
        return `
          background: #3498db;
          color: white;
          &:hover {
            background: #2980b9;
            transform: translateY(-2px);
          }
        `
    }
  }}

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.6;
    cursor: not-allowed;
    &:hover {
      transform: none;
    }
  `}

  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
`

const Button = ({ children, variant = 'primary', disabled, fullWidth, ...props }) => {
  return (
    <StyledButton variant={variant} disabled={disabled} fullWidth={fullWidth} {...props}>
      {children}
    </StyledButton>
  )
}

export default Button

