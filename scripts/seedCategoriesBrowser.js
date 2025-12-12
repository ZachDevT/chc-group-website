/**
 * Browser Console Script to Seed Categories
 * 
 * Instructions:
 * 1. Log into your admin dashboard at /admin
 * 2. Open browser console (F12 or Cmd+Option+I)
 * 3. Copy and paste this entire script into the console
 * 4. Press Enter to run
 * 
 * This script uses your authenticated session to add categories.
 */

(async function seedCategories() {
  // Import Firebase functions (they should already be available in your app)
  const { collection, addDoc, serverTimestamp, getDocs, query, where } = await import('https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js')
  
  // Get db from your app's Firebase config
  // You'll need to adjust this based on how your app exports db
  // For now, we'll use the window object if available, or you can manually set it
  
  console.log('🌱 Starting to seed categories...')
  
  const categories = [
    'Actualités', 'Recherche', 'Projets', 'Formation', 'Développement',
    'Agroécologie', 'Développement durable', 'Gouvernance', 'Citoyenneté',
    'Gestion des ressources naturelles', 'Entrepreneuriat', 'Développement des marchés',
    'Économie sociale et solidaire', 'Gestion des conflits', 'Transformation des conflits',
    'Sécurité alimentaire', 'Chaînes de valeur', 'Droits humains', 'Protection de l\'environnement',
    'Coopération internationale', 'Partenariats', 'Suivi-évaluation', 'Gestion de projets',
    'Programmes multisectoriels', 'Recherche-action participative', 'Renforcement des capacités',
    'Accompagnement institutionnel', 'Études de faisabilité', 'Analyse de marché', 'Évaluation d\'impact',
    'Capitalisation d\'expériences', 'Dialogue politique', 'Mobilisation de ressources',
    'Échange de bonnes pratiques', 'Coordination multi-acteurs', 'Formation de formateurs',
    'Transfert de compétences', 'Achats de performances', 'Optimisation des résultats',
    'Efficacité opérationnelle', 'Gestion budgétaire', 'Rapportage', 'Capitalisation',
    'Apprentissage organisationnel', 'Gestion des risques', 'Planification stratégique',
    'Conception de projets', 'Exécution de projets', 'Accompagnement de projets',
    'Innovation sociale', 'Durabilité'
  ]
  
  // Get db from window if available (adjust based on your app structure)
  const db = window.__FIREBASE_DB__ || (() => {
    throw new Error('Firebase db not found. Please set window.__FIREBASE_DB__ = db in your app')
  })()
  
  const categoriesRef = collection(db, 'categories')
  let successCount = 0
  let skippedCount = 0
  let errorCount = 0
  
  for (const categoryName of categories) {
    try {
      // Check if exists
      const q = query(categoriesRef, where('name', '==', categoryName))
      const snapshot = await getDocs(q)
      
      if (!snapshot.empty) {
        skippedCount++
        console.log(`⏭️  Skipped (exists): ${categoryName}`)
        continue
      }
      
      // Add category
      await addDoc(categoriesRef, {
        name: categoryName,
        createdAt: serverTimestamp()
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
  console.log(`⏭️  Skipped (already exist): ${skippedCount} categories`)
  if (errorCount > 0) {
    console.log(`❌ Errors: ${errorCount} categories`)
  }
  console.log('✨ Seeding completed!')
})()






