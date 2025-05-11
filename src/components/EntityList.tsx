import { useAppSelector } from "../hooks/useStoreTypes";



export const EntityList = () => {
    const { entities } = useAppSelector(state => state.entityModule);


    return (
        <div className="entity-list-container">
            {entities.length ? <pre>{JSON.stringify(entities, null, 2)}</pre> : null}
        </div>
    )
}