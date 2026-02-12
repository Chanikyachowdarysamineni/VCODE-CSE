import multer from "multer";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'hackathon_uploads', 
      allowed_formats: ['jpg', 'png', 'jpeg'],
    };
  },
});

export const upload = multer({ storage });
