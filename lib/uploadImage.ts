import {ID, storage} from "@/appwrite";

const uploadImage = async ( file : File) => {
  if(!file) return;

  const fileUploaded = await storage.createFile(
    "65133842603039031670",
    ID.unique(),
    file
  );

  return fileUploaded
}

export default uploadImage;