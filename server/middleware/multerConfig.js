// middleware/multerConfig.js
import multer from "multer";
import { storage } from "../config/cloudinaryConfig.js";

export const upload = multer({ storage });
