// multer.js
import multer, { memoryStorage } from 'multer';

const storage = memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

export default upload;