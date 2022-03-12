import React from "react"
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react"
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { useTable, useSortBy } from "react-Table"

function getColumns({ edges }) {
  const colHeaders = edges.length > 0 ? Object.keys(edges[0].node) : []
  return colHeaders.map(header => ({
    Header: header,
    accessor: header,
  }))
}
function getRows({ edges }) {
  return edges.map(({ node }) => node)
}

export default function MyTable({ data }) {
  const columns = React.useMemo(() => getColumns(data), [data])
  const d = React.useMemo(() => getRows(data), [data])
  const tableInstance = useTable({ columns, data: d }, useSortBy)
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map(headerGroup => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
              })}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
