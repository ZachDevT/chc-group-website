import { FiBookOpen, FiUsers, FiImage, FiShare2, FiTrendingUp, FiPieChart } from 'react-icons/fi'
import { useRealtimeCollection } from '../../hooks/useRealtimeCollection.js'

const AdminDashboard = () => {
  const { data: posts } = useRealtimeCollection('blogPosts', { orderByField: 'createdAt' })
  const { data: partners } = useRealtimeCollection('partners', { orderByField: 'createdAt' })
  const { data: gallery } = useRealtimeCollection('gallery', { orderByField: 'createdAt' })
  const { data: authors } = useRealtimeCollection('authors', { orderByField: 'createdAt' })

  const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0)

  const metrics = [
    { icon: <FiBookOpen />, label: 'Articles publiés', value: posts.length },
    { icon: <FiUsers />, label: 'Auteurs inscrits', value: authors.length },
    { icon: <FiShare2 />, label: 'Partenaires actifs', value: partners.length },
    { icon: <FiImage />, label: 'Photos en galerie', value: gallery.length },
    { icon: <FiTrendingUp />, label: 'Vues cumulées', value: totalViews },
  ]

  const recentPosts = posts.slice(0, 5)

  const categoryCounts = posts.reduce((acc, post) => {
    const cat = post.category || 'Sans catégorie'
    acc[cat] = (acc[cat] || 0) + 1
    return acc
  }, {})
  const categoryData = Object.entries(categoryCounts)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  const trendingPosts = [...posts]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 4)

  const now = new Date()
  const lastSixMonths = Array.from({ length: 6 }).map((_, idx) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - idx), 1)
    const label = date.toLocaleDateString('fr-FR', { month: 'short' })
    const value = posts.filter((post) => {
      if (!post.createdAt) return false
      const createdDate = post.createdAt.toDate ? post.createdAt.toDate() : new Date(post.createdAt)
      return createdDate.getMonth() === date.getMonth() && createdDate.getFullYear() === date.getFullYear()
    }).length
    return { label, value }
  })
  const maxMonthly = Math.max(...lastSixMonths.map((item) => item.value), 1)

  return (
    <div className="admin-dashboard">
      <div className="admin-grid">
        {metrics.map((metric) => (
          <div key={metric.label} className="admin-card metric-card">
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value">{metric.value}</div>
            <div className="metric-icon">{metric.icon}</div>
          </div>
        ))}
      </div>

      <div className="analytics-grid">
        <div className="admin-card mini-chart-card">
          <h3 className="admin-section-title">
            <FiTrendingUp /> Activité des publications
          </h3>
          <div className="mini-chart">
            {lastSixMonths.map((item) => (
              <div key={item.label} className="mini-chart-column">
                <div
                  className="mini-chart-bar"
                  style={{ height: `${(item.value / maxMonthly) * 100}%` }}
                  aria-label={`${item.value} publications en ${item.label}`}
                >
                  <span>{item.value}</span>
                </div>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card categories-card">
          <h3 className="admin-section-title">
            <FiPieChart /> Répartition des catégories
          </h3>
          {categoryData.length === 0 ? (
            <div className="admin-empty-state">Aucune catégorie disponible.</div>
          ) : (
            <ul className="category-list">
              {categoryData.map((category) => {
                const percentage = posts.length ? Math.round((category.value / posts.length) * 100) : 0
                return (
                  <li key={category.label} className="category-item">
                    <div>
                      <strong>{category.label}</strong>
                      <small>{category.value} article(s)</small>
                    </div>
                    <div className="category-progress">
                      <span style={{ width: `${percentage}%` }} />
                      <p>{percentage}%</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="analytics-grid">
        <div className="admin-card">
          <h3 className="admin-section-title">
            <FiBookOpen /> Articles récents
          </h3>
          {recentPosts.length === 0 ? (
            <div className="admin-empty-state">
              Aucun article pour le moment. Passez par l'onglet blog pour en ajouter.
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Catégorie</th>
                  <th>Auteur</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.category}</td>
                    <td>{post.authorName || post.author}</td>
                    <td>
                      <span className={`status-pill ${post.status === 'draft' ? 'draft' : 'success'}`}>
                        {post.status || 'publié'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="admin-card">
          <h3 className="admin-section-title">
            <FiTrendingUp /> Articles tendance
          </h3>
          {trendingPosts.length === 0 ? (
            <div className="admin-empty-state">Aucune donnée de vues disponible.</div>
          ) : (
            <ul className="trending-list">
              {trendingPosts.map((post) => (
                <li key={post.id}>
                  <div>
                    <strong>{post.title}</strong>
                    <p>{post.category}</p>
                  </div>
                  <span>{post.views || 0} vues</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard


