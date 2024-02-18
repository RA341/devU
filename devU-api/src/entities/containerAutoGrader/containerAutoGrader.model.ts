import {
    JoinColumn,
    ManyToOne,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm'

import AssignmentModel from '../assignment/assignment.model'

@Entity('container_auto_grader')
export default class ContainerAutoGraderModel {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date

    @Column({ name: 'assignment_id' })
    @JoinColumn({ name: 'assignment_id' })
    @ManyToOne(() => AssignmentModel)
    assignmentId: number

    @Column({ name: 'grader_filename', length: 128 })
    graderFile: string

    @Column({ name: 'makefile_filename', type: 'text' , nullable: true })
    makefileFile: string | null

    @Column({ name: 'autograding_image' })
    autogradingImage: string

    // timeout should be positive integer
    @Column({ name: 'timeout'})
    timeout: number

}