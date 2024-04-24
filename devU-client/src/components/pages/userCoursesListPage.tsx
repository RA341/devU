import React, {useEffect, useState} from 'react'

import PageWrapper from 'components/shared/layouts/pageWrapper'
import LoadingOverlay from 'components/shared/loaders/loadingOverlay'
import ErrorPage from './errorPage'
import styles from './userCoursesListPage.scss'
import UserCourseListItem from "../listItems/userCourseListItem";
import {Link} from 'react-router-dom'

import {useAppSelector} from 'redux/hooks'
import RequestService from 'services/request.service'
import {Assignment, Course, UserCourse} from 'devu-shared-modules'


const HomePage = () => {
  const userId = useAppSelector((store) => store.user.id)
  const role = useAppSelector((store) => store.roleMode)


  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [courses, setCourses] = useState(new Array<Course>())
  const [assignments, setAssignments] = useState(new Map<Course, Array<Assignment>>())

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const userCourses = await RequestService.get<UserCourse[]>(`/api/user-courses/user/${userId}`)
      const coursePromises = userCourses.map(uc => {
        const course = RequestService.get<Course>(`/api/courses/${uc.courseId}`)
        const assignments = RequestService.get<Assignment[]>(`/api/assignments/course/${uc.courseId}`)
        return Promise.all([course, assignments])

      })
      const result = await Promise.all(coursePromises)
      const courses = result.map(([course]) => course)
      const assignmentsMap = new Map<Course, Array<Assignment>>()
      result.forEach(([course, assignments]) => assignmentsMap.set(course, assignments))
      setCourses(courses)
      setAssignments(assignmentsMap)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }


  if (loading) return <LoadingOverlay delay={250} />
  if (error) return <ErrorPage error={error} />

  return (
      <PageWrapper>
        <div className={styles.header}>
          <div className={styles.smallLine}></div>
          <h1>My Courses</h1>
          <div className={styles.largeLine}></div>


        <div>
          {role.isInstructor() && (
            <Link className={styles.addCourseBtn} to={`/users/${userId}/addCoursesForm`}>
              Add Courses
            </Link>
          )}
          </div>
        </div>

        <div className={styles.coursesContainer}>
          {courses.map((course) => (
              <UserCourseListItem course={course} assignments={assignments.get(course)} key={course.id}/>

          ))}
        </div>

        <div className={styles.header}>
          <div className={styles.smallLine}></div>
          <h1>Previous Courses</h1>
          <div className={styles.largeLine}></div>
        </div>

      </PageWrapper>
  )
}

export default HomePage
