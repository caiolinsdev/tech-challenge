import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { postsAPI } from '../services/api'
import Button from '../components/Button'
import Loading from '../components/Loading'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Form = styled.form`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-weight: 500;
  color: #333;
  font-size: 1rem;
`

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: #667eea;
    outline: none;
  }
`

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 200px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;

  &:focus {
    border-color: #667eea;
    outline: none;
  }
`

const TagsInput = styled.input`
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: #667eea;
    outline: none;
  }
`

const HelperText = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin-top: -0.25rem;
`

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  padding: 0.75rem;
  background: #fee;
  border-radius: 5px;
  border-left: 4px solid #e74c3c;
`

const SuccessMessage = styled.p`
  color: #27ae60;
  font-size: 0.9rem;
  padding: 0.75rem;
  background: #efe;
  border-radius: 5px;
  border-left: 4px solid #27ae60;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const EditPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    titulo: '',
    conteudo: '',
    autor: '',
    resumo: '',
    tags: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await postsAPI.getById(id)
        const post = response.data.data
        setFormData({
          titulo: post.titulo || '',
          conteudo: post.conteudo || '',
          autor: post.autor || '',
          resumo: post.resumo || '',
          tags: post.tags ? post.tags.join(', ') : '',
        })
      } catch (err) {
        setError('Erro ao carregar post. Tente novamente.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setSaving(true)

    try {
      // Processar tags (separar por vírgula e limpar)
      const tags = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      const postData = {
        titulo: formData.titulo,
        conteudo: formData.conteudo,
        autor: formData.autor,
        resumo: formData.resumo,
        tags,
      }

      await postsAPI.update(id, postData)
      setSuccess(true)

      // Redirecionar após 1 segundo
      setTimeout(() => {
        navigate(`/post/${id}`)
      }, 1000)
    } catch (err) {
      setError(
        err.response?.data?.message || 'Erro ao atualizar post. Tente novamente.'
      )
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <Loading message="Carregando post..." />
  }

  return (
    <Container>
      <Title>Editar Post</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="titulo">Título *</Label>
          <Input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={200}
            placeholder="Digite o título do post"
          />
          <HelperText>Mínimo de 3 caracteres, máximo de 200</HelperText>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="autor">Autor *</Label>
          <Input
            type="text"
            id="autor"
            name="autor"
            value={formData.autor}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={100}
            placeholder="Nome do autor"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="resumo">Resumo</Label>
          <TextArea
            id="resumo"
            name="resumo"
            value={formData.resumo}
            onChange={handleChange}
            maxLength={300}
            placeholder="Breve resumo do post (opcional, máximo 300 caracteres)"
            rows={3}
          />
          <HelperText>
            {formData.resumo.length}/300 caracteres
          </HelperText>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="conteudo">Conteúdo *</Label>
          <TextArea
            id="conteudo"
            name="conteudo"
            value={formData.conteudo}
            onChange={handleChange}
            required
            minLength={10}
            placeholder="Digite o conteúdo completo do post"
            rows={15}
          />
          <HelperText>Mínimo de 10 caracteres</HelperText>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="tags">Tags</Label>
          <TagsInput
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="tag1, tag2, tag3 (separadas por vírgula)"
          />
          <HelperText>Separar tags por vírgula</HelperText>
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && (
          <SuccessMessage>Post atualizado com sucesso! Redirecionando...</SuccessMessage>
        )}

        <ButtonGroup>
          <Button type="submit" disabled={saving} fullWidth>
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(`/post/${id}`)}
            fullWidth
          >
            Cancelar
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  )
}

export default EditPost

