import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { SelectButton } from 'primereact/selectbutton';
import { Tag } from 'primereact/tag';
import { useEffect, useState, type MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from "../hooks/useStoreTypes";
import { MapService } from '../services/MapService';
import { ToastService } from '../services/ToastService';
import { UtilService } from '../services/UtilService';
import { removeEvent, updateEvent } from '../store/actions/EventActions';
import { selectEnrichedEvents, selectFilteredEvents } from '../store/selectors/eventSelectors';
import type { EnrichedEvent, Event } from '../types/Event';
import { FilterBy } from './FilterBy';


export const EventTable = () => {
    const dispatch = useAppDispatch();
    const eventsToShow = useAppSelector(selectFilteredEvents);
    const allEnrichedEvents = useAppSelector(selectEnrichedEvents);
    const [selectedEvent, setSelectedEvent] = useState<EnrichedEvent | null>(null);
    const { he } = UtilService;
    const statusOptions = [
        {
            label: <Tag value={he.eventStatus.pending} severity="danger" />,
            value: 'pending'
        },
        {
            label: <Tag value={he.eventStatus.inProgress} severity="warning" />,
            value: 'inProgress'
        },
        {
            label: <Tag value={he.eventStatus.completed} severity="success" />,
            value: 'completed'
        }
    ];


    useEffect(() => {
        if (selectedEvent) {
            MapService.zoomTo(selectedEvent.location);
        }
    }, [selectedEvent])


    const tableHeader = () => {
        return (
            <div className='table-header-container'>
                <span>{`אירועים`}</span>
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


    const openRemoveDialog = (ev: MouseEvent<HTMLButtonElement>, event: EnrichedEvent) => {
        ev.stopPropagation();
        confirmDialog({
            message: `האם למחוק את האירוע "${event.type}" ב-${event.farmName}?`,
            header: 'מחיקת אירוע',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'מחק',
            rejectLabel: 'בטל',
            accept: async () => {
                try {
                    await dispatch(removeEvent(event.id));
                    setSelectedEvent(null);
                    ToastService.showSuccessMsg('האירוע נמחק בהצלחה.');
                } catch (err) {
                    ToastService.showErrorMsg('אירעה שגיאה במחיקת האירוע.');
                    throw err;
                }
            }
        });
    }


    const statusBodyTemplate = (event: EnrichedEvent) => {
        return (
            <SelectButton
                value={event.status}
                options={statusOptions}
                onChange={(e) => handleStatusChange(event, e.value)}
            />
        );
    };


    const handleStatusChange = (event: Event, newStatus: Event['status']) => {
        const eventToUpdate = {
            ...event,
            status: newStatus,
            completedAt: newStatus === 'completed' ? Date.now() : null
        };
        dispatch(updateEvent(eventToUpdate));
    };


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
                onSelectionChange={(e) => setSelectedEvent(e.value as EnrichedEvent | null)}
                tableStyle={{ minWidth: '30rem' }}
                emptyMessage="אין אירועים להצגה"
                size='small'
            >
                <Column field="type" header="סוג האירוע" sortable filter filterElement={getFilterElement} />
                <Column field="farmName" header="חווה" sortable filter filterElement={getFilterElement} />
                <Column field="status" header="סטטוס" body={statusBodyTemplate} sortable filter filterElement={getFilterElement} />
                <Column field="createdAt" header="נוצר" body={dateBodyTemplate('createdAt')} sortable />
                <Column field="completedAt" header="טופל" body={dateBodyTemplate('completedAt')} sortable />
                <Column body={(event) => <Button
                    type="button"
                    icon="pi pi-trash"
                    rounded
                    severity='secondary'
                    size='small'
                    onClick={(nativeEvent) => openRemoveDialog(nativeEvent, event)}
                />} />
            </DataTable>
        </div>
    )
}