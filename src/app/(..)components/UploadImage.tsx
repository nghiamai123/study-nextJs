// // pages/api/sign-cloudinary-params.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import cloudinary from 'cloudinary';

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const paramsToSign = JSON.parse(req.body);

//   const timestamp = Math.round((new Date).getTime() / 1000);

//   const signature = cloudinary.v2.utils.api_sign_request({
//     ...paramsToSign,
//     timestamp
//   }, process.env.CLOUDINARY_API_SECRET);

//   res.status(200).json({ signature, timestamp });
// }
