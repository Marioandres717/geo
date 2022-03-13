import React from "react"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Container,
  Select,
  Input,
  IconButton,
  TableCaption,
} from "@chakra-ui/react"
import {
  TriangleDownIcon,
  TriangleUpIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons"
import { useTable, useSortBy, usePagination } from "react-table"

import * as tableStyles from "./table.module.css"

export default function MyTable({ title, columns, data }) {
  const c = React.useMemo(() => columns, [])
  const d = React.useMemo(() => data, [])
  const tableInstance = useTable(
    { columns: c, data: d },
    useSortBy,
    usePagination
  )
  const pageSizeOptions = [5, 10, 20, 50, 100]
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = tableInstance

  return (
    <React.Fragment>
      <Table {...getTableProps()}>
        <TableCaption>{title}</TableCaption>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render("Header")}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon arial-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon arial-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
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
      <Container className={tableStyles.container}>
        <Container className={tableStyles.paginationButtons}>
          <IconButton
            icon={<ArrowLeftIcon />}
            onClick={() => gotoPage(0)}
          ></IconButton>
          <IconButton
            icon={<ArrowBackIcon />}
            onClick={() => previousPage(pageSize - 1)}
            disabled={!canPreviousPage}
          ></IconButton>
          <IconButton
            icon={<ArrowForwardIcon />}
            onClick={() => nextPage()}
            disabled={!canNextPage}
          ></IconButton>
          <IconButton
            icon={<ArrowRightIcon />}
            onClick={() => gotoPage(pageOptions.length - 1)}
          ></IconButton>
        </Container>
        <chakra.span className="pages">
          Page{" "}
          <em>
            {pageIndex + 1} of {pageOptions.length}
          </em>
        </chakra.span>

        <Container className={tableStyles.goToPage}>
          <chakra.label>Go to page:</chakra.label>
          <Input
            type="number"
            defaultValue={pageIndex + 1 || 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
          />
        </Container>
        <Select
          isFullWidth={false}
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {pageSizeOptions.map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
      </Container>
    </React.Fragment>
  )
}
