import { useAppSelector } from "../hooks/useStoreTypes";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export const EntityList = () => {
    const { entities } = useAppSelector(state => state.entityModule);

    return (
        <div className="entity-list-container">
            {entities.length ? (
                entities.map(entity => (
                    <DataTable value={[entity]} tableStyle={{ margin: '7px 0' }} showGridlines key={entity.id}>
                        {Object.keys(entity).filter(key => key !== 'id').map(field => (
                            <Column field={field} header={field}></Column>
                        ))}
                    </DataTable>
                ))
            ) : null}
        </div>
    )
}