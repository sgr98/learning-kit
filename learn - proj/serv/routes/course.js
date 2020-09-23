const express = require('express')

const { signup, login } = require('../controllers/auth');
const isAuth = require('../middlewares/is-auth');
const { addCourse, getCourse } = require('../controllers/course');
const { addIntroduction, getIntroduction } = require('../controllers/course/introduction');
const { addBuildCircuit, getBuildCircuit } = require('../controllers/course/buildCircuit');
const { addTroubleshoot, getTroubleshoot } = require('../controllers/course/troubleshoot');
const { addExperiment, getExperiment } = require('../controllers/course/experiment');
const { addExcercise, getExcercise } = require('../controllers/course/excercise');
const router = express.Router();

router.post('/add', addCourse)
router.get('/get/:course_id', getCourse)
router.post('/buildCircuit', addBuildCircuit)
router.get('/buildCircuit/get/:id', getBuildCircuit)
router.get('/experiment/get/:id', getExperiment)
router.post('/troubleshoot', addTroubleshoot)
router.get('/troubleshoot/get/:id', getTroubleshoot)
router.post('/excercise', addExcercise)
router.get('/excercise/get/:id', getExcercise)
router.post('/experiment', addExperiment)
router.post('/introduction', addIntroduction)
router.get('/introduction/get/:id', getIntroduction)
module.exports = router