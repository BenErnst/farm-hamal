import { MultiSelect } from "primereact/multiselect";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useStoreTypes";
import { setEventFilterBy } from "../store/actions/EventActions";


interface Props {
    field: string
    events: any[]
}


export const FilterBy = (props: Props) => {
    const { field, events } = props;
    const dispatch = useAppDispatch();
    const filterBy = useAppSelector(state => state.eventModule.filterBy);

    // Get unique values for this field from all events
    const fieldOptions = useMemo(() => {
        const uniqueValues = [...new Set(events.map(event => event[field]).filter(Boolean))];
        return uniqueValues.map(value => ({ label: value, value }));
    }, [events, field]);

    // Get current filter values for this field
    const currentValues = filterBy[field as keyof typeof filterBy] || [];

    const handleFilterChange = (selectedValues: string[]) => {
        dispatch(setEventFilterBy({ [field]: selectedValues }));
    };

    return (
        <div className="filter-by-container">
            <MultiSelect
                options={fieldOptions}
                value={currentValues}
                onChange={(e) => handleFilterChange(e.value)}
                optionLabel="label"
                optionValue="value"
                placeholder={'סנן לפי'}
                className="p-column-filter"
                style={{ minWidth: '5rem' }}
            />
        </div>
    )
}