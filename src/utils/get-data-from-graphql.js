export function getColumns({ edges }) {
  const colHeaders = edges.length > 0 ? Object.keys(edges[0].node) : []
  return colHeaders.map(header => ({
    Header: header,
    accessor: header,
  }))
}
export function getRows({ edges }) {
  return edges.map(({ node }) => node)
}
