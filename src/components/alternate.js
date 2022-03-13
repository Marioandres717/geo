import { getRows } from "../utils/get-data-from-graphql"

const mapGeoSectToNumber = {
  NE: "100",
  NW: "200",
  SE: "300",
  SW: "400",
}

export const createAlternateNumbers = (township, quaterC) => {
  const townshipData = getRows(township)
  const quaterCData = getRows(quaterC)

  const townPartial = townshipData
    .filter(({ GRID }) => GRID)
    .map(({ PPID, TWP, GRID, TWPUID }) => ({
      PPID,
      TWPUID,
      TWP,
      GRID: `000${GRID}`,
    }))

  const quaterPartial = quaterCData.map(({ QSECT, PTWPPPID, PTWP }) => ({
    QSECT: mapGeoSectToNumber[QSECT],
    PTWPPPID,
    PTWP,
  }))

  const alternateNumbers = townPartial.map(({ PPID, TWP, GRID, TWPUID }) => {
    const quater = quaterPartial.find(
      ({ PTWPPPID, PTWP }) => PTWPPPID === PPID && PTWP === TWP
    )

    return {
      TWPUID,
      TWP,
      QSECT: quater.QSECT,
      alternateNumber: `${GRID}-${TWP}-${quater.QSECT}`,
    }
  })

  return {
    columns: [
      {
        Header: "TWPUID",
        accessor: "TWPUID",
      },
      {
        Header: "TWP",
        accessor: "TWP",
      },
      {
        Header: "QSECT",
        accessor: "QSECT",
      },
      {
        Header: "Alternate Number",
        accessor: "alternateNumber",
      },
    ],
    data: alternateNumbers,
  }
}
