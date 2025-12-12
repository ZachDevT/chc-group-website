# How to Become a Super Admin

To change your role from "editor" to "super-admin" so you can add other users, you need to update your user role in Firestore.

## Method 1: Using Firebase Console (Easiest)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **chc-group**
3. Navigate to **Firestore Database** in the left sidebar
4. Find the collection named **`userRoles`**
5. Look for a document with your user ID (the same ID as your Firebase Auth user)
   - If you don't see your document, you need to create one
6. Click on the document to edit it
7. Update or add the field:
   - **Field name**: `role`
   - **Field value**: `super-admin` (as a string)
8. Also add/update these fields:
   - `name`: Your full name
   - `email`: Your email address
   - `avatar`: (optional) URL or base64 image
9. Click **Update** to save
10. **Refresh your admin dashboard** - you should now see the "Utilisateurs" tab in the sidebar

## Method 2: Using Firebase CLI

If you have Firebase CLI installed:

```bash
# Set your project
firebase use chc-group

# Update the user role (replace YOUR_USER_ID with your actual Firebase Auth UID)
firebase firestore:set userRoles/YOUR_USER_ID '{"role":"super-admin","name":"Your Name","email":"your@email.com"}' --merge
```

To find your User ID:
1. Go to Firebase Console > Authentication
2. Find your user in the list
3. Copy the UID (it's in the first column)

## Method 3: Create a Script (For First Super Admin)

If you're the first user and no super-admin exists yet, you can create a script:

1. Log into your admin dashboard
2. Open browser console (F12)
3. Run this code (replace with your email):

```javascript
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js'
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js'

// Get current user
const auth = getAuth()
const user = auth.currentUser

if (user) {
  const db = getFirestore()
  const userRoleRef = doc(db, 'userRoles', user.uid)
  
  await setDoc(userRoleRef, {
    role: 'super-admin',
    name: 'Your Name', // Change this
    email: user.email,
    createdAt: new Date()
  }, { merge: true })
  
  console.log('✅ Role updated! Refresh the page.')
} else {
  console.log('❌ Not logged in')
}
```

## Verification

After updating your role:
1. **Log out** of the admin dashboard
2. **Log back in**
3. You should now see:
   - "Super Admin" badge in the navbar
   - "Utilisateurs" tab in the sidebar
   - Ability to create new users

## Important Notes

- Only super-admins can create new users
- The role is stored in Firestore collection `userRoles`
- Each document ID should match the Firebase Auth user UID
- After changing your role, you must log out and log back in for changes to take effect






