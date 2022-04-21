import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from "@chakra-ui/react"
import { parse } from "json2csv"

import MyTable from "./table"
import { getRows, getColumns } from "../utils/get-data-from-graphql"
import { createAlternateNumbers } from "./alternate"

export default function App() {
  const { allQuarterCCsv: quarterC, allTownshipCsv: township } =
    useStaticQuery(graphql`
      query myQuery {
        allQuarterCCsv {
          totalCount
          edges {
            node {
              PPID
              EFFDT
              EXPDT
              FEATURECD
              QSECT
              PSECTPPID
              PSECT
              PTWPPPID
              PTWP
              PRGE
              PMER
            }
          }
        }
        allTownshipCsv {
          totalCount
          edges {
            node {
              PPID
              EFFDT
              EXPDT
              TWPUID
              TWP
              RGE
              MER
              TRM
              GRID
            }
          }
        }
      }
    `)
  const { columns, data } = createAlternateNumbers(township, quarterC)

  function downloadBlob(filename, contentType) {
    const { columns, data } = createAlternateNumbers(township, quarterC)
    try {
      const content = parse(data, { fields: columns.map(col => col.accessor) })
      const blob = new Blob([content], { type: contentType })
      const url = URL.createObjectURL(blob)
      const pom = document.createElement("a")
      pom.href = url
      pom.setAttribute("download", filename)
      pom.click()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Tabs>
      <TabList>
        <Tab>Township</Tab>
        <Tab>Quarter-C</Tab>
        <Tab>Alternate #</Tab>
        <Tab>Export to CSV</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <MyTable
            title="Township"
            data={getRows(township)}
            columns={getColumns(township)}
          />
        </TabPanel>
        <TabPanel>
          <MyTable
            title="Quarter-C"
            data={getRows(quarterC)}
            columns={getColumns(quarterC)}
          />
        </TabPanel>
        <TabPanel>
          <MyTable title="Alternate Number" data={data} columns={columns} />
        </TabPanel>
        <TabPanel>
          <Button
            onClick={() =>
              downloadBlob("alternate_number.csv", "text/csv;charset=utf-8;")
            }
          >
            Export to CSV
          </Button>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
