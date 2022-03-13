import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import MyTable from "./table"

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
  return (
    <Tabs>
      <TabList>
        <Tab>O-Section</Tab>
        <Tab>Quarter-C</Tab>
        <Tab>Township</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <MyTable title="Township" data={township} />
        </TabPanel>
        <TabPanel>
          <MyTable title="Quarter-C" data={quarterC} />
        </TabPanel>
        <TabPanel>
          <MyTable title="O-Section" data={oSection} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
