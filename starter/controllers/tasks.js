import Task from '../models/task.js'
import { asyncWrapper } from '../middleware/async.js'
import ApiError from '../errors/custom-error.js'

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params
  const task = await Task.findOne({ _id: taskId })
  if (!task) {
    // return res.status(404).json({ error: `No task with id: ${taskId}` })
    return next(new ApiError(`No task with id: ${taskId}`, 404))
  }
  res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params

  // add option overwrite: true if a PUT with missing attributes should remove or reset those attributes
  const task = await Task.findOneAndUpdate(
    { _id: taskId }, req.body, { new: true, runValidators: true }
  )
  if (!task) {
    return next(new ApiError(`No task with id: ${taskId}`, 404))
  }
  res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params
  const task = await Task.findOneAndDelete({ _id: taskId })
  if (!task) {
    return next(new ApiError(`No task with id: ${taskId}`, 404))
  }
  res.status(200).json({ status: 'success' })
})

export { getAllTasks, createTask, getTask, updateTask, deleteTask }