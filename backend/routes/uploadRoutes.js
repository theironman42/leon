import path from 'path'
import express from 'express'
import multer from 'multer'
import fs from 'fs'
import { promisify } from 'util'

const router = express.Router()

export const unlinkAsync = promisify(fs.unlink)

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.any('images'), (req, res) => {
  const imgArray = [];
  req.files.map((file)=>{imgArray.push(`/image/${file.filename}`)}) 
  res.send(imgArray)
})

router.delete('/:id', async (req, res)=>{
  await unlinkAsync(`uploads/${req.params.id}`).then(()=> {res.status('200').send()}).catch(()=> res.status(404).send())
  
})

export default router
