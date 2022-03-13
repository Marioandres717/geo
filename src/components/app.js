import { graphql, useStaticQuery } from "gatsby"
import React from "react"

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
  return <MyTable title="Township" data={township} />
}
