import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./../lib/cloudinary.js";

const bookStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "book_images", // folder for book images
        allowed_formats: ["jpg", "jpeg", "png"],
    },
});

const uploadBookImage = multer({ storage: bookStorage });

export default uploadBookImage;
