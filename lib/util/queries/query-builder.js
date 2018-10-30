const buildArrayType = (query, name) => {
    const list = query[name];
    const type = query[`${name}SearchType`];

    if(list && type === 'including') {
        return { $all: list.split(',') };
    }

    if(list && type === 'or') {
        return { $in: list.split(',') };
    }

    if(list && type === 'and') {
        return { $all: list.split(',') };
    }

    if(list && type === 'not') {
        return { $nin: list.split(',') };
    }
};

const buildMinMax = (query, name) => {
    const camelName = name.charAt(0).toUpperCase() + name.slice(1);

    const min = query[`min${camelName}`];
    const max = query[`max${camelName}`];

    if(min || max) {
        const build = {};
        if(min) {
            build['$gte'] = parseInt(min);
        }

        if(max) {
            build['$lte'] = parseInt(max);
        }

        return build;
    }

    return;
};

const buildBoolean = (query, name) => query[name] ? query[name] === 'true' : undefined;

const buildIdentity = (query, name) => query[name];

const builder = (query, toBuild) => {
    return toBuild.reduce((acc, q) => {
        const { name, fn, key = name } = q;
        const val = fn(query, name);
        if(val !== undefined) {
            acc[key] = val;
        }
        return acc;
    }, {});
};

module.exports = {
    buildArrayType,
    buildMinMax,
    buildBoolean,
    buildIdentity,
    builder
};
