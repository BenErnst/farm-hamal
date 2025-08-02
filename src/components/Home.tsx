import { EventTable } from "./EventTable"
import { FarmList } from "./FarmList"
import { FarmMap } from "./FarmMap"

export const Home = () => {
    return (
        <div className="home-container">
            <main>
                <EventTable />
                <FarmList />
                {/* <Dashboard /> */}
            </main>
            <FarmMap />
        </div>
    )
}