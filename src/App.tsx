import "primereact/resources/themes/lara-dark-blue/theme.css";
import { AppHeader } from './components/AppHeader'
import './assets/style/global.scss';
import { Home } from "./components/Home";


function App() {
  return (
    <main className='app-container'>
      <AppHeader />
      <Home />
    </main>
  )
}

export default App;
