const fs = require('fs/promises');
const express = require('express');
const fileType = require('file-type');

const WHITELISTED_EXTENSIONS = ['jpg', 'png'];

const upload = (path) =>
  multer({
    storage: multer.diskStorage({
      destination: path,
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      }
    }),
    limits: {
      fileSize: 1024 * 1024 // 1MB
    }
  });

module.exports = (database) => {
  const router = express.Router();

  router.post('/products/images', async (req, res, next) => {
    try {
      const image = req.files?.image;
      if (!image) {
        return res.status(400).send({
          statusCode: 400,
          message: 'Bad Request',
          error: 'No file uploaded'
        });
      }
      const imageType = await fileType.fromBuffer(image.data);
      if (!WHITELISTED_EXTENSIONS.includes(imageType.ext)) {
        return res.status(400).send({
          statusCode: 400,
          message: 'Bad Request',
          error: `Supported file type [${WHITELISTED_EXTENSIONS.join(', ')}]`
        });
      }

      // upload
      const rootPath = process.cwd();
      const absoluteFolderPath = `${rootPath}/public/products/images`;
      const absoluteFilePath = `${absoluteFolderPath}/${image.name}`;
      await fs.mkdir(absoluteFolderPath, { recursive: true });

      image.mv(absoluteFilePath, (err) => {
        if (err) {
          return res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error',
            error: err.message
          });
        }
        res.send({
          image: `/public/products/images/${image.name}`
        });
      });
    } catch (err) {
      next(err);
    }
  });

  return router;
};
