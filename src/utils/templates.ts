import crs from 'crypto-random-string';
import pupa from 'pupa';

export interface BaseTemplates extends Record<string, any> {
    id: string;
}

export const createTemplater =
    <T extends Record<string, any>>(base: T) =>
    (str: string) => {
        const templates: BaseTemplates = {
            ...base,
            id: crs({ length: 6, characters: 'alphanumeric' }),
        };

        return pupa(str, templates);
    };
