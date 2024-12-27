import express from "express";
import upload from "./multerConfig.js";
import uploadOnCloudinary from "./cloudinaryConfig.js";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 3000;

/* 
    Route for handling the file upload  . Here , upload.single(name) , name must be
    same as that of name attribute specified in form tag of html file.
    Form must have attribute enctype="multipart/form-data" then only multer 
    will be able to get the file.

    file will be present within req.file and other text fields are present 
    in req.body.
*/

app.post("/upload" , upload.single("image") , async function (req,res){

    console.log("Inside request handler : ");
    console.log("body : " , req.body);
    console.log("file : " , req.file);

    // Using the file which is uploaded on server to upload it on cloudinary and
    // then remove it from server

    const result = await uploadOnCloudinary(req.file.path);

    if(result == null)
        return res.json({success : false , url : "" ,message : "Some error occurred . Please reupload the file"});
    else
        return res.json({success: true , url : result , message : "file uploaded successfully.."});
});

app.listen(PORT ,() => {
    console.log(`Server started on port : ${PORT}`);
});