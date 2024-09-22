import { v2 as cloudinary } from "cloudinary";

import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    const file = fs.readFileSync(localFilePath);
    const result = await uploadFile(file);
    console.log('File is uploaded on cloudinary')
    return result;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove local file temporarily after error
    console.log(error);
    return null;
  }
};

export const uploadFile = (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (result) => {
      resolve({
        url: result.url,
        public_id: result.public_id,
      });
    });
  });
};

export const deleteFile = (public_id) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(public_id, (result) => {
      resolve();
    });
  });
};

export const getFileUrl = (public_id) => {
  return new Promise((resolve) => {
    cloudinary.url(public_id, (result) => {
      resolve(result);
    });
  });
};

export const getFile = (public_id) => {
  return new Promise((resolve) => {
    cloudinary.api.resource(public_id, (result) => {
      resolve(result);
    });
  });
};
