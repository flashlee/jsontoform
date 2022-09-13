/**
 * It wasn't specified in the task if JSON validation should be implemented, so I decided to use AJV + JSON Schema for this purpose.
 * But just in case using of 3rd party libriries wasn't allowed - ts type guard was implmented to validate input JSON.
 */

import { FormSchema, FormElementSchema, FormElementEnum } from "../interfaces/FormSchema";

export function validateFormSchema(formSchema: unknown): formSchema is FormSchema {
    if (!formSchema) return true;
    const testFormSchema = formSchema as FormSchema;
    for (let key in testFormSchema) {
        if (key !== 'items' && key !== 'formTitle' && key !== 'buttons') throw Error(`"${key}" ins't valid Form Schema propperty. Only properties "items", "formtTitle", "buttons" are allowed.`);
    };
    if (testFormSchema.formTitle && (typeof testFormSchema.formTitle) !== 'string') throw Error('"formTitle" should be of type string');
    return validateItems(testFormSchema.items) && validateButtons(testFormSchema.buttons);
};

function validateItems(items: unknown): items is FormElementSchema[] {
    if (!items) return true;
    if (!Array.isArray(items)) throw Error('"items" should be an array of element schemas');
    const testItems = items as FormElementSchema[];
    try {
        for (const item of Object.values(testItems))
            validateElementSchema(item)
    } catch(e) {
        throw e;
    }
    return true;
};

function validateElementSchema (elementSchema: unknown): elementSchema is FormElementSchema {
    const testElementSchema = elementSchema as FormElementSchema;
    const { label, type, radioLabels } = testElementSchema;
    if (Object.keys(testElementSchema).length > 3) throw Error('Element schema should contain only 2 properties: "label" and "type"');
     for (let key in testElementSchema ) {
        if (key !== "label" && key !== "type" && key !== "radioLabels") throw Error(`"${key}" ins't valid Element Schema property. Properties "label" and "type" are required`);
    }
    if (!label || !type) throw Error('Element Schema is required to contain both "label" and "type" properties');
    if (typeof label !== 'string') throw Error('"label" property should be of type string');
    try {
        if (validateElementSchemaType(type))
            if (type === FormElementEnum.RADIO) validateRadioLabels(radioLabels);
    } catch(e) {
        throw e;
    }
    return true;
};

function validateElementSchemaType(elementType: unknown): elementType is FormElementEnum {
    if (Object.values(FormElementEnum).includes(elementType as FormElementEnum)) return true
    else throw Error(`Type "${elementType}" isn't valid type of element schema`);
}

function validateRadioLabels(radioLabels: unknown): radioLabels is string[] {
    if (!radioLabels) throw Error('Element with type "radio" should be provided with property "radioLabels" - array of strings');
    try {
        validateArrayOfString(radioLabels as string[], 4, 'radioLabels');
    } catch (e) {
        throw e;
    }
    return true;
};

function validateButtons(buttons: unknown): buttons is string[] {
    if (!buttons) return true;
    try {
        validateArrayOfString(buttons as string[], 4, 'buttons');
    } catch (e) {
        throw e;
    }
    return true;
};

function validateArrayOfString(array: unknown[], maxSize: number, propName: string): array is string[] {
    if (!Array.isArray(array)) throw Error(`"${propName}" should be an array of strings`);
    if (array.length > maxSize) throw Error(`"${propName}" should have maximum size of ${maxSize} items`)
    for (let arrayItem of (array as string[])) {
        if ((typeof arrayItem) !== 'string') throw Error(`"${propName}" should be an array of strings`);
    }
    return true;
}
