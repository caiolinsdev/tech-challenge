import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
  margin: 2rem auto;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  flex-direction: column;
  gap: 1rem;
`

const Text = styled.p`
  color: #666;
  font-size: 1.1rem;
`

const Loading = ({ message = 'Carregando...' }) => {
  return (
    <Container>
      <Spinner />
      <Text>{message}</Text>
    </Container>
  )
}

export default Loading

