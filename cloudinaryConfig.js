import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// configuration
cloudinary.config({ 
    cloud_name: 'cloudname', 
    api_key: 'API KEY', 
    api_secret: 'API SECRET', 
});

async function uploadOnCloudinary(localfilepath)
{
    if(!localfilepath)  return null;

    try 
    {
        const response = await cloudinary.uploader.upload(localfilepath,{
            resource_type : "auto",
            asset_folder : "Practice Uploads",  // Folder on the cloudinary cloud on which file to be uploaded
        });

        console.log("File Uploaded on cloud");
        console.log(response);

        // file is uploaded successfully on the cloud , so removing the copy from server
        fs.unlink(localfilepath , (err) => {
            if (err) 
                console.log("Some error occurred while removing the file:", err.message);
            else 
                console.log("File was successfully removed.");
        });

        return response.secure_url;

    } catch (error) 
    {
        fs.unlink(localfilepath , (err) => {
            if (err) 
                console.log("Some error occurred while removing the file:", err.message);
            else 
                console.log("File was successfully removed.");
        });
    }
    
    return null;
}

export default uploadOnCloudinary;
