# Scripts

## Seed Categories

This script adds 50 pre-defined categories to your Firestore database.

### Prerequisites

1. Make sure `.env.local` exists in the project root with your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

2. Ensure Firestore security rules allow writes to the `categories` collection:
   ```javascript
   match /categories/{document=**} {
     allow read: if true;
     allow write: if request.auth != null; // Or adjust based on your needs
   }
   ```

### Usage

Run the script using npm:

```bash
npm run seed:categories
```

Or directly with Node:

```bash
node scripts/seedCategories.js
```

### What it does

- Checks if each category already exists (to avoid duplicates)
- Adds 50 categories relevant to CHC Group's work areas
- Shows progress and summary at the end

### Categories included

The script adds categories covering:
- Core services (Actualités, Recherche, Projets, Formation, etc.)
- Sectors (Agroécologie, Gouvernance, Entrepreneuriat, etc.)
- Activities (Suivi-évaluation, Gestion de projets, etc.)
- And more...

All categories are relevant to CHC Group's mission and work areas.






