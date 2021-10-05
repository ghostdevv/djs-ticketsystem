import crs from 'crypto-random-string';
import pupa from 'pupa';

export interface BaseTemplates extends Record<string, any> {
    id: string;
}

export const getTemplates = <T extends Record<string, any>>(base: T) => ({
    ...base,
    id: crs({ length: 6, characters: 'alphanumeric' }),
});

export const createTemplater = <T extends Record<string, any>>(base: T) => {
    const templates = getTemplates(base);

    const string = (str: string) => pupa(str, templates);

    const array = (array: any[]) =>
        array.map((item) =>
            typeof item == 'object' ? object(item) : string(item),
        );

    function object(ob: Record<string, any>) {
        for (const [key, value] of Object.entries(ob))
            switch (typeof value) {
                case 'string':
                    ob[key] = string(value);
                    break;

                case 'object':
                    ob[key] = object(value);
                    break;

                default:
                    ob[key] = Array.isArray(value) ? array(value) : '';
            }

        return ob;
    }

    return {
        deep: (item: any[] | Record<string, any>) =>
            Array.isArray(item) ? array(item) : object(item),

        string,
        object,
        array,

        templates,
    };
};
