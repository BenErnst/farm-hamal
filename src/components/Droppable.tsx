import { useDroppable } from "@dnd-kit/core";


export const Droppable = (props) => {
    const { id } = props;
    const { isOver, setNodeRef } = useDroppable({ id });
    const style = { opacity: isOver ? 1 : 0.5, };

    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );

}

