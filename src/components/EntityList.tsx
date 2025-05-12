import { useAppSelector } from "../hooks/useStoreTypes";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import type { Entity } from "../types/Entity";


export const EntityList = () => {
    const { entities } = useAppSelector(state => state.entityModule);

    const getFieldsToShow = (entity: Entity) => {
        return Object.keys(entity).filter(key => key !== 'id');
    }

    return (
        <div className="entity-list-container">
            {entities.length ? (
                entities.map(entity => (
                    <DataTable value={[entity]} tableStyle={{ margin: '7px 0' }} showGridlines key={entity.id}>
                        {getFieldsToShow(entity).map(field => <Column field={field} header={field} />)}
                    </DataTable>
                ))
            ) : null}
        </div>
    )
}