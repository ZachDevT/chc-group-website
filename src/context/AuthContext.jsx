import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'

const AuthContext = createContext({
  user: null,
  userRole: null,
  userInfo: null,
  loading: true,
  login: async () => {},
  logout: async () => {}
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      
      if (currentUser) {
        // Fetch user role and profile from Firestore
        try {
          const roleDoc = await getDoc(doc(db, 'userRoles', currentUser.uid))
          if (roleDoc.exists()) {
            const roleData = roleDoc.data()
            setUserRole(roleData.role || 'editor')
            setUserInfo({
              name: roleData.name || currentUser.displayName || currentUser.email?.split('@')[0],
              email: currentUser.email,
              role: roleData.role || 'editor',
              avatar: roleData.avatar || null,
              createdAt: roleData.createdAt
            })
          } else {
            // Default to editor if no role document exists
            setUserRole('editor')
            setUserInfo({
              name: currentUser.displayName || currentUser.email?.split('@')[0],
              email: currentUser.email,
              role: 'editor',
              avatar: null
            })
          }
        } catch (error) {
          console.error('Error fetching user role:', error)
          setUserRole('editor')
          setUserInfo({
            name: currentUser.displayName || currentUser.email?.split('@')[0],
            email: currentUser.email,
            role: 'editor',
            avatar: null
          })
        }
      } else {
        setUserRole(null)
        setUserInfo(null)
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email, password) => {
    setAuthError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      setAuthError(error)
      throw error
    }
  }

  const logout = async () => {
    await signOut(auth)
    setUserRole(null)
    setUserInfo(null)
  }

  const value = useMemo(
    () => ({
      user,
      userRole,
      userInfo,
      loading,
      login,
      logout,
      authError
    }),
    [user, userRole, userInfo, loading, authError]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}


