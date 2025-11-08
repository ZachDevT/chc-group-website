// Simple test app
function App() {
  return (
    <div style={{ 
      padding: '40px', 
      background: '#e63946', 
      color: 'white', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>✅ React is Working!</h1>
      <p>If you see this, React is rendering.</p>
      <button 
        onClick={() => alert('Click works!')}
        style={{
          padding: '12px 24px',
          background: 'white',
          color: '#e63946',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          marginTop: '20px'
        }}
      >
        Test Button
      </button>
    </div>
  )
}

export default App


