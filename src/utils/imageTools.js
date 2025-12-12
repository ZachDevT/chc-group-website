import imageCompression from 'browser-image-compression'

const MAX_SIZE_BYTES = 1024 * 1024 // 1MB

export const compressToBase64 = async (file, options = {}) => {
  if (!file) throw new Error('Aucun fichier image sélectionné.')

  // Essayer plusieurs niveaux de compression jusqu'à ce que l'image soit sous 1MB
  const compressionLevels = [
    { maxSizeMB: 0.8, maxWidthOrHeight: 1920, initialQuality: 0.8 },
    { maxSizeMB: 0.6, maxWidthOrHeight: 1600, initialQuality: 0.7 },
    { maxSizeMB: 0.5, maxWidthOrHeight: 1280, initialQuality: 0.6 },
    { maxSizeMB: 0.4, maxWidthOrHeight: 1024, initialQuality: 0.5 },
    { maxSizeMB: 0.3, maxWidthOrHeight: 800, initialQuality: 0.4 }
  ]

  let lastError = null

  for (let i = 0; i < compressionLevels.length; i++) {
    const level = compressionLevels[i]
    try {
      const compressionOptions = {
        maxSizeMB: options.maxSizeMB || level.maxSizeMB,
        maxWidthOrHeight: options.maxWidthOrHeight || level.maxWidthOrHeight,
        useWebWorker: true,
        initialQuality: options.initialQuality || level.initialQuality
      }

      const compressedFile = await imageCompression(file, compressionOptions)
      const base64 = await imageCompression.getDataUrlFromFile(compressedFile)

      // Calculer la taille réelle en bytes (base64 est ~33% plus grand que les bytes réels)
      const estimatedBytes = Math.ceil((base64.length * 3) / 4)
      
      if (estimatedBytes <= MAX_SIZE_BYTES) {
        return {
          base64,
          bytes: estimatedBytes
        }
      }

      // Si on est au dernier niveau et que ça dépasse encore, on continue quand même
      if (i === compressionLevels.length - 1) {
        // Essayer une compression encore plus agressive
        const finalOptions = {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 640,
          useWebWorker: true,
          initialQuality: 0.3
        }
        
        const finalCompressed = await imageCompression(file, finalOptions)
        const finalBase64 = await imageCompression.getDataUrlFromFile(finalCompressed)
        const finalBytes = Math.ceil((finalBase64.length * 3) / 4)
        
        return {
          base64: finalBase64,
          bytes: finalBytes
        }
      }
    } catch (error) {
      lastError = error
      // Continuer avec le niveau suivant
      continue
    }
  }

  // Si tous les niveaux ont échoué, lancer la dernière erreur
  throw lastError || new Error('Impossible de compresser l\'image sous 1MB. Veuillez utiliser une image plus petite.')
}


