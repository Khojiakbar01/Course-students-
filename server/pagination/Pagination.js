const paginationFunc = async (query, model, modelConfig) => {
    const page = query.page || 1;
    const size = query.size || 5;
    const data = {};
    const allData = await model.findAndCountAll({
        offset: (page - 1) * size,
        limit: size,
        ...modelConfig
    })

    data.content = allData.rows;
    data.pagination = {};
    data.pagination.totalPages = Math.ceil(allData.count / size)
    data.pagination.hasNextPage = data.pagination.totalPages > page;
    data.pagination.isLastPage = data.pagination.totalPages > 0 &&  page>1;
    data.pagination.totalItems = allData.count;
    data.pagination.page = page

    return data
}
module.exports = paginationFunc