import { serialize } from '../deadlineExtensions.serializer'

import DeadlineExtensionsModel from '../deadlineExtensions.model'

import Testing from '../../../utils/testing.utils'

let mockAssignment: DeadlineExtensionsModel

describe('Deadline-Extensions Serializer', () => {
  beforeEach(() => {
    mockAssignment = Testing.generateTypeOrm<DeadlineExtensionsModel>(DeadlineExtensionsModel)

    mockAssignment.id = 10
    mockAssignment.courseId = 123
    mockAssignment.name = 'qwerty'
    mockAssignment.startDate = new Date()
    mockAssignment.dueDate = new Date()
    mockAssignment.endDate = new Date()
    mockAssignment.categoryName = 'Super Awesome Category Name'
    mockAssignment.description = 'Woww! Such a description'
    mockAssignment.maxFileSize = 1
    mockAssignment.maxSubmissions = null
    mockAssignment.disableHandins = true
    mockAssignment.createdAt = new Date()
    mockAssignment.updatedAt = new Date()
    mockAssignment.deletedAt = new Date()
  })

  describe('Serializing Deadline-Extensions', () => {
    test('Deadline-Extensions values exist in the response', () => {
      const expectedResult = serialize(mockAssignment)

      expect(expectedResult).toBeDefined()
      expect(expectedResult.id).toEqual(mockAssignment.id)
      expect(expectedResult.courseId).toEqual(mockAssignment.courseId)
      expect(expectedResult.name).toEqual(mockAssignment.name)
      expect(expectedResult.categoryName).toEqual(mockAssignment.categoryName)
      expect(expectedResult.description).toEqual(mockAssignment.description)
      expect(expectedResult.maxFileSize).toEqual(mockAssignment.maxFileSize)
      expect(expectedResult.maxSubmissions).toEqual(mockAssignment.maxSubmissions)
      expect(expectedResult.disableHandins).toEqual(mockAssignment.disableHandins)
    })

    test('Dates are returned as ISO strings for all Deadline-Extensions', () => {
      const expectedResult = serialize(mockAssignment)

      expect(expectedResult).toBeDefined()

      expect(expectedResult.updatedAt).toEqual(mockAssignment.updatedAt.toISOString())
      expect(expectedResult.createdAt).toEqual(mockAssignment.createdAt.toISOString())
      expect(expectedResult.newStartDate).toEqual(mockAssignment.startDate.toISOString())
      expect(expectedResult.newEndDate).toEqual(mockAssignment.dueDate.toISOString())
      expect(expectedResult.deadlineDate).toEqual(mockAssignment.endDate.toISOString())
    })
  })
})
