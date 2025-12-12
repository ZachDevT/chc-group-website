import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase/config'

export const useRealtimeCollection = (collectionName, options = {}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!collectionName) return

    setLoading(true)
    setError(null)

    let ref = collection(db, collectionName)

    if (options.orderByField) {
      ref = query(ref, orderBy(options.orderByField, options.orderDirection || 'desc'))
    }

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setData(docs)
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [collectionName, options.orderByField, options.orderDirection])

  return { data, loading, error }
}


