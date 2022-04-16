import { isUndefined } from './isType'
import assets from '../../assets.json'
export const isMobile = () => {
  if (!isUndefined(window?.innerWidth)) {
    return window.innerWidth < assets.breakpoints.md
  }
  return false
}
