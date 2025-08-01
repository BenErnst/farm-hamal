import { useEffect } from "react"
import "primereact/resources/themes/lara-dark-blue/theme.css";
import { AppHeader } from './components/AppHeader'
import './assets/style/global.scss';
import { Home } from "./components/Home";
import { useAppDispatch } from "./hooks/useStoreTypes";
import { loadFarms } from "./store/actions/FarmActions";
import { loadEvents } from "./store/actions/EventActions";


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadFarms());
    dispatch(loadEvents());
  }, []);

  return (
    <main className='app-container'>
      <AppHeader />
      <Home />
    </main>
  )
}

export default App;
