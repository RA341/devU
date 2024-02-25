import { DeadlineExtensions } from 'devu-shared-modules'

import deadlineExtensionModel from './deadlineExtensions.model'

export function serialize(deadlineExtension: deadlineExtensionModel): DeadlineExtensions {
  return {
    id: deadlineExtension.id,
    assignmentId: deadlineExtension.assignmentId,
    creatorId: deadlineExtension.creatorId,
    userId: deadlineExtension.userId,
    deadlineDate: deadlineExtension.deadlineDate.toISOString(),
    createdAt: deadlineExtension.createdAt.toISOString(),
    updatedAt: deadlineExtension.updatedAt.toISOString(),
  }
}
