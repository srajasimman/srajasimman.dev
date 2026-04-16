import resume from './data/resume.json'
import repos from './data/repos.json'
import Header from './components/Header.jsx'

export default function App() {
  const { basics } = resume
  return (
    <div className="bg-surface text-primary font-sans">
      <Header name={basics.name} profiles={basics.profiles} />
      <main>
        <p className="pt-20 px-6">{basics.name}</p>
      </main>
    </div>
  )
}
