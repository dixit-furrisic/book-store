import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./../lib/cloudinary.js";

const profileStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "profile_pictures", // Cloudinary folder name
        allowed_formats: ["jpg", "jpeg", "png"]
    }
});

const uploadProfileImage = multer({ storage: profileStorage });

export default uploadProfileImage;
