
import { useState } from "react";

const API_URL = "http://localhost:5000/api/projects";

function EditProject({ project, onUpdated, onCancel }) {
  const [form, setForm] = useState({
    title: project.title || "",
    description: project.description || "",
    image_url: project.image_url || "",
    technologies: (project.technologies || []).join(", ")
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

    const updatedProject = {
      title: form.title.trim(),
      description: form.description.trim(),
      image_url: form.image_url.trim(),
      technologies: form.technologies
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean)
    };

    try {
      const response = await fetch(`${API_URL}/${project.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProject)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update project.");
      }

      if (onUpdated) {
        onUpdated();
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
            <h2 className="mb-4">Edit Project</h2>

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

              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditProject;
