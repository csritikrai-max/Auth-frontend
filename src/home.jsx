const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Mono', monospace;
    background: #0e0e0e;
    min-height: 100vh;
  }

  .home-wrapper {
    min-height: 100vh;
    background: #0e0e0e;
    display: flex;
    flex-direction: column;
  }

  /* Navbar */
  .home-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px;
    border-bottom: 1px solid #2a2a2a;
  }

  .home-nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    color: #c9a96e;
  }

  .btn-logout {
    background: transparent;
    border: 1px solid #2a2a2a;
    color: #888;
    padding: 8px 18px;
    border-radius: 8px;
    font-family: 'DM Mono', monospace;
    font-size: 0.78rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-logout:hover {
    border-color: #c0392b;
    color: #e07070;
    background: #1e1010;
  }

  /* Hero */
  .home-hero {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 60px 20px;
    animation: fadeIn 0.5s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .home-badge {
    display: inline-block;
    font-size: 0.68rem;
    color: #c9a96e;
    background: rgba(201,169,110,0.1);
    border: 1px solid rgba(201,169,110,0.2);
    padding: 4px 12px;
    border-radius: 20px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  .home-title {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    color: #e8e8e8;
    line-height: 1.15;
    margin-bottom: 16px;
    letter-spacing: -1px;
  }

  .home-title span {
    color: #c9a96e;
  }

  .home-subtitle {
    font-size: 0.85rem;
    color: #555;
    max-width: 380px;
    line-height: 1.7;
    margin-bottom: 40px;
  }

  .home-card-row {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 8px;
  }

  .home-card {
    background: #161616;
    border: 1px solid #2a2a2a;
    border-radius: 12px;
    padding: 24px 28px;
    width: 160px;
    text-align: center;
    transition: border-color 0.2s;
  }

  .home-card:hover { border-color: #c9a96e; }

  .home-card-icon {
    font-size: 1.6rem;
    margin-bottom: 10px;
  }

  .home-card-label {
    font-size: 0.75rem;
    color: #666;
    letter-spacing: 0.5px;
  }

`;

function Home({ onLogout }) {
  return (
    <>
      <style>{styles}</style>
      <div className="home-wrapper">

        {/* Navbar */}
        <nav className="home-nav">
          <div className="home-nav-logo">Notes.</div>
          <button className="btn-logout" onClick={onLogout}>
            Logout
          </button>
        </nav>

        {/* Hero */}
        <div className="home-hero">
          <div className="home-badge">✓ Logged in successfully</div>
          <h1 className="home-title">
            Welcome to <span>Notes.</span>
          </h1>
          <p className="home-subtitle">
            You are now logged in. Your thoughts are safe here.
          </p>

          {/* Feature cards */}
          <div className="home-card-row">
            <div className="home-card">
              <div className="home-card-icon">📝</div>
              <div className="home-card-label">Create Notes</div>
            </div>
            <div className="home-card">
              <div className="home-card-icon">✏️</div>
              <div className="home-card-label">Edit Anytime</div>
            </div>
            <div className="home-card">
              <div className="home-card-icon">🗑️</div>
              <div className="home-card-label">Delete Easily</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;