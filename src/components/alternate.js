import { getRows } from "../utils/get-data-from-graphql"

export const mapGeoSectToNumber = {
  NE: "100",
  NW: "200",
  SE: "300",
  SW: "400",
}

const addLeadingZero = num => {
  return num < 10 ? `0${num}` : num
}

export const createAlternateNumbers = (township, quaterC) => {
  const townshipData = getRows(township)
  const quaterCData = getRows(quaterC)

  const townPartial = townshipData
    .filter(({ GRID }) => GRID)
    .map(({ TWP, GRID, RGE }) => ({
      TWP,
      RGE,
      GRID: `000${GRID}`,
    }))

  const quaterPartial = quaterCData.map(({ PSECT, QSECT, ...rest }) => ({
    PSECT: addLeadingZero(PSECT),
    QSECT: mapGeoSectToNumber[QSECT],
    ...rest,
  }))

  const alternateNumbers = townPartial
    .map(({ TWP, GRID, RGE }) => {
      const quarter = quaterPartial
        .filter(({ PRGE, PTWP }) => RGE === PRGE && TWP === PTWP)
        .map(({ PSECT, QSECT }) => ({
          alternateNumber: `${GRID}${PSECT}${QSECT}`,
        }))

      return quarter
    })
    .flat()

  return {
    columns: [
      {
        Header: "Alternate Number",
        accessor: "alternateNumber",
      },
    ],
    data: alternateNumbers,
  }
}
