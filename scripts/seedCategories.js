/**
 * Script to seed 50 categories into Firestore
 * Run with: node scripts/seedCategories.js
 * 
 * Make sure .env.local exists with your Firebase config
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function loadEnv() {
  try {
    const envPath = join(__dirname, '../.env.local')
    const envFile = readFileSync(envPath, 'utf-8')
    const env = {}
    
    envFile.split('\n').forEach((line) => {
      const match = line.match(/^([^=]+)=(.*)$/)
      if (match) {
        const key = match[1].trim()
        const value = match[2].trim().replace(/^["']|["']$/g, '')
        env[key] = value
      }
    })
    
    return env
  } catch (error) {
    console.error('❌ Error loading .env.local:', error.message)
    console.error('💡 Make sure .env.local exists in the project root')
    process.exit(1)
  }
}

const env = loadEnv()

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// 50 categories relevant to CHC Group's work
const categories = [
  'Actualités',
  'Recherche',
  'Projets',
  'Formation',
  'Développement',
  'Agroécologie',
  'Développement durable',
  'Gouvernance',
  'Citoyenneté',
  'Gestion des ressources naturelles',
  'Entrepreneuriat',
  'Développement des marchés',
  'Économie sociale et solidaire',
  'Gestion des conflits',
  'Transformation des conflits',
  'Sécurité alimentaire',
  'Chaînes de valeur',
  'Droits humains',
  'Protection de l\'environnement',
  'Coopération internationale',
  'Partenariats',
  'Suivi-évaluation',
  'Gestion de projets',
  'Programmes multisectoriels',
  'Recherche-action participative',
  'Renforcement des capacités',
  'Accompagnement institutionnel',
  'Études de faisabilité',
  'Analyse de marché',
  'Évaluation d\'impact',
  'Capitalisation d\'expériences',
  'Dialogue politique',
  'Mobilisation de ressources',
  'Échange de bonnes pratiques',
  'Coordination multi-acteurs',
  'Formation de formateurs',
  'Transfert de compétences',
  'Achats de performances',
  'Optimisation des résultats',
  'Efficacité opérationnelle',
  'Gestion budgétaire',
  'Rapportage',
  'Capitalisation',
  'Apprentissage organisationnel',
  'Gestion des risques',
  'Planification stratégique',
  'Conception de projets',
  'Exécution de projets',
  'Accompagnement de projets',
  'Innovation sociale',
  'Durabilité'
]

async function categoryExists(categoryName) {
  try {
    const categoriesRef = collection(db, 'categories')
    const q = query(categoriesRef, where('name', '==', categoryName))
    const snapshot = await getDocs(q)
    return !snapshot.empty
  } catch (error) {
    console.error(`⚠️  Error checking category "${categoryName}":`, error.message)
    return false
  }
}

async function seedCategories() {
  try {
    console.log('🌱 Starting to seed categories...')
    console.log(`📝 Total categories to process: ${categories.length}\n`)

    const categoriesRef = collection(db, 'categories')
    let successCount = 0
    let skippedCount = 0
    let errorCount = 0

    for (const categoryName of categories) {
      try {
        // Check if category already exists
        const exists = await categoryExists(categoryName)
        
        if (exists) {
          skippedCount++
          console.log(`⏭️  Skipped (exists): ${categoryName}`)
          continue
        }

        // Add new category
        await addDoc(categoriesRef, {
          name: categoryName,
          createdAt: serverTimestamp()
        })
        successCount++
        console.log(`✅ Added: ${categoryName}`)
      } catch (error) {
        if (error.code === 'permission-denied') {
          console.error('\n❌ Permission denied. Make sure Firestore rules allow writes.')
          console.error('💡 Update Firestore rules to allow writes to the "categories" collection')
          process.exit(1)
        } else {
          errorCount++
          console.error(`❌ Error adding "${categoryName}":`, error.message)
        }
      }
    }

    console.log('\n📊 Summary:')
    console.log(`✅ Successfully added: ${successCount} categories`)
    if (skippedCount > 0) {
      console.log(`⏭️  Skipped (already exist): ${skippedCount} categories`)
    }
    if (errorCount > 0) {
      console.log(`❌ Errors: ${errorCount} categories`)
    }
    console.log('✨ Seeding completed!')
    process.exit(0)
  } catch (error) {
    console.error('💥 Fatal error:', error)
    process.exit(1)
  }
}

// Run the script
seedCategories()

