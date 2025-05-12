import { useState } from "react";
import type { Element } from "../types/Element";
import { CustomForm } from "./CustomForm";
import { ElementsPanel } from "./ElementsPanel";
import { EntityList } from "./EntityList";


export const Home = () => {
    const [currElements, setCurrElements] = useState<Element[]>([]);

    return (
        <div className="home-container">
            <main>
                <ElementsPanel
                    setCurrElements={setCurrElements}
                />
                <CustomForm
                    currElements={currElements}
                    setCurrElements={setCurrElements}
                />
                <EntityList />
            </main>
        </div>
    );
};
