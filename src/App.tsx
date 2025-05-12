import "primereact/resources/themes/lara-dark-blue/theme.css";
import { AppHeader } from './components/AppHeader'
import { Home } from './components/Home'
import './assets/style/global.scss';


function App() {
  return (
    <main className='app-container'>
      <AppHeader />
      <Home />
    </main>
  )
}

export default App
