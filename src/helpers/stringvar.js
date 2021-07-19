module.exports = (string = '', config) => {
    config = Object.assign({}, config);

    var obj = typeof string == 'object';

    if (obj) string = JSON.stringify(string);

    [...new Set(string.match(/\{[^{}]+\}/g))]
        .map((v) => v.slice(1, -1))
        .forEach((v) => {
            if (config[v])
                string = string.replace(new RegExp(`{${v}}`, 'g'), config[v]);
        });

    return obj ? JSON.parse(string) : string;
};
