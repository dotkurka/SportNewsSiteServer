interface IFilterUndefinedFields {
    [key: string]: string | undefined;
}

const filterUndefinedFields = (query: IFilterUndefinedFields) => {
    const fields = { ...query };

    Object.keys(fields).forEach((key) => {
        if (fields[key] === undefined) {
            delete fields[key];
        }
    });

    return fields;
};

export default filterUndefinedFields;
