import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useStoreTypes";


export const EventTable = () => {
    const { events } = useAppSelector(state => state.eventModule);
    const { farms } = useAppSelector(state => state.farmModule);
    const [eventsToShow, setEventsToShow] = useState<any[]>([]);


    useEffect(() => {
        if (events.length && farms.length) {
            setEventsToShow(getEventsToShow());
        }
    }, [events])


    const getEventsToShow = () => {
        return events.map(event => ({
            ...event,
            farmName: farms.find(farm => farm.eventsIds.includes(event.id))?.name
        }));
    }


    return (
        <div className="event-table-container">
            <DataTable
                value={eventsToShow}
                tableStyle={{ minWidth: '30rem' }}
            >
                <Column field="type" header="סוג האירוע" />
                <Column field="farmName" header="חווה" />
                <Column field="status" header="סטטוס" />
                <Column field="createdAt" header="נוצר ב-" />
                <Column field="completedAt" header="הסתיים ב-" />
            </DataTable>
        </div>
    )
}