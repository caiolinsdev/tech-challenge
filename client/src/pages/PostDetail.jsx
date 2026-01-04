import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { postsAPI } from '../services/api'
import Loading from '../components/Loading'
import Button from '../components/Button'
import { FiArrowLeft, FiUser, FiCalendar, FiEye, FiTag } from 'react-icons/fi'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`

const PostContainer = styled.article`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const PostHeader = styled.header`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f0f0f0;
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  color: #666;
  font-size: 0.95rem;
`

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`

const Tag = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Content = styled.div`
  line-height: 1.8;
  color: #444;
  font-size: 1.1rem;
  white-space: pre-wrap;
  word-wrap: break-word;

  p {
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 1.8rem;
    color: #333;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    color: #444;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
`

const ErrorContainer = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #999;
`

const PostDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const hasTrackedView = useRef(false)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      setError(null)
      try {
        // Buscar o post
        const response = await postsAPI.getById(id)
        setPost(response.data.data)
        
        // Registrar visualização apenas uma vez
        if (!hasTrackedView.current) {
          hasTrackedView.current = true
          try {
            await postsAPI.trackView(id)
          } catch (trackError) {
            // Ignora erro de tracking, não é crítico
            console.warn('Erro ao registrar visualização:', trackError)
          }
        }
      } catch (err) {
        setError('Post não encontrado ou erro ao carregar.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()

    // Reset quando o ID mudar
    return () => {
      hasTrackedView.current = false
    }
  }, [id])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return <Loading message="Carregando post..." />
  }

  if (error || !post) {
    return (
      <Container>
        <ErrorContainer>
          <h2>{error || 'Post não encontrado'}</h2>
          <Button onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>
            Voltar para Home
          </Button>
        </ErrorContainer>
      </Container>
    )
  }

  return (
    <Container>
      <BackButton to="/">
        <FiArrowLeft /> Voltar para lista
      </BackButton>

      <PostContainer>
        <PostHeader>
          <Title>{post.titulo}</Title>
          <Meta>
            <MetaItem>
              <FiUser />
              <strong>{post.autor}</strong>
            </MetaItem>
            <MetaItem>
              <FiCalendar />
              {formatDate(post.createdAt)}
            </MetaItem>
            <MetaItem>
              <FiEye />
              {post.visualizacoes || 0} visualizações
            </MetaItem>
          </Meta>
          {post.tags && post.tags.length > 0 && (
            <Tags>
              {post.tags.map((tag, index) => (
                <Tag key={index}>
                  <FiTag /> {tag}
                </Tag>
              ))}
            </Tags>
          )}
        </PostHeader>

        <Content>{post.conteudo}</Content>
      </PostContainer>
    </Container>
  )
}

export default PostDetail

