import { CustomValidator } from 'express-validator'

/**
 * Intended to be used as custom express-validator
 *
 * Used by the Deadline Extensions entity validator
 *
 * Checks if the given param is same as the value of the field being checked
 * (eg: id of the creator of the extension cannot be same as user that is given the extension)
 */
export function isSameId(creatorIdKey: string): CustomValidator {
  return (value: any, { req }) => {
    const pastParameter = req.body[creatorIdKey]

    const userId = Number(value)
    const creatorId = Number(pastParameter)

    if (userId === creatorId) throw new Error(`Creator Id and User Id cannot be the same`)

    return true
  }
}