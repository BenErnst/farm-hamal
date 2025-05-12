import { Toolbar } from 'primereact/toolbar';

export const AppHeader = () => {
    return (
        <Toolbar
            className="app-header-container"
            center={<h1>{'Custom Form App'}</h1>}
        />
    )
}