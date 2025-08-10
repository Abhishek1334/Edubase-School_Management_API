import { Router } from 'express';
import { addSchool, listSchools } from '../controllers/schoolController.js';

const router = Router();

// Add school route
router.post('/addSchool', addSchool);

// List schools route
router.get('/listSchools', listSchools);

export default router;
