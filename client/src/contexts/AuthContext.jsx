import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Verificar autenticação ao carregar
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated')
    const storedUser = localStorage.getItem('user')

    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true)
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Autenticação simples - em produção, isso seria uma chamada à API
    // Por enquanto, aceitamos qualquer email/password como válido
    // ou podemos usar credenciais fixas para demonstração
    const validCredentials = [
      { email: 'professor@escola.com', password: 'professor123' },
      { email: 'admin@escola.com', password: 'admin123' },
    ]

    const validUser = validCredentials.find(
      (cred) => cred.email === email && cred.password === password
    )

    if (validUser || password) {
      const userData = {
        email: email || 'professor@escola.com',
        name: email?.split('@')[0] || 'Professor',
        role: 'professor',
      }

      setIsAuthenticated(true)
      setUser(userData)
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true }
    }

    return { success: false, error: 'Credenciais inválidas' }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}

