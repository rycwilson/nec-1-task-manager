import mongoose from 'mongoose'

export const connectDb = () => {
  const dbName = 'nec-task-manager'

  // options aren't necessary in v6 of mongoose
  mongoose.connect(
    `mongodb://127.0.0.1:27017/${dbName}`, 
    { 
      useNewUrlParser: true, 
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true 
    }
  )
}