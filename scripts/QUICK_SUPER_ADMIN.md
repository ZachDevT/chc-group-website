# Quick Guide: Make Yourself Super Admin

## For Zachsoft (zachdev10000@gmail.com)

### Method 1: Browser Console Script (Easiest)

1. **Log into your admin dashboard** at `http://localhost:5173/admin`
   - Email: `zachdev10000@gmail.com`
   - Password: `123456`

2. **Open Browser Console**
   - Press `F12` (Windows/Linux) or `Cmd+Option+I` (Mac)
   - Or right-click → Inspect → Console tab

3. **Copy the entire script** from `scripts/makeSuperAdmin.js`

4. **Paste it into the console** and press Enter

5. **Wait for success message** - you should see:
   ```
   ✅ Success! Your role has been set to super-admin.
   ```

6. **Log out and log back in** to see the changes

### Method 2: Firebase Console (If you have access)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **chc-group**
3. Go to **Firestore Database**
4. Find or create collection: **`userRoles`**
5. Create document with ID = your Firebase Auth UID
6. Add fields:
   - `role`: `super-admin` (string)
   - `name`: `Zachsoft` (string)
   - `email`: `zachdev10000@gmail.com` (string)
7. Save and refresh admin dashboard

### After Becoming Super Admin

You should see:
- ✅ "Super Admin" badge in the navbar (with shield icon)
- ✅ "Utilisateurs" tab in the sidebar
- ✅ Ability to create new users in the Users page

---

**Note:** If the browser console script doesn't work, use Method 2 (Firebase Console).






