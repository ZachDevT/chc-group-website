/**
 * Script to seed 50 categories into Firestore using Firebase Admin SDK
 * This version bypasses security rules and doesn't require authentication
 * 
 * Setup:
 * 1. Install firebase-admin: npm install firebase-admin
 * 2. Get service account key from Firebase Console:
 *    - Go to Project Settings > Service Accounts
 *    - Click "Generate New Private Key"
 *    - Save as serviceAccountKey.json in project root
 * 3. Run: node scripts/seedCategoriesAdmin.js
 */

import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Initialize Firebase Admin
try {
  const serviceAccountPath = join(__dirname, '../serviceAccountKey.json')
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'))
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
  
  console.log('✅ Firebase Admin initialized')
} catch (error) {
  console.error('❌ Error initializing Firebase Admin:', error.message)
  console.error('\n💡 Make sure you have:')
  console.error('   1. Installed firebase-admin: npm install firebase-admin')
  console.error('   2. Created serviceAccountKey.json in project root')
  console.error('   3. Got the key from Firebase Console > Project Settings > Service Accounts')
  process.exit(1)
}

const db = admin.firestore()

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

async function seedCategories() {
  try {
    console.log('🌱 Starting to seed categories with Admin SDK...')
    console.log(`📝 Total categories to process: ${categories.length}\n`)

    let successCount = 0
    let skippedCount = 0
    let errorCount = 0

    for (const categoryName of categories) {
      try {
        // Check if category already exists
        const snapshot = await db.collection('categories')
          .where('name', '==', categoryName)
          .get()
        
        if (!snapshot.empty) {
          skippedCount++
          console.log(`⏭️  Skipped (exists): ${categoryName}`)
          continue
        }

        // Add new category
        await db.collection('categories').add({
          name: categoryName,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        })
        successCount++
        console.log(`✅ Added: ${categoryName}`)
      } catch (error) {
        errorCount++
        console.error(`❌ Error adding "${categoryName}":`, error.message)
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






