import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/Button'
import { FiMail, FiLock } from 'react-icons/fi'

const Container = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 2rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-weight: 500;
  color: #555;
`

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const Icon = styled.div`
  position: absolute;
  left: 1rem;
  color: #999;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: #667eea;
    outline: none;
  }
`

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: -0.5rem;
`

const InfoBox = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 5px;
  border-left: 4px solid #667eea;
  font-size: 0.9rem;
  color: #555;
  margin-top: 1rem;
`

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = login(email, password)
      if (result.success) {
        navigate('/admin')
      } else {
        setError(result.error || 'Credenciais inválidas')
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Email</Label>
          <InputContainer>
            <Icon>
              <FiMail />
            </Icon>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="professor@escola.com"
              required
            />
          </InputContainer>
        </FormGroup>

        <FormGroup>
          <Label>Senha</Label>
          <InputContainer>
            <Icon>
              <FiLock />
            </Icon>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </InputContainer>
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button type="submit" disabled={loading} fullWidth>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>

        <InfoBox>
          <strong>Credenciais de teste:</strong>
          <br />
          Email: professor@escola.com | Senha: professor123
          <br />
          Email: admin@escola.com | Senha: admin123
        </InfoBox>
      </Form>
    </Container>
  )
}

export default Login

