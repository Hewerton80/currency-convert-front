import { ISelectOption } from '../types/Global'
import { UserRoleEnum, UserRolePtBrEnum } from '../types/User'

let userRoleOptions: ISelectOption[] = []

userRoleOptions = Object.values(UserRoleEnum).map((value) => ({
  text: UserRolePtBrEnum[value],
  value: value,
}))
export { userRoleOptions }
