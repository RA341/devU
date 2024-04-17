// Libraries
import express from 'express'

// Middleware
import validator from './userCourse.validator'
import {asInt} from '../../middleware/validator/generic.validator'
import {extractOwnerByPathParam, isAuthorized} from "../../authorization/authorization.middleware";

// Controller
import UserCourseController from './userCourse.controller'

const Router = express.Router()


/**
 * @swagger
 * /course/:courseId/user-courses/:
 *   get:
 *     summary: Retrieve a list of all of a course's user-course associations.
 *     tags:
 *       - UserCourses
 *     responses:
 *       '200':
 *         description: OK
 *     parameters:
 *       - name: course-id
 *         description: Enter Course Id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 */
Router.get('/course/:id', isAuthorized('courseViewAll'), asInt(), UserCourseController.getByCourse)

/**
 * @swagger
 * /course/:courseId/user-courses/{id}:
 *   get:
 *     summary: Retrieve a single user-course association
 *     tags:
 *       - UserCourses
 *     responses:
 *       '200':
 *         description: OK
 *     parameters:
 *       - name: id
 *         description: Enter User-Course Id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 */
Router.get('/:id', isAuthorized('courseViewAll'), asInt(), UserCourseController.detail)
// TODO: self or all

/**
 * @swagger
 * /course/:courseId/user-courses/user/{userId}:
 *   get:
 *     summary: Retrieve a single user-course by course and user
 *     tags:
 *       - UserCourses
 *     responses:
 *       '200':
 *         description: OK
 *     parameters:
 *       - name: id
 *         description: Enter User-Course Id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 */
Router.get('/user/:userId', extractOwnerByPathParam('userId'), isAuthorized('courseViewAll', 'enrolled'), asInt('userId'), UserCourseController.detailByUser)


/**
 * @swagger
 * /course/:courseId/user-courses:
 *   post:
 *     summary: Create a new user-course association
 *     tags:
 *       - UserCourses
 *     responses:
 *       '200':
 *         description: OK
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/UserCourse'
 */
Router.post('/', isAuthorized('userCourseEditAll'), validator, UserCourseController.post)

/**
 * @swagger
 * /course/:courseId/users-courses/{id}:
 *   put:
 *     summary: Update a user-course association
 *     tags:
 *       - UserCourses
 *     responses:
 *       '200':
 *         description: OK
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/UserCourse'
 */
Router.put('/:id', isAuthorized('userCourseEditAll'), asInt(), validator, UserCourseController.put)

/**
 * @swagger
 * /course/:courseId/user-courses/{id}:
 *   delete:
 *     summary: Delete a user-course association
 *     tags:
 *       - UserCourses
 *     responses:
 *       '200':
 *         description: OK
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 */
Router.delete('/:id', isAuthorized('userCourseEditAll'), asInt(), UserCourseController._delete)

export default Router
