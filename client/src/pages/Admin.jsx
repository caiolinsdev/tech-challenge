import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { postsAPI } from '../services/api'
import Loading from '../components/Loading'
import Button from '../components/Button'
import { FiEdit, FiTrash2, FiEye, FiPlus, FiCalendar, FiUser } from 'react-icons/fi'

const Container = styled.div`
  width: 100%;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Table = styled.table`
  width: 100%;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-collapse: collapse;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`

const TableHeader = styled.thead`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f9f9f9;
  }

  &:hover {
    background: #f0f0f0;
  }
`

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;

  @media (max-width: 768px) {
    padding: 0.75rem 0.5rem;
  }
`

const TableCell = styled.td`
  padding: 1rem;
  border-top: 1px solid #eee;

  @media (max-width: 768px) {
    padding: 0.75rem 0.5rem;
  }
`

const TableBody = styled.tbody``

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`

const IconButton = styled.button`
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  color: white;

  ${({ variant }) => {
    switch (variant) {
      case 'edit':
        return `
          background: #3498db;
          &:hover {
            background: #2980b9;
          }
        `
      case 'delete':
        return `
          background: #e74c3c;
          &:hover {
            background: #c0392b;
          }
        `
      case 'view':
        return `
          background: #27ae60;
          &:hover {
            background: #229954;
          }
        `
      default:
        return `background: #95a5a6;`
    }
  }}
`

const TitleCell = styled(TableCell)`
  font-weight: 500;
  color: #333;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    max-width: 150px;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: #999;
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 400px;
  width: 90%;
  text-align: center;
`

const ModalTitle = styled.h2`
  margin-bottom: 1rem;
  color: #333;
`

const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
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

const Admin = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState(null)
  const [deleteModal, setDeleteModal] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState(null)

  const fetchPosts = async (page = 1) => {
    setLoading(true)
    setError(null)
    try {
      // Buscar todos os posts (incluindo inativos) - usando endpoint de busca sem filtro
      const response = await postsAPI.getAll(page, 20)
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
    fetchPosts(currentPage)
  }, [currentPage])

  const handleDelete = async (postId) => {
    setDeleting(true)
    try {
      await postsAPI.delete(postId)
      setDeleteModal(null)
      fetchPosts(currentPage) // Recarregar lista
    } catch (err) {
      setError('Erro ao excluir post. Tente novamente.')
      console.error(err)
    } finally {
      setDeleting(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  if (loading && !posts.length) {
    return <Loading message="Carregando posts..." />
  }

  return (
    <Container>
      <Header>
        <Title>Painel Administrativo</Title>
        <Button onClick={() => navigate('/create')}>
          <FiPlus /> Criar Novo Post
        </Button>
      </Header>

      {error && (
        <EmptyState>
          <p>{error}</p>
        </EmptyState>
      )}

      {!loading && posts.length === 0 && (
        <EmptyState>
          <h2>Nenhum post encontrado</h2>
          <Button onClick={() => navigate('/create')} style={{ marginTop: '1rem' }}>
            <FiPlus /> Criar Primeiro Post
          </Button>
        </EmptyState>
      )}

      {posts.length > 0 && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Título</TableHeaderCell>
                <TableHeaderCell>Autor</TableHeaderCell>
                <TableHeaderCell>Data</TableHeaderCell>
                <TableHeaderCell>Visualizações</TableHeaderCell>
                <TableHeaderCell>Ações</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TitleCell>{post.titulo}</TitleCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FiUser /> {post.autor}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FiCalendar /> {formatDate(post.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FiEye /> {post.visualizacoes || 0}
                    </div>
                  </TableCell>
                  <TableCell>
                    <ActionButtons>
                      <Link to={`/post/${post._id}`}>
                        <IconButton variant="view" title="Visualizar">
                          <FiEye />
                        </IconButton>
                      </Link>
                      <Link to={`/edit/${post._id}`}>
                        <IconButton variant="edit" title="Editar">
                          <FiEdit />
                        </IconButton>
                      </Link>
                      <IconButton
                        variant="delete"
                        title="Excluir"
                        onClick={() => setDeleteModal(post)}
                      >
                        <FiTrash2 />
                      </IconButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

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

      {deleteModal && (
        <Modal onClick={() => setDeleteModal(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Confirmar Exclusão</ModalTitle>
            <p>
              Tem certeza que deseja excluir o post <strong>"{deleteModal.titulo}"</strong>?
              <br />
              Esta ação não pode ser desfeita.
            </p>
            <ModalButtons>
              <Button
                variant="danger"
                onClick={() => handleDelete(deleteModal._id)}
                disabled={deleting}
                style={{ flex: 1 }}
              >
                {deleting ? 'Excluindo...' : 'Excluir'}
              </Button>
              <Button
                variant="secondary"
                onClick={() => setDeleteModal(null)}
                disabled={deleting}
                style={{ flex: 1 }}
              >
                Cancelar
              </Button>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </Container>
  )
}

export default Admin

