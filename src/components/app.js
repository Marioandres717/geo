import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import MyTable from "./table"
import { getRows, getColumns } from "../utils/get-data-from-graphql"
import { createAlternateNumbers } from "./alternate"

export default function App() {
  const {
    allOSectionCsv: oSection,
    allQuarterCCsv: quarterC,
    allTownshipCsv: township,
  } = useStaticQuery(graphql`
    query myQuery {
      allOSectionCsv {
        totalCount
        edges {
          node {
            PPID
            EFFDT
            EXPDT
            FEATURECD
            SECT
            PTWPPPID
            PTWP
            PRGE
            PMER
          }
        }
      }
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
  return (
    <Tabs>
      <TabList>
        <Tab>Township</Tab>
        <Tab>Quarter-C</Tab>
        <Tab>O-Section</Tab>
        <Tab>Alternate #</Tab>
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
          <MyTable
            title="O-Section"
            data={getRows(oSection)}
            columns={getColumns(oSection)}
          />
        </TabPanel>
        <TabPanel>
          <MyTable title="Alternate Number" data={data} columns={columns} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
