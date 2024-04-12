// ts errors here aare not relevant since
// this should never run in the actual app.
// script runs fine
// @ts-ignore
import path from 'path'
// @ts-ignore
import fs from 'fs'

import { addJob, openDirectory, pollJob, uploadFile } from '../tango.service'
import './tango.types'

// simulates the tango workflow
async function main() {
  const labName = 'testLab'

  const graderTestFiles = ['test_files/autograde.tar', 'test_files/Makefile']
  const outPutFileName = 'test_output.txt'

  try {
    // create a new lab
    const openRes = await openDirectory(labName)

    if (openRes == null) {
      console.error('Open dir returned null!!!')
      return
    }

    // uplaod grader files
    for (const file of graderTestFiles) {
      const fPath = path.join(__dirname, file)
      fs.readFile(fPath, async (err: any, data: any) => {
        if (err) {
          console.log('Failed to read file')
          console.log(err)
          return
        }
        const res = await uploadFile(labName, data, path.basename(file))
        console.log(res)
      })
    }

    const jobInfo: AddJobRequest = {
      image: 'autograding_image',
      output_file: outPutFileName,
      jobName: 'Test job',
      files: graderTestFiles.map(value => {
        const filename = path.basename(value)
        const fileInfo: FileInfo = {
          destFile: filename,
          localFile: filename,
        }
        return fileInfo
      }),
      timeout: 100,
    }

    // @ts-ignore
    const res = await addJob(labName, jobInfo)

    while (true){
      const res = await pollJob(labName, outPutFileName)

      // check job status
      if ((res as PollFailureResponse).statusId !== undefined){
        console.log('Job is running')
        console.log(res)
      }

    }
  } catch (e) {
    console.log('errored out')
    console.log(e)
  }
}

main().then(value => {
  console.log('main complete')
})