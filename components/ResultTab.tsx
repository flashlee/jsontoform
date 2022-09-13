import { FC, useContext, ReactElement } from 'react';
import { contentWindowContext } from './TabsContainer';
import { FormElementSchema, FormElementEnum } from '../interfaces/FormSchema';


function getElement(elementSchema: FormElementSchema): ReactElement {
    const { type, label } = elementSchema;
    switch (type) {
        case 'number': {
            return (
                <div className='viewRow'>
                    <div className='viewLabel'><label>{label}</label></div>
                    <div className='viewElement'><input type='number' /></div>
                </div>
            );
        }
        case 'text': {
            return (
                <div className='viewRow'>
                    <div className='viewLabel'><label>{label}</label></div>
                    <div className='viewElement'><input type='text' /></div>
                </div>
            );
        }
        case 'textarea': {
            return (
                <div className='viewRow'>
                    <div className='viewLabel'><label>{label}</label></div>
                    <div className='viewElement'><textarea className='textareaElement'/></div>
                </div>
            );
        }
        case 'checkbox': {
            return (
                <div className='viewRow'>
                    <div className='viewLabel'><label>{label}</label></div>
                    <div className='viewElement'><input type='checkbox' /></div>
                </div>
            );
        }
        case 'date': {
            return (
                <div className='viewRow'>
                    <div className='viewLabel'><label>{label}</label></div>
                    <div className='viewElement'><input type='date' /></div>
                </div>
            );
        }
        case 'radio': {
            const radioLabels = elementSchema.radioLabels ?? ['Radio'];
            return (
                <div className='viewRow'>
                    <div className='viewLabel'><label>{label}</label></div>
                    <div className='viewElement'>
                        {radioLabels.map((radioLabel) => (
                            <>
                                <label>{radioLabel}</label>
                                <input type='radio' name='radioelement' className='radioButton'/>
                            </>
                        ))}
                    </div>
                </div>
            );
        }
        default: {
            return (<div>Form has no elements here</div>);
        }
    }
};

export const ResultTab: FC = () => {
    const { formSchema } = useContext(contentWindowContext);
    const formItems = formSchema.items?.length ? formSchema.items : [];
    const buttonsLabels = formSchema.buttons?.length ? formSchema.buttons : [];
    const { formTitle } = formSchema;
    return (
        formItems.length ?
            <form id='elementsContainer' onSubmit={e => { e.preventDefault(); }}>
                <fieldset>
                    <legend>{formTitle ? formTitle : 'Genereted Form'}</legend>
                    <div className='viewTable'>{formItems.map(item => getElement(item))}</div>
                    <div id="buttonsContainer">{buttonsLabels.map((label, index) => <button className='formButton' key={index} onClick={() => {}}>{label}</button>)}</div>
                </fieldset>
            </form>
            :
        <div>No form here yet</div>
    );
};
