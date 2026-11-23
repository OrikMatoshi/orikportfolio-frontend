
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateProject from "./components/CreateProject";
import EditProject from "./components/EditProject";

import { toast } from "react-toastify";

import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Bootstrap",
    "Node.js",
    "Express.js",
    "SQLite"
  ];

  function handleProjectCreated() {
    setRefreshKey((current) => current + 1);
    setPage("home");
    toast.success("Project created successfully!");
  }

  function handleEditProject(project) {
    setSelectedProject(project);
    setPage("edit");
  }

  function handleProjectUpdated() {
    setSelectedProject(null);
    setRefreshKey((current) => current + 1);
    setPage("home");
    toast.success("Project updated successfully!");
  }

  function handleCancelEdit() {
    setSelectedProject(null);
    setPage("home");
  }

  return (
    <div className="portfolio">

      <Navbar page={page} onNavigate={setPage} />

      {/* HOME PAGE */}
      {page === "home" && (
        <>
          <Home
            refreshKey={refreshKey}
            onEdit={handleEditProject}
          />

          {/* ABOUT ME */}
          <section id="about" className="content-section container">
            <p className="intro">GET TO KNOW ME</p>

            <h2>
              About <span>Me</span>
            </h2>

            <p>
              I'm an aspiring developer with a passion for technology,
              creativity and learning new things. I'm currently building
              my programming skills and creating projects to improve
              my knowledge and experience.
            </p>
          </section>

          {/* MY SKILLS */}
          <section id="skills" className="content-section container">
            <p className="intro">WHAT I'M LEARNING</p>

            <h2>
              My <span>Skills</span>
            </h2>

            <p>
              Technologies and tools I'm learning and using in my projects.
            </p>

            <div className="row g-3 mt-3">
              {skills.map((skill) => (
                <div
                  className="col-6 col-md-4 col-lg-3"
                  key={skill}
                >
                  <div className="card h-100 text-center p-3">
                    <h5 className="mb-0">{skill}</h5>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* MY PASSIONS */}
          <section id="passions" className="content-section container">
            <p className="intro">WHAT INSPIRES ME</p>

            <h2>
              My <span>Passions</span>
            </h2>

            <div className="row g-4 mt-2">

              {/* WEB DEVELOPMENT */}
              <div className="col-12 col-md-6">
                <div className="card h-100 overflow-hidden">
                  <div className="p-4">
                    <p className="intro">
                      CREATIVITY & TECHNOLOGY
                    </p>

                    <h3>💻 Web Development</h3>

                    <p className="card-text">
                      I enjoy learning how websites and applications work,
                      building digital experiences and exploring new
                      technologies.
                    </p>
                  </div>

                  <img
                    src="https://images.unsplash.com/photo-1761123044903-1671e0edc3f6?q=80&w=820&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                    alt="Web Development"
                    className="w-100 mt-auto"
                    style={{
                      height: "230px",
                      objectFit: "cover"
                    }}
                  />
                </div>
              </div>

              {/* TABLE TENNIS */}
              <div className="col-12 col-md-6">
                <div className="card h-100 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1534158914592-062992fbe900?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                    alt="Table Tennis"
                    className="w-100"
                    style={{
                      height: "230px",
                      objectFit: "cover"
                    }}
                  />

                  <div className="p-4">
                    <p className="intro">BEYOND CODING</p>

                    <h3>🏓 Table Tennis</h3>

                    <p className="card-text">
                      Beyond technology, table tennis is another passion
                      of mine. It has taught me focus, discipline,
                      strategy and the importance of always improving.
                    </p>

                    <span className="badge bg-primary">
                      Passion • Focus • Discipline
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="content-section container">
            <p className="intro">LET'S CONNECT</p>

            <h2>
              Contact <span>Me</span>
            </h2>

            <p>
              Thanks for visiting my portfolio! I'm always interested
              in learning, sharing ideas and connecting with others.
            </p>
          </section>
        </>
      )}

      {/* CREATE PROJECT */}
      {page === "create" && (
        <CreateProject
          onCreated={handleProjectCreated}
        />
      )}

      {/* EDIT PROJECT */}
      {page === "edit" && selectedProject && (
        <EditProject
          project={selectedProject}
          onUpdated={handleProjectUpdated}
          onCancel={handleCancelEdit}
        />
      )}

      {/* FOOTER */}
      <footer className="container text-center py-4">
        © 2026 Orik. All rights reserved.
      </footer>

    </div>
  );
}

export default App;
