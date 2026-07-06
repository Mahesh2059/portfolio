import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

function App() {

  // STATES 

  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("Connecting...");

  //FETCH DATA

  useEffect(() => {

    const fetchData = async () => {

      try {

        // EXPERIENCE DATA
     const expResponse = await axios.get(
  'http://127.0.0.1:5000/api/experience'
);

        setExperience(expResponse.data);

        // SKILLS DATA
    const skillResponse = await axios.get(
  `${API_URL}/api/skills`
);
    const proj = await axios.get(`${API_URL}/api/projects`);
        setProjects(proj.data);

        setSkills(skillResponse.data);

        setStatus("Connected to Database");

      } catch (err) {

        console.error("Connection Error:", err);

        setStatus("Backend not connected");

      }

    };

    fetchData();

  }, []);

  // CONTACT FORM

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

     await axios.post(
  `${API_URL}/api/message`,
  formData
);

      alert("Message Sent Successfully");

      setFormData({
        name: "",
        email: "",
        message: ""
      });

    } catch (err) {

      console.log(err);

      alert("Error sending message");

    }

  };

  return (

    <div className="portfolio-container">

      {/* NAVBAR */}
    <nav className="navbar">
   <a href="#" className="logo">MD</a>

  <div className="nav-right">
    <ul className="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#experience">Experience</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <button className="resume-btn">Resume</button>
  </div>
</nav>
     
    

      {/* HERO SECTION

      <header className="hero-section">

        <h1>Mahesh Devkota MERN Portfolio</h1>

        <p className="status-tag">

          Backend Status :

          <strong
            style={{
              color:
                status === "Connected to Database"
                  ? "#10b981"
                  : "#ef4444"
            }}
          >
            {" "} {status}
          </strong>

        </p>

      </header> */}

      {/* ABOUT SECTION */}

      <section id="about" className="about-section">

  <div className="about-container">

    {/* Left Side */}

    <div className="about-text">

      <h2>About Me</h2>

      <p>
        Hi, I'm Mahesh Devkota, a passionate Full Stack Developer
        focused on building modern, responsive, and user-friendly
        web applications using React, Node.js, Express, MongoDB,
        PHP, JavaScript, HTML, and CSS.

        I enjoy creating clean and efficient projects while
        continuously learning new technologies and improving
        my development skills.
      </p>

    </div>

    {/* Right Side */}

    <div className="about-image">

      <img
        src="/images/profile.jpeg"
        alt="Mahesh"
      />

    </div>

  </div>

</section>

      {/* SKILLS SECTION */}

    <section id="skills" className="section">
    

  <h2>Skills</h2>

  {/* Languages */}

  <h3 className="skill-title">
    Languages
  </h3>

  <div className="skills-container">

    {
      skills
        .filter(skill => skill.category === "language")
        .map((skill, index) => (

          <div key={index} className="skill-card">

            <img
              src={skill.logo}
              alt={skill.name}
              className="skill-logo"
            />

            <p>{skill.name}</p>

          </div>

        ))
    }

  </div>

  {/* Libraries & Frameworks */}

  <h3 className="skill-title">
    Libraries & Frameworks
  </h3>

  <div className="skills-container">

    {
      skills
        .filter(skill => skill.category === "framework")
        .map((skill, index) => (

          <div key={index} className="skill-card">

            <img
              src={skill.logo}
              alt={skill.name}
              className="skill-logo"
            />

            <p>{skill.name}</p>

          </div>

        ))
    }

  </div>

  {/* Tools */}

  <h3 className="skill-title">
    Tools
  </h3>

  <div className="skills-container">

    {
      skills
        .filter(skill => skill.category === "tool")
        .map((skill, index) => (

          <div key={index} className="skill-card">

            <img
              src={skill.logo}
              alt={skill.name}
              className="skill-logo"
            />

            <p>{skill.name}</p>

          </div>

        ))
    }

  </div>

</section>
      {/* EXPERIENCE SECTION */}

      <section
        id="experience"
        className="experience-section"
      >

        <h2>Experience</h2>

        <div className="timeline">

          {
            experience.length > 0 ? (

              experience.map((job, index) => (

                <div
                  key={index}
                  className="timeline-item"
                >

                  <div className="content">

                    <h3>{job.title}</h3>

                    <h4 className="company">
                      {job.company}
                    </h4>

                    <p className="duration">
                      {job.duration}
                    </p>

                    <ul>

                      {
                        job.description &&
                        job.description.map((point, i) => (

                          <li key={i}>
                            {point}
                          </li>

                        ))
                      }

                    </ul>

                  </div>

                </div>

              ))

            ) : (

              <p>No experience found</p>

            )
          }

        </div>

      </section>

      {/* PROJECT SECTION */}

      <section id="projects" className="section">

  <h2 className="project-heading">
    Projects
  </h2>

  <div className="projects-container">

    {
      projects.map((project, index) => (

        <div key={index} className="project-card">

          <img
            src={project.image}
            alt={project.title}
            className="project-image"
          />

          <div className="project-content">

            <h3>{project.title}</h3>

            <ul className="project-description">

              {
                project.description.map((item, i) => (

                  <li key={i}>
                    {item}
                  </li>

                ))
              }

            </ul>

            <div className="project-links">

              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                Code
              </a>

              {/* <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
              >
                Live Demo
              </a> */}

            </div>

          </div>

        </div>

      ))
    }

  </div>

</section>
      {/* CONTACT SECTION */}

   {/* CONTACT SECTION */}

<section id="contact" className="section contact-section">

  <h2>Contact me</h2>

  <div className="contact-container">

    {/* LEFT BOX - FORM */}
    <div className="contact-box">
      <h3>Get in Touch</h3>
      <p>I'm always interested in hearing about new projects and opportunities.
</p>

      <form
        className="contact-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label>Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

        </div>

        <div className="form-group">

          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

        </div>

        <div className="form-group">

          <label>Message</label>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            rows="5"
            required
          ></textarea>

        </div>

        <button type="submit">
          Send Message
        </button>

      </form>

    </div>

    {/* RIGHT BOX - GET IN TOUCH */}
    <div className="contact-box info-box">

      <h3>Get in Touch</h3>

      <p>📧 Email</p>
      <span>maheshdevkota@example.com</span>

      <p>📍 Location</p>
      <span>Jumla, Nepal</span>

      <p>📞 Phone</p>
      <span>+977</span>

      <div className="social-links">

        <a href="https://github.com/Mahesh2059">GitHub</a>

      </div>

    </div>

  </div>

</section>
    </div>
  );
}

export default App;