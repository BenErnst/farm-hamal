import { ListBox } from 'primereact/listbox';
import { useState } from "react";
import { useAppSelector } from "../hooks/useStoreTypes";
import type { Farm } from "../types/farm";


export const FarmList = () => {
    const { farms } = useAppSelector(state => state.farmModule);
    const [selectedFarm, setSelectedFarm] = useState<Farm[]>([]);

    return (
        <div className="farm-list-container">
            <ListBox
                options={farms}
                value={selectedFarm}
                onChange={(e) => setSelectedFarm(e.value)}
                optionLabel="name"
                // itemTemplate={itemTemplate}
                className="w-full md:w-14rem"
                listStyle={{ maxHeight: '500px' }}
            />
        </div>
    )
}