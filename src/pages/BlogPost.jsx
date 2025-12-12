import { useEffect, useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiCalendar, FiUser, FiTag, FiShare2, FiFacebook, FiTwitter, FiLinkedin, FiCopy, FiCheck, FiArrowRight } from 'react-icons/fi'
import { useDocumentByField } from '../hooks/useDocumentByField.js'
import { useRealtimeCollection } from '../hooks/useRealtimeCollection.js'
import { incrementPostViews } from '../services/contentService.js'
import SEO from '../components/SEO.jsx'
import './BlogPost.css'

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const BlogPost = () => {
  const { slug } = useParams()
  const { document: post, loading } = useDocumentByField('blogPosts', 'slug', slug)
  const { data: allPosts } = useRealtimeCollection('blogPosts', { orderByField: 'createdAt' })
  const [copied, setCopied] = useState(false)
  const [viewsTracked, setViewsTracked] = useState(false)

  const relatedArticles = useMemo(() => {
    if (!post || !allPosts) return []
    
    return allPosts
      .filter((article) => 
        article.id !== post.id && 
        (article.category === post.category || 
         article.title?.toLowerCase().includes(post.title?.split(' ')[0]?.toLowerCase() || ''))
      )
      .slice(0, 3)
  }, [post, allPosts])

  // Track views when post is loaded
  useEffect(() => {
    if (post?.id && !viewsTracked) {
      incrementPostViews(post.id).catch(console.error)
      setViewsTracked(true)
    }
  }, [post?.id, viewsTracked])

  const articleUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : ''
  const articleTitle = post?.title || ''
  const articleDescription = post?.excerpt || ''

  const handleShare = async () => {
    const shareData = {
      title: articleTitle,
      text: articleDescription,
      url: articleUrl
    }

    // Try Web Share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err)
        }
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(articleUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = articleUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareToSocial = (platform) => {
    const encodedUrl = encodeURIComponent(articleUrl)
    const encodedTitle = encodeURIComponent(articleTitle)
    const encodedDescription = encodeURIComponent(articleDescription)

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
    }

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400')
    }
  }

  if (loading) {
    return <div className="page-loader">Chargement de l'article...</div>
  }

  if (!post) {
    return (
      <div className="page-loader" style={{ textAlign: 'center' }}>
        Article introuvable.
      </div>
    )
  }

  return (
    <div className="blog-post-page">
      <SEO
        title={post.title}
        description={post.excerpt || `Article de ${post.authorName || post.author} sur ${post.category}`}
        image={post.coverImage || post.image}
        type="article"
        article={{
          title: post.title,
          excerpt: post.excerpt,
          coverImage: post.coverImage || post.image,
          createdAt: post.createdAt?.toDate ? post.createdAt.toDate().toISOString() : new Date(post.createdAt).toISOString(),
          updatedAt: post.updatedAt?.toDate ? post.updatedAt.toDate().toISOString() : post.createdAt?.toDate ? post.createdAt.toDate().toISOString() : new Date(post.updatedAt || post.createdAt).toISOString(),
          authorName: post.authorName || post.author
        }}
      />
      <motion.section 
        className="blog-post-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ backgroundImage: `linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(26, 26, 26, 0.6) 100%), url(${post.coverImage || post.image})` }}
      >
        <div className="container">
          <Link to="/blog" className="back-link">
            <FiArrowLeft /> Retour au blog
          </Link>
          <div className="blog-post-hero-content">
            <div className="blog-post-meta">
              <span className="blog-post-category"><FiTag /> {post.category}</span>
              <span><FiCalendar /> {formatDate(post.createdAt)}</span>
              <span><FiUser /> {post.authorName || post.author}</span>
            </div>
            <h1 className="blog-post-title">{post.title}</h1>
          </div>
        </div>
      </motion.section>

      <section className="blog-post-content">
        <div className="container">
          <div className="blog-post-layout">
            <article 
              className="blog-post-article"
              dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt || ''}</p>` }}
            />
            <aside className="blog-post-sidebar">
              <div className="sidebar-card">
                <h3>Partager</h3>
                <button className="share-btn" onClick={handleShare}>
                  {copied ? (
                    <>
                      <FiCheck /> Lien copié !
                    </>
                  ) : (
                    <>
                      <FiShare2 /> Partager cet article
                    </>
                  )}
                </button>
                <div className="share-social-buttons">
                  <button 
                    className="share-social-btn facebook" 
                    onClick={() => shareToSocial('facebook')}
                    aria-label="Partager sur Facebook"
                  >
                    <FiFacebook />
                  </button>
                  <button 
                    className="share-social-btn twitter" 
                    onClick={() => shareToSocial('twitter')}
                    aria-label="Partager sur Twitter"
                  >
                    <FiTwitter />
                  </button>
                  <button 
                    className="share-social-btn linkedin" 
                    onClick={() => shareToSocial('linkedin')}
                    aria-label="Partager sur LinkedIn"
                  >
                    <FiLinkedin />
                  </button>
                  <button 
                    className="share-social-btn whatsapp" 
                    onClick={() => shareToSocial('whatsapp')}
                    aria-label="Partager sur WhatsApp"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </button>
                  <button 
                    className="share-social-btn copy" 
                    onClick={handleShare}
                    aria-label="Copier le lien"
                    title="Copier le lien"
                  >
                    <FiCopy />
                  </button>
                </div>
              </div>

              {relatedArticles.length > 0 && (
                <div className="sidebar-card">
                  <h3>Articles connexes</h3>
                  <div className="related-articles">
                    {relatedArticles.map((article) => (
                      <Link 
                        key={article.id} 
                        to={`/blog/${article.slug}`}
                        className="related-article-item"
                      >
                        <div className="related-article-image">
                          <img 
                            src={article.coverImage || article.image} 
                            alt={article.title}
                            onError={(e) => {
                              e.target.style.display = 'none'
                            }}
                          />
                        </div>
                        <div className="related-article-content">
                          <h4>{article.title}</h4>
                          <p className="related-article-meta">
                            <FiTag /> {article.category}
                          </p>
                        </div>
                        <FiArrowRight className="related-article-arrow" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogPost




