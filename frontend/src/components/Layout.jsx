import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ title, subtitle, children }) {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="main-panel">
        <Navbar />

        <main className="page-content">
          <section className="page-banner">
            <div>
              <p className="eyebrow">CareerCompass</p>
              <h1>{title}</h1>
              {subtitle ? <p>{subtitle}</p> : null}
            </div>
          </section>

          <div className="page-body">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default Layout;