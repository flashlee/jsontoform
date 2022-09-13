/**
  *
  * @additionalProperties false
  */
export interface FormSchema {
    items?: FormElementSchema[];
    formTitle?: string;
    /**
     *
     * @maxItems 4
    */
    buttons?: string[];
}


export interface FormElementSchema  {
    label: string;
    type: FormElementEnum;
    /**
     *
     * @maxItems 4
    */
    radioLabels?: string[];
}

export enum FormElementEnum {
    NUMBER = 'number',
    TEXT = 'text',
    TEXTAREA = 'textarea',
    CHECKBOX = 'checkbox',
    DATE = 'date',
    RADIO = 'radio' 
}