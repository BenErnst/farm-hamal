import { EventTable } from "./EventTable"
import { FarmList } from "./FarmList"

export const Home = () => {
    return (
        <div className="home-container">
            <main>
                <EventTable />
                <FarmList />
                {/* <Dashboard /> */}
            </main>
            {/* <Map /> */}
        </div>
    )
}