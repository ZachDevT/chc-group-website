import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SEO = ({ 
  title, 
  description, 
  image, 
  type = 'website',
  article = null 
}) => {
  const location = useLocation()
  const baseUrl = 'https://chc-group.web.app'
  const currentUrl = `${baseUrl}${location.pathname}`
  
  const defaultTitle = 'CHC Group - Congo Horizon Challenges Group | Ensemble pour forger notre horizon'
  const defaultDescription = 'Cabinet de droit congolais proposant des services et solutions innovantes dans le domaine de la conception, du suivi-évaluation des projets/programmes multisectoriels.'
  const defaultImage = `${baseUrl}/web-app-manifest-512x512.png`
  
  const seoTitle = title ? `${title} | CHC Group` : defaultTitle
  const seoDescription = description || defaultDescription
  const seoImage = image || defaultImage

  useEffect(() => {
    // Update document title
    document.title = seoTitle

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // Primary meta tags
    updateMetaTag('title', seoTitle)
    updateMetaTag('description', seoDescription)
    
    // Open Graph
    updateMetaTag('og:title', seoTitle, true)
    updateMetaTag('og:description', seoDescription, true)
    updateMetaTag('og:image', seoImage, true)
    updateMetaTag('og:url', currentUrl, true)
    updateMetaTag('og:type', type, true)
    
    // Twitter
    updateMetaTag('twitter:title', seoTitle)
    updateMetaTag('twitter:description', seoDescription)
    updateMetaTag('twitter:image', seoImage)
    updateMetaTag('twitter:url', currentUrl)
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', currentUrl)

    // Article structured data if article is provided
    if (article && type === 'article') {
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.excerpt || seoDescription,
        image: article.coverImage || seoImage,
        datePublished: article.createdAt,
        dateModified: article.updatedAt || article.createdAt,
        author: {
          '@type': 'Person',
          name: article.authorName || article.author || 'CHC Group'
        },
        publisher: {
          '@type': 'Organization',
          name: 'CHC Group',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/web-app-manifest-512x512.png`
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': currentUrl
        }
      }

      // Remove existing article schema
      const existingScript = document.querySelector('script[data-seo="article"]')
      if (existingScript) {
        existingScript.remove()
      }

      // Add new article schema
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-seo', 'article')
      script.textContent = JSON.stringify(articleSchema)
      document.head.appendChild(script)
    }
  }, [seoTitle, seoDescription, seoImage, currentUrl, type, article])

  return null
}

export default SEO






