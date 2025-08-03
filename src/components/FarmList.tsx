import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { ListBox } from 'primereact/listbox';
import { useState } from "react";
import { useAppSelector } from "../hooks/useStoreTypes";
import { MapService } from '../services/MapService';
import type { Event } from '../types/Event';
import type { Farm } from "../types/Farm";


export const FarmList = () => {
    const { farms } = useAppSelector(state => state.farmModule);
    const { events } = useAppSelector(state => state.eventModule);
    const [selectedFarm, setSelectedFarm] = useState<Farm[]>([]);


    const itemTemplate = (farm: Farm) => {
        const farmEvents = events.filter(event => farm.eventIds.includes(event.id));
        return (
            <div className='farm-item-template' onClick={() => MapService.zoomTo(farm.location)}>
                <header title={farm.type}>
                    <span>{farm.emoji}</span>
                    <strong>{farm.name}</strong>
                </header>
                <aside title={farm.farmer.phone}>
                    <Avatar image={farm.farmer.picURL} shape="circle" />
                    <span>{farm.farmer.name}</span>
                </aside>
                {getEventsCount(farmEvents)}
            </div>
        )
    }


    const getEventsCount = (farmEvents: Event[]) => {
        const pendingCount = farmEvents.length ? farmEvents.filter(event => event.status === 'pending').length : 0;
        const inProgressCount = farmEvents.length ? farmEvents.filter(event => event.status === 'inProgress').length : 0;
        const completedCount = farmEvents.length ? farmEvents.filter(event => event.status === 'completed').length : 0;
        return (
            <footer>
                <Badge value={pendingCount} severity="danger" title={'אירועים שטרם טופלו'} />
                <Badge value={inProgressCount} severity="warning" title={'אירועים בטיפול'} />
                <Badge value={completedCount} severity="success" title={'אירועים שטופלו'} />
            </footer>
        )
    }


    return (
        <div className="farm-list-container">
            <div>
                <span>{'חוות'}</span>
            </div>
            <ListBox
                options={farms}
                value={selectedFarm}
                onChange={(e) => setSelectedFarm(e.value)}
                optionLabel="name"
                itemTemplate={itemTemplate}
                className="w-full md:w-14rem"
            />
        </div>
    )
}