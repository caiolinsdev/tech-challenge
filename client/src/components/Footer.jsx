import styled from 'styled-components'

const FooterContainer = styled.footer`
  background: #333;
  color: white;
  text-align: center;
  padding: 2rem;
  margin-top: auto;
`

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 Tech Challenge Blog. Plataforma Educacional.</p>
    </FooterContainer>
  )
}

export default Footer

