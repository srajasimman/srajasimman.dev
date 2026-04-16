import resume from './data/resume.json'
import repos from './data/repos.json'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'

export default function App() {
  const { basics } = resume
  return (
    <div className="bg-surface text-primary font-sans">
      <Header name={basics.name} profiles={basics.profiles} />
      <main>
        <Hero basics={basics} />
      </main>
    </div>
  )
}
