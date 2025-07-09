const express1 = require('express')
const router = express1.Router()
const {
  test,
  uploadMiddleware,
  handleUpload,
} = require('../controllers/controller')
const cors = require('cors')
router.use(
  cors({
    origin:
      process.env.CLIENT_URl ||
      'https://fullstack-test-opal.vercel.app/' ||
      'http://localhost:3000',
    credentials: true,
  })
)
router.get('/', test)
router.post('/upload', uploadMiddleware, handleUpload)
module.exports = router
