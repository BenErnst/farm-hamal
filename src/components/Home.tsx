import { EventTable } from "./EventTable"
import { FarmList } from "./FarmList"
import { FarmMap } from "./FarmMap"

export const Home = () => {
    return (
        <div className="home-container">
            <main>
                <FarmList />
                <EventTable />
                {/* <Dashboard /> */}
            </main>
            <FarmMap />
        </div>
    )
}