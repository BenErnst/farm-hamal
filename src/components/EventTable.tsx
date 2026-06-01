import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { DataTable, type DataTableRowClickEvent } from "primereact/datatable";
import { SelectButton } from "primereact/selectbutton";
import { Tag } from "primereact/tag";
import { type MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useStoreTypes";
import { MapService } from "../services/MapService";
import { ToastService } from "../services/ToastService";
import { UtilService } from "../services/UtilService";
import { removeEvent, updateEvent } from "../store/actions/EventActions";
import type { EnrichedEvent, Event } from "../types/Event";
import { selectEnrichedEvents } from "../store/selectors/EventSelectors";

export const EventTable = () => {
  const dispatch = useAppDispatch();
  const eventsToShow = useAppSelector(selectEnrichedEvents);
  const { he } = UtilService;
  const statusOptions = [
    {
      label: <Tag value={he.eventStatus.pending} severity="danger" />,
      value: "pending",
    },
    {
      label: <Tag value={he.eventStatus.inProgress} severity="warning" />,
      value: "inProgress",
    },
    {
      label: <Tag value={he.eventStatus.completed} severity="success" />,
      value: "completed",
    },
  ];

  const handleRowClick = (clickEv: DataTableRowClickEvent) => {
    const event = clickEv.data as EnrichedEvent;
    MapService.zoomTo(event.location);
  };

  const tableHeader = () => {
    return (
      <div className="table-header-container">
        <span>{`אירועים`}</span>
      </div>
    );
  };

  const tableFooter = () => {
    if (eventsToShow.length) {
      const openEvents = eventsToShow.filter((event) => {
        const isPending = event.status === "pending";
        const isInProgress = event.status === "inProgress";
        return isPending || isInProgress;
      });
      const msg = getFooterMsg(openEvents.length);
      return (
        <div>
          <span>{msg}</span>
        </div>
      );
    }
  };

  const getFooterMsg = (length: number) => {
    const noOpenEvents = "אין אירועים פתוחים";
    const oneOpenEvent = "יש אירוע פתוח אחד";
    const multipleOpenEvents = (length: number) =>
      `יש ${length} אירועים פתוחים`;
    if (length === 0) {
      return noOpenEvents;
    }
    if (length === 1) {
      return oneOpenEvent;
    }
    return multipleOpenEvents(length);
  };

  const openRemoveDialog = (
    ev: MouseEvent<HTMLButtonElement>,
    event: EnrichedEvent,
  ) => {
    ev.stopPropagation();
    const farmName = event.farmName ? `ב-${event.farmName}` : "";
    confirmDialog({
      header: "מחיקת אירוע",
      message: `האם למחוק את האירוע "${event.type}" ${farmName}?`,
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "מחק",
      rejectLabel: "בטל",
      accept: async () => {
        try {
          await dispatch(removeEvent(event.id));
          ToastService.showSuccessMsg("האירוע נמחק בהצלחה.");
        } catch (err) {
          ToastService.showErrorMsg("אירעה שגיאה במחיקת האירוע.");
          throw err;
        }
      },
    });
  };

  const statusBodyTemplate = (event: EnrichedEvent) => {
    return (
      <SelectButton
        value={event.status}
        options={statusOptions}
        onChange={(e) => handleStatusChange(event, e.value)}
      />
    );
  };

  const handleStatusChange = (event: Event, newStatus: Event["status"]) => {
    const eventToUpdate = {
      ...event,
      status: newStatus,
      updatedAt: Date.now(),
    };
    dispatch(updateEvent(eventToUpdate));
  };

  const dateBodyTemplate = (field: "createdAt" | "updatedAt") => {
    return (event: Event) => {
      const timestamp = event[field];
      if (timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString("he-IL", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    };
  };

  return (
    <div className="event-table-container">
      <DataTable
        value={eventsToShow}
        header={tableHeader()}
        footer={tableFooter()}
        showGridlines
        selectionMode="single"
        onRowClick={handleRowClick}
        emptyMessage="אין אירועים להצגה"
        size="small"
        scrollable
        scrollHeight="flex"
      >
        <Column field="type" header="סוג האירוע" sortable />
        <Column field="farmName" header="חווה" sortable />
        <Column
          field="status"
          header="סטטוס"
          body={statusBodyTemplate}
          sortable
        />
        <Column
          field="createdAt"
          header="נוצר"
          body={dateBodyTemplate("createdAt")}
          sortable
        />
        <Column
          field="updatedAt"
          header="עודכן"
          body={dateBodyTemplate("updatedAt")}
          sortable
        />
        <Column
          body={(event) => (
            <Button
              type="button"
              icon="pi pi-trash"
              rounded
              outlined
              severity="secondary"
              size="small"
              onClick={(nativeEvent) => openRemoveDialog(nativeEvent, event)}
            />
          )}
        />
      </DataTable>
    </div>
  );
};
