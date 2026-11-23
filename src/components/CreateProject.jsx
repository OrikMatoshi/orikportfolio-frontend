
import { useState } from "react";

const API_URL = "http://localhost:5000/api/projects";

function CreateProject({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: "",
    technologies: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const projectData = {
      title: form.title.trim(),
      description: form.description.trim(),
      image_url: form.image_url.trim(),
      technologies: form.technologies
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean)
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(projectData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create project.");
      }

      setForm({
        title: "",
        description: "",
        image_url: "",
        technologies: ""
      });

      if (onCreated) {
        onCreated();
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card bg-dark text-light border-secondary p-4">
            <h2 className="mb-4">Create New Project</h2>

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Project Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your project"
                  rows="4"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  name="image_url"
                  className="form-control"
                  value={form.image_url}
                  onChange={handleChange}
                  placeholder="https://example.com/image.png"
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Technologies</label>
                <input
                  type="text"
                  name="technologies"
                  className="form-control"
                  value={form.technologies}
                  onChange={handleChange}
                  placeholder="React, CSS, Node.js"
                />
                <small className="text-secondary">
                  Separate technologies with commas.
                </small>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Project"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateProject;
