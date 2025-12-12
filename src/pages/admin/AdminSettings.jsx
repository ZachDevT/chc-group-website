import { FiSettings } from 'react-icons/fi'

const AdminSettings = () => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-title">
        <FiSettings /> Paramètres généraux
      </h3>
      <p>
        Configurez ici les éléments transversaux (par exemple les identifiants Firebase, les liens sociaux, ou les préférences de mise en avant). Cette section est prête à accueillir
        vos besoins spécifiques.
      </p>
    </div>
  )
}

export default AdminSettings


