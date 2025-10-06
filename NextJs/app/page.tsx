export default function Home() {
  return (
    <main className="container">
      <div className="hero">
        <h1 className="title">
          Hello World! 🌍
        </h1>
        <p className="description">
          Welcome to your first Next.js application!
        </p>
        <div className="features">
          <div className="feature">
            <h3>⚡ Fast Refresh</h3>
            <p>Edit and see changes instantly</p>
          </div>
          <div className="feature">
            <h3>🚀 Production Ready</h3>
            <p>Optimized for performance</p>
          </div>
          <div className="feature">
            <h3>📱 Responsive</h3>
            <p>Works on all devices</p>
          </div>
        </div>
        <button className="cta-button">
          Get Started
        </button>
      </div>
    </main>
  )
}
