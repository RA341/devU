import { check } from 'express-validator'

const userId = check('userId').isNumeric()
const creatorId = check('creatorId').isNumeric()
const assignmentId = check('assignmentId').isNumeric()
const deadlineDate = check('deadlineDate').trim().isISO8601().toDate()

const validator = [
  userId,
  creatorId,
  assignmentId,
  deadlineDate,
]

export default validator
