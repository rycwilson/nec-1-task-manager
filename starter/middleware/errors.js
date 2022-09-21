import ApiError from '../errors/custom-error.js'

const errorHandler = (err, req, res, next) => {
  console.log(err)
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message})
  }
  return res.status(500).json({ message: 'Something went wrong' })
}

export default errorHandler