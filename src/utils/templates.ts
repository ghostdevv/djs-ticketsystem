import crs from 'crypto-random-string';
import pupa from 'pupa';

export interface BaseTemplates extends Record<string, any> {
    id: string;
}

export const getTemplates = <T extends Record<string, any>>(base: T) => ({
    ...base,
    id: crs({ length: 6, characters: 'alphanumeric' }),
});

export const createTemplater = <T extends Record<string, any>>(base: T) => ({
    string: (str: string) => pupa(str, getTemplates(base)),

    // todo support deep finding of strings
    object: (object: Record<string, any>) => {
        for (const [key, value] of Object.entries(object))
            typeof value == 'string'
                ? (object[key] = pupa(value, getTemplates(base)))
                : '';

        return object;
    },
});
