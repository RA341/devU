import { check } from 'express-validator'
import { isSameId } from '../../middleware/validator/userId.validator'

const creatorId = check('creatorId').isNumeric()
const userId = check('userId').isNumeric().custom(isSameId('creatorId'))
const assignmentId = check('assignmentId').isNumeric()
const deadlineDate = check('deadlineDate').trim().isISO8601().toDate()

const validator = [
  userId,
  creatorId,
  assignmentId,
  deadlineDate,
]


export default validator
