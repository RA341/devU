import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import AssignmentModel from '../assignment/assignment.model'
import UserModel from '../user/user.model'

@Entity('deadline_extensions')
export default class DeadlineExtensionsModel {
  /**
   * @swagger
   * tags:
   *   - name: Assignments
   *     description:
   * components:
   *  schemas:
   *    DeadlineExtensions:
   *      type: object
   *      required: [creator_id, user_id, assignment_id, deadline_date]
   *      properties:
   *        creator_id:
   *          type: string
   *          description: The person who is creating the deadline extension
   *        user_id:
   *          type: string
   *          description: The person receiving the extension
   *        assignment_id:
   *          type: string
   *          description: The assignment id for the deadline
   *        deadline_date:
   *          type: string
   *          description: The deadline date. Must be in ISO 8601 format.
   *
   */

  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'assignment_id' })
  @JoinColumn({ name: 'assignment_id' })
  @ManyToOne(() => AssignmentModel)
  assignmentId: number

  @Column({ name: 'creator_id' })
  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => UserModel)
  creatorId: number

  @Column({ name: 'user_id' })
  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => UserModel)
  userId: number

  @Column({ name: 'deadline_date' })
  deadlineDate: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date
}
