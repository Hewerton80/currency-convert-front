import { getRange } from '../../../../utils/getRange'
import ShimmerEffect from '../ShimmerEffect'

interface ShimmerTableCellsProps {
  numberOfRows: number
  numberOfColumns: number
}

function ShimmerTableCells({ numberOfRows, numberOfColumns }: ShimmerTableCellsProps) {
  return (
    <>
      {getRange(numberOfRows).map((i) => (
        <tr key={i}>
          {getRange(numberOfColumns).map((j) => (
            <td key={String(i) + String(j)}>
              <ShimmerEffect />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

export default ShimmerTableCells
