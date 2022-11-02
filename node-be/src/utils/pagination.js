const getPagination = (page, size, defaultSize) => {
  const limit = size ? +size : defaultSize
  const offset = page ? (page - 1) * limit : 0
  return { limit, offset }
}

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: row } = data
  const currentPage = page ? +page : 0
  const totalPages = Math.ceil(totalItems / limit)
  return { totalItems, row, totalPages, currentPage }
}

module.exports = {
  getPagination,
  getPagingData,
}
