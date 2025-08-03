import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Tag, type TagProps } from 'primereact/tag';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../hooks/useStoreTypes";
import { UtilService } from '../services/UtilService';
import { removeEvent } from '../store/actions/EventActions';
import type { Event } from '../types/Event';
import { FilterBy } from './FilterBy';
import { selectEnrichedEvents, selectFilteredEvents } from '../store/selectors/eventSelectors';


export const EventTable = () => {
    const dispatch = useAppDispatch();
    const eventsToShow = useAppSelector(selectFilteredEvents);
    const allEnrichedEvents = useAppSelector(selectEnrichedEvents);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const { he, statusSeverityMap } = UtilService;


    const tableHeader = () => {
        return (
            <div className='table-header-container'>
                <section>
                    <span>{`אירועים`}</span>
                </section>
                <section>
                    <Button
                        type="button"
                        icon="pi pi-trash"
                        rounded
                        severity='danger'
                        disabled={!selectedEvent}
                        tooltip="מחק אירוע"
                        onClick={openRemoveDialog}
                    />
                </section>
            </div>
        )
    }


    const tableFooter = () => {
        if (eventsToShow.length) {
            const openEvents = eventsToShow.filter(event => {
                const isPending = event.status === 'pending';
                const isInProgress = event.status === 'inProgress';
                return isPending || isInProgress;
            });
            const msg = getFooterMsg(openEvents.length);
            return (
                <div>
                    <span>{msg}</span>
                </div>
            );
        }
    }


    const getFooterMsg = (length: number) => {
        const noOpenEvents = 'אין אירועים פתוחים';
        const oneOpenEvent = 'יש אירוע פתוח אחד';
        const multipleOpenEvents = (length: number) => `יש ${length} אירועים פתוחים`;
        if (length === 0) {
            return noOpenEvents;
        };
        if (length === 1) {
            return oneOpenEvent;
        };
        return multipleOpenEvents(length);
    }


    const openRemoveDialog = () => {
        confirmDialog({
            message: `האם למחוק את האירוע "${selectedEvent.type}" ב-${selectedEvent.farmName}?`,
            header: 'מחיקת אירוע',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'מחק',
            rejectLabel: 'בטל',
            accept: () => {
                dispatch(removeEvent(selectedEvent.id));
                setSelectedEvent(null);
            }
        });
    }


    const statusBodyTemplate = (event: Event) => {
        const severity = statusSeverityMap[event.status] as TagProps['severity'];
        const hebrewStatus = he.eventStatus[event.status];
        return <Tag value={hebrewStatus} severity={severity} />;
    }


    const dateBodyTemplate = (field: 'createdAt' | 'completedAt') => {
        return (event: Event) => {
            const timestamp = event[field];
            if (!timestamp) {
                return '-'
            };
            const date = new Date(timestamp);
            return date.toLocaleDateString('he-IL', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        };
    }


    const getFilterElement = ({ field }: { field: string }) => {
        return <FilterBy
            field={field}
            events={allEnrichedEvents}
        />
    };


    return (
        <div className="event-table-container">
            <DataTable
                value={eventsToShow}
                header={tableHeader()}
                footer={tableFooter()}
                showGridlines
                filterDisplay="row"
                selectionMode="single"
                selection={selectedEvent}
                onSelectionChange={(e) => setSelectedEvent(e.value)}
                tableStyle={{ minWidth: '30rem' }}
                emptyMessage="אין אירועים להצגה"
            >
                <Column field="type" header="סוג האירוע" sortable filter filterElement={getFilterElement} />
                <Column field="farmName" header="חווה" sortable filter filterElement={getFilterElement} />
                <Column field="status" header="סטטוס" body={statusBodyTemplate} sortable filter filterElement={getFilterElement} />
                <Column field="createdAt" header="נוצר ב-" body={dateBodyTemplate('createdAt')} sortable />
                <Column field="completedAt" header="הסתיים ב-" body={dateBodyTemplate('completedAt')} sortable />
                {/* <Column field="location.lng" header="lng" />
                <Column field="location.lat" header="lat" /> */}
            </DataTable>
        </div>
    )
}