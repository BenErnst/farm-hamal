import { useEffect, useRef } from "react"
import "primereact/resources/themes/lara-dark-blue/theme.css";
import "primeicons/primeicons.css";
import { AppHeader } from './components/AppHeader'
import './assets/style/global.scss';
import { Home } from "./components/Home";
import { useAppDispatch } from "./hooks/useStoreTypes";
import { loadFarms } from "./store/actions/FarmActions";
import { loadEvents } from "./store/actions/EventActions";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { ToastService } from "./services/ToastService";


function App() {
  const dispatch = useAppDispatch();
  const toastRef = useRef<Toast>(null);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(loadFarms());
      await dispatch(loadEvents());
    };
    loadData();
    ToastService.setToastRef(toastRef);
  }, []);

  return (
    <main className='app-container'>
      <AppHeader />
      <Home />
      <ConfirmDialog />
      <Toast ref={toastRef} position="top-center" />
    </main>
  )
}

export default App;
