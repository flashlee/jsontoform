import { ChangeEvent, FC, useState, useContext } from 'react';
import { contentWindowContext } from './TabsContainer';
import { validateFormSchema } from '../utils/SchemaValidator';
import Ajv from 'ajv';
import jsonSchema from '../schemas/FormSchema.json';
import { FormSchema } from '../interfaces/FormSchema';

export const ConfigTab: FC = () => {
    const { jsonEditorText, formSchema, updateSchema, updateEditorText } = useContext(contentWindowContext);
    const [ text, setText ] = useState(jsonEditorText);

    const textChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let prettyJSON = undefined;
        const editorText = event.currentTarget?.value;
        updateEditorText(editorText);
        try {
            const obj = JSON.parse(editorText);
            prettyJSON = JSON.stringify(obj, null, 2);
        }
        catch(e) {}
        setText(prettyJSON ? prettyJSON : editorText);
    };

    const applyButtonHandler = () => {
        const ajv = new Ajv();
        let formSchemaFromJSON: FormSchema;
        try {
            formSchemaFromJSON = JSON.parse(text);
            if (ajv.validate(jsonSchema, formSchemaFromJSON)) 
                updateSchema(formSchemaFromJSON);
            else alert(ajv.errorsText(ajv.errors, {separator: "/", dataVar: "{}"}))
        }
        catch(e) {
            console.log(e);
            alert('Entered text is not valid JSON format');
        }
    };
    /**
     * Alternatively custom JSON validation can be used
     */
    // const applyButtonHandler = () => {
    //     let formSchemaFromJSON: FormSchema;
    //     try {
    //         formSchemaFromJSON = JSON.parse(text);
    //         if (validateFormSchema(formSchemaFromJSON)) updateSchema(formSchemaFromJSON);
    //     } catch(e) {
    //         if(e instanceof SyntaxError) {
    //             console.log(e);
    //             alert('Entered text is not valid JSON format');
    //         } else alert((e as Error).message);
    //     }
    // };

    return (
        <div id='ConfigTab'>
            <textarea id="JSONEditor" placeholder='Put your form schema here' wrap='off' value={text} onChange={textChangeHandler}/>
            <button id="applyButton" onClick={applyButtonHandler}>Apply</button>
        </div>
    );
};
