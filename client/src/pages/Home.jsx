import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { postsAPI } from '../services/api'
import Loading from '../components/Loading'
import { FiSearch, FiEye, FiCalendar, FiUser } from 'react-icons/fi'

const Container = styled.div`
  width: 100%;
`

const Header = styled.div`
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const SearchContainer = styled.div`
  position: relative;
  max-width: 500px;
  margin-bottom: 2rem;
`

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`

const SearchInput = styled.input`
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

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const PostCard = styled(Link)`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
`

const PostTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
`

const PostSummary = styled.p`
  color: #666;
  line-height: 1.6;
  flex: 1;
`

const PostMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: #999;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #eee;
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
`

const Tag = styled.span`
  background: #f0f0f0;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #667eea;
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid #667eea;
  background: ${({ active }) => (active ? '#667eea' : 'white')};
  color: ${({ active }) => (active ? 'white' : '#667eea')};
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #667eea;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #999;
`

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState(null)
  const [error, setError] = useState(null)

  const fetchPosts = async (page = 1, search = '') => {
    setLoading(true)
    setError(null)
    try {
      const response = await postsAPI.getAll(page, 9, search)
      setPosts(response.data.data.posts)
      setPagination(response.data.data.pagination)
    } catch (err) {
      setError('Erro ao carregar posts. Tente novamente.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchPosts(currentPage, searchTerm)
    }, searchTerm ? 500 : 0)

    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  if (loading && !posts.length) {
    return <Loading message="Carregando posts..." />
  }

  return (
    <Container>
      <Header>
        <Title>Posts Educacionais</Title>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Buscar posts por palavras-chave..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </SearchContainer>
      </Header>

      {error && <EmptyState>{error}</EmptyState>}

      {!loading && posts.length === 0 && (
        <EmptyState>
          <h2>Nenhum post encontrado</h2>
          <p>Tente buscar com outros termos ou verifique novamente mais tarde.</p>
        </EmptyState>
      )}

      {posts.length > 0 && (
        <>
          <PostsGrid>
            {posts.map((post) => (
              <PostCard key={post._id} to={`/post/${post._id}`}>
                <PostTitle>{post.titulo}</PostTitle>
                <PostSummary>{post.resumo || post.conteudo.substring(0, 150) + '...'}</PostSummary>
                {post.tags && post.tags.length > 0 && (
                  <Tags>
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <Tag key={index}>#{tag}</Tag>
                    ))}
                  </Tags>
                )}
                <PostMeta>
                  <MetaItem>
                    <FiUser />
                    {post.autor}
                  </MetaItem>
                  <MetaItem>
                    <FiCalendar />
                    {formatDate(post.createdAt)}
                  </MetaItem>
                  <MetaItem>
                    <FiEye />
                    {post.visualizacoes || 0}
                  </MetaItem>
                </PostMeta>
              </PostCard>
            ))}
          </PostsGrid>

          {pagination && pagination.totalPages > 1 && (
            <Pagination>
              <PaginationButton
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={!pagination.hasPrevPage}
              >
                Anterior
              </PaginationButton>
              <span>
                Página {pagination.currentPage} de {pagination.totalPages}
              </span>
              <PaginationButton
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={!pagination.hasNextPage}
              >
                Próxima
              </PaginationButton>
            </Pagination>
          )}
        </>
      )}
    </Container>
  )
}

export default Home

