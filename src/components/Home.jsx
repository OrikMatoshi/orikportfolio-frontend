
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api/projects";

function Home({ refreshKey, onEdit }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Could not load projects.");
        }

        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [refreshKey]);

  async function deleteProject(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete project.");
      }

      setProjects((current) =>
        current.filter((project) => project.id !== id)
      );

      toast.success("Project deleted successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <main>
      {/* HERO */}
      <section id="home" className="hero-section container py-5">
        <p className="intro">WELCOME TO MY PORTFOLIO</p>

        <h1>
          Hi, I'm <span>Orik.</span>
        </h1>

        <h2>
          Aspiring Developer | Creative Thinker | Lifelong Learner
        </h2>

        <p className="description">
          I'm passionate about technology, creativity and building
          digital experiences while continuously learning and improving.
        </p>

        <div className="d-flex flex-wrap gap-3 mt-4">
          <a href="#projects" className="btn btn-primary">
            Explore My Work
          </a>

          <a href="#contact" className="btn btn-outline-light">
            Contact Me
          </a>
        </div>

        {/* HERO CARDS */}
        <div className="row g-3 mt-5">
          <div className="col-12 col-md-4">
            <div className="card h-100 p-4">
              <div className="fs-2 mb-3">💻</div>
              <h4>Web Development</h4>
              <p className="card-text">
                Exploring web technologies and building modern
                digital experiences.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card h-100 p-4">
              <div className="fs-2 mb-3">🚀</div>
              <h4>Always Learning</h4>
              <p className="card-text">
                Improving my skills, discovering new tools
                and taking on new challenges.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card h-100 p-4">
              <div className="fs-2 mb-3">🏓</div>
              <h4>Table Tennis</h4>
              <p className="card-text">
                Passion for strategy, focus, discipline
                and continuous improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="container py-5"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%"
        }}
      >
        <div className="text-center mb-5">
          <h2 className="mb-3">
            My <span>Projects</span>
          </h2>

          <p className="text-secondary">
            A collection of projects I'm building and learning from.
          </p>
        </div>

        {loading && (
          <p className="text-center">Loading projects...</p>
        )}

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <p className="text-secondary text-center">
            No projects yet. Create your first project!
          </p>
        )}

        <div className="row g-4 justify-content-center">
          {projects.map((project) => (
            <div
              className="col-12 col-md-6 col-lg-4 d-flex"
              key={project.id}
            >
              <div className="card w-100 h-100 bg-dark text-light border-secondary">
                {project.image_url && (
                  <img
                    src={project.image_url}
                    className="card-img-top"
                    alt={project.title}
                    style={{
                      height: "200px",
                      objectFit: "cover"
                    }}
                  />
                )}

                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start gap-2 flex-wrap">
                    <h5 className="card-title">
                      {project.title}
                    </h5>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => onEdit(project)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteProject(project.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <p className="card-text text-secondary">
                    {project.description}
                  </p>

                  <div className="d-flex flex-wrap gap-2 mt-auto">
                    {project.technologies?.map((technology, index) => (
                      <span
                        className="badge bg-primary"
                        key={`${technology}-${index}`}
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
