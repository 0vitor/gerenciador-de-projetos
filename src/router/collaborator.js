import express from 'express'
import collaboratorController from '../controller/collaborator-controller.js' 

const router = express.Router()

router.get('/', (req, res) => collaboratorController.getAll(req, res))
router.get('/one', (req, res) => collaboratorController.getOne(req, res))
router.post('/', (req, res) => collaboratorController.save(req, res))
router.put('/', (req, res) => collaboratorController.update(req, res))
router.delete('/', (req, res) => collaboratorController.deleteAll(req, res))
router.delete('/one', (req, res) => collaboratorController.deleteOne(req, res))

export default router