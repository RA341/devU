import { check } from 'express-validator'

import validate from '../../middleware/validator/generic.validator'

const submissionId = check('submissionId').isNumeric()
const score = check('score').isNumeric().optional({ nullable: true })
const feedback = check('feedback').isString().trim().optional({ nullable: true })
const releasedAt = check('releasedAt').trim().isISO8601().toDate().exists().withMessage("Make sure date is formatted correctly")

const validator = [submissionId, score, feedback, releasedAt, validate]

export default validator
