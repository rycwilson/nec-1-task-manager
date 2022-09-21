import mongoose from 'mongoose';

const taskAttributes = {
  name: {
    type: String,
    required: [true, 'must provide a name'],
    trim: true,
    maxlength: [20, 'max 20 characters']
  },
  completed: {
    type: Boolean,
    default: false
  }
}
const options = { timestamps: true }
const taskSchema = new mongoose.Schema(taskAttributes, options)
const Task = mongoose.model('Task', taskSchema);

export default Task