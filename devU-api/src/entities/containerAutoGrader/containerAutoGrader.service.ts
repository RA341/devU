import { getRepository, IsNull } from 'typeorm'

import { ContainerAutoGrader, FileUpload } from 'devu-shared-modules'

import ContainerAutoGraderModel from './containerAutoGrader.model'
import FileModel from "../../fileUpload/fileUpload.model";

import { uploadFile, downloadFile } from '../../fileStorage'
import {generateFilename} from "../../utils/fileUpload.utils";

const connect = () => getRepository(ContainerAutoGraderModel)
const fileConn = () => getRepository(FileModel)

async function filesUpload(bucket: string, file: Express.Multer.File, containerAutoGrader: ContainerAutoGrader,filename: string) {
    const Etag: string = await uploadFile(bucket, file,filename)
    const assignmentId = containerAutoGrader.assignmentId

    const fileModel: FileUpload = {
        etags: Etag,
        fieldName: bucket,
        originalName: file.originalname,
        filename: filename,
        assignmentId: assignmentId,
    }
    //TODO: This is a temporary fix to get the function to pass. CourseId and UserId should be modified in the future
    fileModel.courseId = 1
    fileModel.userId = 1

    await fileConn().save(fileModel)

  return Etag
}



export async function create(containerAutoGrader: ContainerAutoGrader, graderInputFile: Express.Multer.File, makefileInputFile: Express.Multer.File | null = null, userId: number) {
    const existingContainerAutoGrader = await connect().findOne({ assignmentId: containerAutoGrader.assignmentId, deletedAt: IsNull() })
    if (existingContainerAutoGrader) throw new Error('Container Auto Grader already exists for this assignment, please update instead of creating a new one')
    const bucket: string = 'graders'
    const filename: string = generateFilename(graderInputFile.originalname, userId)
    await filesUpload(bucket, graderInputFile, containerAutoGrader, filename)
    containerAutoGrader.graderFile = filename

    if (makefileInputFile) {
        const makefileFilename: string = generateFilename(makefileInputFile.originalname, userId)
        await filesUpload(bucket, makefileInputFile, containerAutoGrader, makefileFilename)
        containerAutoGrader.makefileFile = makefileFilename
    }

    const { id, assignmentId, graderFile, makefileFile, autogradingImage, timeout } = containerAutoGrader
    return await connect().save({ id, assignmentId, graderFile, makefileFile, autogradingImage, timeout })
}

export async function update(containerAutoGrader: ContainerAutoGrader, graderInputFile: Express.Multer.File | null = null, makefileInputFile: Express.Multer.File | null = null, userId: number) {
    if (!containerAutoGrader.id) throw new Error('Missing Id')
    if (graderInputFile) {
        const bucket: string = 'graders'
        const filename: string = generateFilename(graderInputFile.originalname, userId)
        await filesUpload(bucket, graderInputFile, containerAutoGrader, filename)
        containerAutoGrader.graderFile = filename
    }

    if (makefileInputFile) {
        const bucket: string = 'makefiles'
        const makefileFilename: string = generateFilename(makefileInputFile.originalname, userId)
        await filesUpload(bucket, makefileInputFile, containerAutoGrader, makefileFilename)
        containerAutoGrader.makefileFile = makefileFilename
    }

    const { id, assignmentId, graderFile, makefileFile, autogradingImage, timeout } = containerAutoGrader
    return await connect().update(id, { assignmentId, graderFile, makefileFile, autogradingImage, timeout })
}

export async function _delete(id: number) {
  return await connect().softDelete({ id, deletedAt: IsNull() })
}

export async function retrieve(id: number) {
  return await connect().findOne({ id, deletedAt: IsNull() })
}

export async function list() {
  return await connect().find({ deletedAt: IsNull() })
}

//The grader has not changed to the new function, so the fake function keep here for now to avoid error
//But need to be deleted when the grader entity changed to the getGraderByAssignmentId
export async function listByAssignmentId(assignmentId: number) {
    if (!assignmentId) throw new Error('Missing AssignmentId')
    return await connect().find({ assignmentId: assignmentId, deletedAt: IsNull() })
}

export async function getGraderByAssignmentId(assignmentId: number){
    const containerAutoGraders = await connect().findOne({ assignmentId: assignmentId, deletedAt: IsNull() })
    if (!containerAutoGraders) throw new Error('No containerAutoGraders found')

    const { graderFile, makefileFile, autogradingImage, timeout } = containerAutoGraders
    const graderData = await downloadFile('graders', graderFile)
    let makefileData;

    if (makefileFile){
         makefileData = await downloadFile('makefiles', makefileFile)
    }else{
         makefileData = await downloadFile('makefiles', 'defaultMakefile') // Put actual default makefile name here
    }

    return {graderData, makefileData, autogradingImage, timeout}
}

export async function getGraderEntityByAssignmentId(assignmentId: number) {
    return await connect().findOne({ assignmentId, deletedAt: IsNull() })
  }

export default {
    create,
    retrieve,
    update,
    _delete,
    list,
    getGraderByAssignmentId,
    listByAssignmentId,
    getGraderEntityByAssignmentId,
}