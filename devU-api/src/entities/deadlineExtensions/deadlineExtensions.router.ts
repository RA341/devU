// Libraries
import express from 'express'

// Middleware
import validator from './deadlineExtensions.validator'
import { asInt } from '../../middleware/validator/generic.validator'

// Controller
import DeadlineExtensionsController from './deadlineExtensions.controller'

const Router = express.Router()

/**
 * @swagger
 * /assignments:
 *   get:
 *     summary: Retrieve a list of assignments
 *     tags:
 *       - Assignments
 *     responses:
 *       '200':
 *         description: OK
 */
Router.get('/', DeadlineExtensionsController.get)

/**
 * @swagger
 * /assignments/{id}:
 *   get:
 *     summary: Retrieve a single assignment
 *     tags:
 *       - Assignments
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
Router.get('/:id', asInt(), DeadlineExtensionsController.detail)

/**
 * @swagger
 * /assignments:
 *   post:
 *     summary: Create an assignment
 *     tags:
 *       - Assignments
 *     responses:
 *       '200':
 *         description: OK
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Assignment'
 */
Router.post('/', validator, DeadlineExtensionsController.post)

/**
 * @swagger
 * /assignments/{id}:
 *   put:
 *     summary: Update an assignment
 *     tags:
 *       - Assignments
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
 *             $ref: '#/components/schemas/Assignment'
 */
Router.put('/:id', asInt(), validator, DeadlineExtensionsController.put)

/**
 * @swagger
 * /assignments/{id}:
 *   delete:
 *     summary: Delete an assignment
 *     tags:
 *       - Assignments
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
Router.delete('/:id', asInt(), DeadlineExtensionsController._delete)

export default Router
