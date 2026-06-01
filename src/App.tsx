import "primeicons/primeicons.css";
import { ConfirmDialog } from "primereact/confirmdialog";
import "primereact/resources/themes/lara-dark-blue/theme.css";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import "./assets/style/global.scss";
import { AppHeader } from "./components/AppHeader";
import { Home } from "./components/Home";
import { useAppDispatch } from "./hooks/useStoreTypes";
import { ToastService } from "./services/ToastService";
import { loadEvents } from "./store/actions/EventActions";
import { loadFarms } from "./store/actions/FarmActions";

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
    <main className="app-container">
      <AppHeader />
      <Home />
      <ConfirmDialog />
      <Toast ref={toastRef} position="top-center" />
    </main>
  );
}

export default App;
