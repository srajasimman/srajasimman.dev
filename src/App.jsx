import resume from './data/resume.json'
import repos from './data/repos.json'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'

export default function App() {
  const { basics } = resume
  return (
    <div className="bg-surface text-primary font-sans">
      <Header name={basics.name} profiles={basics.profiles} />
      <main>
        <Hero basics={basics} />
        <About summary={basics.summary} />
        <Skills skills={resume.skills} />
        <Experience work={resume.work} />
      </main>
    </div>
  )
}
