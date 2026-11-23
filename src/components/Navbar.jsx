
function Navbar({ page, onNavigate }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark border-bottom border-secondary py-3">
      <div className="container">
        <a
          className="navbar-brand fw-bold fs-3"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("home");
          }}
        >
          Orik<span className="text-primary">.</span>
        </a>

        <div className="d-flex gap-3">
          <button
            className={`btn ${
              page === "home"
                ? "btn-primary"
                : "btn-outline-light"
            }`}
            onClick={() => onNavigate("home")}
          >
            Home
          </button>

          <button
            className={`btn ${
              page === "create"
                ? "btn-primary"
                : "btn-outline-light"
            }`}
            onClick={() => onNavigate("create")}
          >
            + New Project
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
