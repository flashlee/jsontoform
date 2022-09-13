import { FC, ReactElement, createContext, useState, useRef } from 'react';
import { ConfigTab } from './ConfigTab';
import { ResultTab } from './ResultTab';
import { FormSchema } from '../interfaces/FormSchema';

const exampleFormSchema = JSON.stringify({
  "items": [
    {
      "label": "Number Field",
      "type": "number"
    },
    {
      "label": "Text Field",
      "type": "text"
    },
    {
      "label": "Text Area",
      "type": "textarea"
    },
    {
      "label": "Check Box",
      "type": "checkbox"
    },
    {
      "label": "Date Field",
      "type": "date"
    },
    {
      "label": "Radio Buttons",
      "type": "radio",
      "radioLabels": ["Foo", "Bar"]
    }
  ],
  "buttons": [
    "Cancel",
    "Save"
  ],
  "formTitle": "My Form"
}, null, 2);

export interface ContentWindowContext {
    jsonEditorText: string;
    formSchema: FormSchema;
    updateSchema: (schema: FormSchema) => void;
    updateEditorText: (text: string) => void;
}

export const contentWindowContext = createContext<ContentWindowContext>({
    jsonEditorText: exampleFormSchema,
    formSchema: {},
    updateSchema: (schema) => {},
    updateEditorText: (text) => {},
});

function renderContent(isConfig: boolean): ReactElement {
    return (isConfig ? <ConfigTab /> : <ResultTab />)
}; 

export const TabsContainer: FC = () => {
    const [ isConfig, setIsConfig ] = useState(true);
    const [ formSchema, setFormSchema ] = useState<FormSchema>({});
    const [ jsonEditorText, setJsonEditorText ] = useState(exampleFormSchema);
    const schemaIsReady = useRef(false);

    return (
        <div id="TabsContainer">
            <ul id="navBar">
                <li className={isConfig ? "active" : ""} onClick={() => setIsConfig(true)}>Config</li>
                <li className={!isConfig ? "active" : schemaIsReady.current ? "ready" : "" } onClick={() => { schemaIsReady.current = false; setIsConfig(false); }}>Result</li>
            </ul>
            <div id="contentWindow">
                <contentWindowContext.Provider value={{
                    jsonEditorText,
                    formSchema,
                    updateSchema: (schema) => {
                        schemaIsReady.current = true;
                        setFormSchema(schema);
                    },
                    updateEditorText: (text) => {
                        schemaIsReady.current = false;
                        setJsonEditorText(text);
                    }
                }}>
                    {renderContent(isConfig)}
                </contentWindowContext.Provider>
            </div>
        </div>
    );
};
