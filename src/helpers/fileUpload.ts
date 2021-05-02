import AWS from "aws-sdk";
import Multer from "multer";
import MulterS3 from "multer-s3";

const s3 = new AWS.S3({
    region: 'us-east-1',
});

const fileUpload = Multer({
    storage: MulterS3({
        s3,
        acl: 'public-read',
        bucket: 'unravel-foundation-source71e471f1-pp7azgexeegs',
        metadata: (req, file, cb) => {
            cb(null, { fieldname: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, "assets01/" + Date.now().toString() + "-" + file.originalname);
        }
    }),
});

export default fileUpload;
