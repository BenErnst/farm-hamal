import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';


export const Draggable = (props) => {
    const { id } = props;
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
    const style = { transform: CSS.Translate.toString(transform) };


    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </button>
    );
}
