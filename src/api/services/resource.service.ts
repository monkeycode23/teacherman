import cloudinary from "./cloud.config";
import { User } from "../models/User.model";
import { ValidationError } from "../errors/error.handler";
import { UploadApiResponse } from "cloudinary";
import crypto from 'crypto'

class ResourceService {
  constructor() {}

  static async uploadResource(req:any, classroom: string) {
    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "teacherman/resource/" + classroom,
            // public_id: req.file.originalname, // Podrías usar el nombre original o dejar que Cloudinary genere uno
            resource_type: "auto", // Detecta si es imagen, pdf, etc.
          },
          (error, result) => {
            if (error) return reject(error);

            if (!result) {
              return reject(new Error("Cloudinary upload returned no result"));
            }
            resolve(result);
          }
        );

        uploadStream.end(req.file.buffer);
      }
    );

    if (!uploadResult || !uploadResult.secure_url || !uploadResult.public_id) {
      console.error("Error en la subida a Cloudinary:", uploadResult);
      throw new ValidationError(
        "Error en la subida a Cloudinary:",
        uploadResult
      );
    }

    return {
      public_id: uploadResult.public_id,
      url: uploadResult.secure_url,
      filename: req.file.filename,
      uploadedAt: new Date(),
    };
  }

static getUploadSignature (){
  const timestamp = Math.round(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: "teacherman/resources",
    },
    process.env.CLOUDINARY_API_SECRET!
  );

  return{
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  };
}
}


export default ResourceService