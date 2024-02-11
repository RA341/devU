import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne } from 'typeorm'

import CourseModel from '../course/course.model'

@Entity('courseScore')
export default class CourseScoreModel {
    /**
     * @swagger
     * tags:
     *   - name: CourseScores
     *     description: Route is currently non-functional, TS2305 error (Issue #34)
     * components:
     *  schemas:
     *    CourseScore:
     *      type: object
     *      required: [courseId, score]
     *      properties:
     *        courseId:
     *          type: integer
     *        score:
     *          type: number
     *        letterGrade:
     *          type: string
     */
    @PrimaryGeneratedColumn()
    id: Number

    @Column({ name: 'course_id' })
    @JoinColumn({ name: 'course_id' })
    @ManyToOne(() => CourseModel)
    courseId: number

    @Column({ name: 'score' })
    score: Number

    @Column({ name: 'letterGrade' })
    letterGrade: string


    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date


}

