import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FiLogOut, FiUser, FiEdit3, FiSettings } from 'react-icons/fi'

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.9;
  }
`

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
`

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.8;
  }
`

const Button = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`

const UserDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.25rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  color: white;
  font-weight: bold;
  
  svg {
    font-weight: bold;
  }
`

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">
          📚 Tech Challenge Blog
        </Logo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/create">
                <FiEdit3 /> Criar Post
              </NavLink>
              <NavLink to="/admin">
                <FiSettings /> Posts
              </NavLink>
              <UserInfo>
                <UserDisplay>
                  <FiUser /> {user?.name || 'Professor'}
                </UserDisplay>
                <Button onClick={handleLogout}>
                  <FiLogOut /> Sair
                </Button>
              </UserInfo>
            </>
          ) : (
            <NavLink to="/login">Entrar</NavLink>
          )}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  )
}

export default Header

