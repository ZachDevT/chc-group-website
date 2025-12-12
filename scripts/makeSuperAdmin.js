/**
 * Browser Console Script to Make Yourself Super Admin
 * 
 * Instructions:
 * 1. Log into your admin dashboard at /admin
 * 2. Open browser console (F12 or Cmd+Option+I)
 * 3. Copy and paste this ENTIRE script into the console
 * 4. Press Enter to run
 * 5. Wait for success message
 * 6. Log out and log back in
 */

(async function makeSuperAdmin() {
  try {
    console.log('🔐 Starting super-admin setup...')
    
    // Import Firebase functions
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js')
    const { getAuth } = await import('https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js')
    const { getFirestore, doc, setDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js')
    
    // Initialize Firebase with your config (or get existing app)
    const firebaseConfig = {
      apiKey: "AIzaSyCO4QKxH3V0nSEsXGUW5MWcmA1e3kugm2Y",
      authDomain: "chc-group.firebaseapp.com",
      projectId: "chc-group",
      storageBucket: "chc-group.firebasestorage.app",
      messagingSenderId: "325334723337",
      appId: "1:325334723337:web:8ec93bab7cc57bf3a201d8"
    }
    
    let app
    try {
      // Try to get existing app
      const { getApps } = await import('https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js')
      const apps = getApps()
      app = apps.length > 0 ? apps[0] : initializeApp(firebaseConfig)
    } catch {
      // If getApps doesn't exist or fails, initialize new app
      app = initializeApp(firebaseConfig, 'admin-script')
    }
    
    const auth = getAuth(app)
    const db = getFirestore(app)
    
    // Get current user
    const user = auth.currentUser
    
    if (!user) {
      console.error('❌ Not logged in. Please log in first.')
      alert('❌ Not logged in. Please log in to the admin dashboard first.')
      return
    }
    
    console.log('✅ User found:', user.email)
    console.log('📝 User ID:', user.uid)
    
    // Create/update userRoles document
    const userRoleRef = doc(db, 'userRoles', user.uid)
    
    await setDoc(userRoleRef, {
      role: 'super-admin',
      name: 'Zachsoft',
      email: user.email || 'zachdev10000@gmail.com',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true })
    
    console.log('✅ Success! Your role has been set to super-admin.')
    console.log('🔄 Please log out and log back in to see the changes.')
    console.log('📋 You should now see:')
    console.log('   - "Super Admin" badge in navbar')
    console.log('   - "Utilisateurs" tab in sidebar')
    console.log('   - Ability to create new users')
    
    // Show alert
    alert('✅ Super Admin role set!\n\nPlease log out and log back in to see the changes.')
    
  } catch (error) {
    console.error('❌ Error:', error)
    console.error('💡 Make sure you are logged into the admin dashboard')
    alert('❌ Error: ' + error.message + '\n\nMake sure you are logged in.')
  }
})()

