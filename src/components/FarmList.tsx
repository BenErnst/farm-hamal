import { ListBox } from 'primereact/listbox';
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useStoreTypes";
import type { Farm } from "../types/farm";


export const FarmList = () => {
    const { farms } = useAppSelector(state => state.farmModule);
    const [selectedFarm, setSelectedFarm] = useState<Farm[]>([]);
    const [groupedFarms, setGroupedFarms] = useState<any[]>([]);


    useEffect(() => {
        if (farms.length) {
            setGroupedFarms(getGroupedFarms());
        }
    }, [farms]);


    const getGroupedFarms = () => {
        const regions = farms.map(farm => farm.region);
        const uniqueRegions = [...new Set(regions)];
        return uniqueRegions.map(region => {
            const regionFarms = farms.filter(farm => farm.region === region);
            return {
                label: region,
                items: regionFarms
            }
        });
    }


    return (
        <div className="farm-list-container">
            <ListBox
                value={selectedFarm}
                onChange={(e) => setSelectedFarm(e.value)}
                options={groupedFarms}
                optionLabel="name"
                optionGroupLabel="label"
                optionGroupChildren="items"
                // optionGroupTemplate={groupTemplate}
                // itemTemplate={itemTemplate}
                className="w-full md:w-14rem"
                listStyle={{ maxHeight: '500px' }}
            />
        </div>
    )
}