import cloudinary from "../config/cloudinary.js";

const uploadImg = async (req, res) => {
  
    const file = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;  // converting img file to base64
    const result = await cloudinary.uploader.upload(file, {    // url returned by cloudinary
        folder: 'blog_images',
    });

    res.status(200).json({ imgUrl: result.secure_url })
}

export { uploadImg };



// Understanding:-------------------------------
// req.file.buffer: Raw image data captured using multer with memoryStorage.

// req.file.mimetype: Like 'image/png' or 'image/jpeg'.

// Converts the image to a Base64 Data URL that Cloudinary accepts directly.