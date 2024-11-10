import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/albumModel.js";

const addAlbum = async (req, res) => {
  try {
    let imageFile = null;
    const { name, desc, bgColor } = req.body;

    if (req.file) {
      imageFile = req.file;
    }

    if (!imageFile) {
      return res.status(400).json({
        message: `image file required`,
        success: false
      });
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image"
    });

    const albumData = {
      name,
      desc,
      bgColor,
      image: imageUpload?.secure_url
    };

    const album = new albumModel(albumData);

    await album.save();

    res.json({
      success: true,
      message: "Album Added"
    });
  } catch (err) {
    console.log(err);
    console.log(`Error from the addAlbum controller ${err.message}`);
    res.json({
      success: false,
      message: err?.message || err
    });
  }
};

const listAlbum = async (req, res) => {
  try {
    const allAlbums1 = await albumModel.find();
    const allAlbums = allAlbums1.length > 0 ? allAlbums1 : [];

    res.json({
      success: true,
      albums: allAlbums
    });
  } catch (err) {
    console.log(err);
    console.log(`Error from the listAlbum controller ${err.message}`);
    res.json({
      success: false,
      message: err?.message || err
    });
  }
};

const removeAlbum = async (req, res) => {
  try {
    await albumModel.findByIdAndDelete(req.body.id);
    res.json({
      success: true,
      message: "Album removed"
    });
  } catch (err) {
    console.log(err);
    console.log(`Error from the removeAlbum controller ${err.message}`);
    res.json({
      success: false,
      message: err?.message || err
    });
  }
};

export { addAlbum, listAlbum, removeAlbum };
