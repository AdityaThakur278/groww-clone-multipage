import { useState, createContext, useContext } from 'react'

const AuthContext = createContext(null)

/*
    userData = {
        uuid1: {
            firstName: "Aditya",
            lastName: "Thakur",
            email: "abc@gmail.com",
            password: "Abc@123",
        }
    }
    userID = [uuid1, uuid2, ...]
*/

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = user => {
    setUser(user)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}