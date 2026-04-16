import resume from './data/resume.json'
import repos from './data/repos.json'

export default function App() {
  return (
    <div className="bg-surface text-primary font-sans">
      <main>{resume.basics.name}</main>
    </div>
  )
}
