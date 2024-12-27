/*
Multer is a middleware used for handling the file upload . In this file , 
we will perform initial configuration of multer
*/

import multer from "multer";
import crypto from "crypto";
import path from "path";

// diskStorage
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, './public/uploads')  // specifying the path for storing uploaded files on server
    },

    filename: function (req, file, cb) {
        
        crypto.randomBytes(12,function(err,bytes) {

            const filename = bytes.toString("hex") + path.extname(file.originalname);
            cb(null, filename);
        })

        /*
        In order to prevent overwriting of the file having same name , we have
        used crypto module to generate random bytes and coverted into hex format
        and at last appended the extension of the file by extracting the extension
        from the file name using path module..
        */
    }
  });

// creating and exporting upload object.

const upload = multer({ storage: storage });
export default upload; 