import resume from './data/resume.json'
import repos from './data/repos.json'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Repos from './components/Repos.jsx'
import References from './components/References.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const { basics, work, skills, projects, references } = resume
  return (
    <div className="bg-surface text-primary font-sans">
      <Header name={basics.name} profiles={basics.profiles} />
      <main>
        <Hero basics={basics} />
        <About summary={basics.summary} />
        <Skills skills={skills} />
        <Experience work={work} />
        <Projects projects={projects} />
        <Repos repos={repos} />
        <References references={references} />
        <Contact basics={basics} />
      </main>
      <Footer name={basics.name} />
    </div>
  )
}
