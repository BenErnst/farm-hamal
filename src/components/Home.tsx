import { Dashboard } from "./Dashboard"
import { EventTable } from "./EventTable"
import { FarmList } from "./FarmList"
import { FarmMap } from "./FarmMap"

export const Home = () => {
    return (
        <div className="home-container">
            <main>
                <FarmList />
                <EventTable />
            </main>
            <section className="map-dashboard-conatiner">
                <FarmMap />
                <Dashboard />
            </section>
        </div>
    )
}