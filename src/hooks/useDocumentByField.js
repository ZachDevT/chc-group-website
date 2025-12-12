import { useEffect, useState } from 'react'
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase/config'

export const useDocumentByField = (collectionName, fieldName, fieldValue) => {
  const [document, setDocument] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!collectionName || !fieldName || !fieldValue) return

    setLoading(true)
    setError(null)

    const collectionRef = collection(db, collectionName)
    const q = query(collectionRef, where(fieldName, '==', fieldValue), limit(1))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          setDocument({
            id: snapshot.docs[0].id,
            ...snapshot.docs[0].data()
          })
        } else {
          setDocument(null)
        }
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [collectionName, fieldName, fieldValue])

  return { document, loading, error }
}


