import express from 'express';
let router = express.Router();

router.get('/', (req, res) => {
	console.log("Project successfully build")
});

export default router;