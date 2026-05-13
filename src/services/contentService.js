import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { slugify } from '../utils/slugify'

const normalizeExternalUrl = (value) => {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim()
  if (!trimmed) return ''
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

export const createBlogPost = async (payload) => {
  const postsRef = collection(db, 'blogPosts')
  const docPayload = {
    ...payload,
    slug: payload.slug || slugify(payload.title),
    views: payload.views || 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }
  const docRef = await addDoc(postsRef, docPayload)
  return docRef.id
}

export const updateBlogPost = async (id, updates) => {
  const postRef = doc(db, 'blogPosts', id)
  await updateDoc(postRef, {
    ...updates,
    updatedAt: serverTimestamp()
  })
}

export const deleteBlogPost = async (id) => {
  const postRef = doc(db, 'blogPosts', id)
  await deleteDoc(postRef)
}

export const createPartner = async (payload) => {
  const partnersRef = collection(db, 'partners')
  const docRef = await addDoc(partnersRef, {
    ...payload,
    createdAt: serverTimestamp()
  })
  return docRef.id
}

export const updatePartner = async (id, updates) => {
  const partnerRef = doc(db, 'partners', id)
  await updateDoc(partnerRef, updates)
}

export const deletePartner = async (id) => {
  await deleteDoc(doc(db, 'partners', id))
}

export const createGalleryItem = async (payload) => {
  const galleryRef = collection(db, 'gallery')
  const docRef = await addDoc(galleryRef, {
    ...payload,
    createdAt: serverTimestamp()
  })
  return docRef.id
}

export const deleteGalleryItem = async (id) => {
  await deleteDoc(doc(db, 'gallery', id))
}

export const createDocumentItem = async (payload) => {
  const docsRef = collection(db, 'documents')
  let fileData = {}

  if (payload.sourceType === 'link') {
    const externalUrl = normalizeExternalUrl(payload.externalUrl)
    if (!externalUrl) {
      throw new Error('Veuillez fournir un lien partagé valide pour ce document.')
    }

    fileData = {
      sourceType: 'link',
      externalUrl,
      fileName: payload.fileName || '',
      fileType: 'external-link',
      fileSize: null
    }
  } else if (payload.fileDataUrl) {
    fileData = {
      sourceType: 'upload',
      file: payload.fileDataUrl,
      fileName: payload.fileName || '',
      fileType: payload.fileType || '',
      fileSize: payload.fileSize || null
    }
  } else {
    throw new Error('Veuillez fournir un fichier ou un lien de document.')
  }

  const docRef = await addDoc(docsRef, {
    title: payload.title,
    category: payload.category,
    description: payload.description || '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    ...fileData
  })
  return docRef.id
}

export const deleteDocumentItem = async (id) => {
  await deleteDoc(doc(db, 'documents', id))
}

export const createAuthor = async (payload) => {
  const authorsRef = collection(db, 'authors')
  const docRef = await addDoc(authorsRef, {
    ...payload,
    createdAt: serverTimestamp()
  })
  return docRef.id
}

export const deleteAuthor = async (id) => {
  await deleteDoc(doc(db, 'authors', id))
}

export const createUserRole = async (uid, payload) => {
  const roleRef = doc(db, 'userRoles', uid)
  await setDoc(roleRef, {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }, { merge: true })
}

export const deleteUserRole = async (uid) => {
  await deleteDoc(doc(db, 'userRoles', uid))
}

export const incrementPostViews = async (id) => {
  const postRef = doc(db, 'blogPosts', id)
  await updateDoc(postRef, {
    views: increment(1)
  })
}

export const createTeamMember = async (payload) => {
  const teamRef = collection(db, 'team')
  const docRef = await addDoc(teamRef, {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
  return docRef.id
}

export const updateTeamMember = async (id, updates) => {
  const teamMemberRef = doc(db, 'team', id)
  await updateDoc(teamMemberRef, {
    ...updates,
    updatedAt: serverTimestamp()
  })
}

export const deleteTeamMember = async (id) => {
  await deleteDoc(doc(db, 'team', id))
}

// Job Offers (Recruitment)
export const createJobOffer = async (payload) => {
  const jobsRef = collection(db, 'jobOffers')
  const docRef = await addDoc(jobsRef, {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
  return docRef.id
}

export const updateJobOffer = async (id, updates) => {
  const jobRef = doc(db, 'jobOffers', id)
  await updateDoc(jobRef, {
    ...updates,
    updatedAt: serverTimestamp()
  })
}

export const deleteJobOffer = async (id) => {
  await deleteDoc(doc(db, 'jobOffers', id))
}
