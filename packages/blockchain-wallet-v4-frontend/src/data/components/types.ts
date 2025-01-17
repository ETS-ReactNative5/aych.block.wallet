import { BorrowActionTypes } from './borrow/types'
import { IdentityVerificationActionTypes } from './identityVerification/types'

// All relative ActionTypes should go here
// export type ComponentsActionTypes = IdentityVerificationActionTypes | ActivityListActionTypes | BchTransactionsActionTypes
export type ComponentsActionTypes =
  | BorrowActionTypes
  | IdentityVerificationActionTypes

export * from './borrow/types'
export * from './identityVerification/types'
