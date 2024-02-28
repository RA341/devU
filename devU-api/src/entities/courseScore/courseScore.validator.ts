import { check } from 'express-validator'

import validate from '../../middleware/validator/generic.validator'

const courseId = check('courseId').isNumeric()
const userId = check('userId').isNumeric()
const score = check('score').isNumeric()

const validator = [courseId, userId, score, validate]

export default validator
