import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";

const addSong = async (req, res) => {
  try {
    let audioFile = null;
    let imageFile = null;
    const { name, desc, album } = req.body;

    if (req.files?.audio[0]) {
      audioFile = req.files.audio[0];
    }
    if (req.files?.image[0]) {
      imageFile = req.files.image[0];
    }

    // console.log(audioFile, imageFile);

    if (!audioFile || !imageFile) {
      return res.status(400).json({
        message: `audioFile and image file required`,
        success: false
      });
    }

    // we will upload the files to cloudinary
    /*
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video"
    });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image"
    });
    */

    const [audioUpload, imageUpload] = await Promise.all([
      cloudinary.uploader.upload(audioFile.path, {
        resource_type: "video"
      }),
      cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image"
      })
    ]);

    // i want the duration to be like this 2:41 that is 2 mins : 40 seconds
    const duration = `${Math.floor(audioUpload?.duration / 60)}:${Math.floor(
      audioUpload?.duration % 60
    )}`;

    const songData = {
      name,
      desc,
      album,
      image: imageUpload?.secure_url,
      file: audioUpload?.secure_url,
      duration
    };

    const song = new songModel(songData);
    await song.save();

    res.json({
      success: true,
      message: "Song Added"
    });
  } catch (err) {
    console.log(err);
    console.log(`Error from the addSong controller ${err.message}`);
    res.json({
      success: false,
      message: err?.message || err
    });
  }
};

const listSong = async (req, res) => {
  try {
    const allSongs1 = await songModel.find();
    const allSongs = allSongs1.length > 0 ? allSongs1 : [];

    res.json({
      success: true,
      songs: allSongs
    });
  } catch (err) {
    console.log(err);
    console.log(`Error from the listSong controller ${err.message}`);
    res.json({
      success: false,
      message: err?.message || err
    });
  }
};

const removeSong = async (req, res) => {
  try {
    // console.log("Id => ", id);

    await songModel.findByIdAndDelete(req.body.id);
    res.json({
      success: true,
      message: "Song removed"
    });
  } catch (err) {
    console.log(err);
    console.log(`Error from the removeSong controller ${err.message}`);
    res.json({
      success: false,
      message: err?.message || err
    });
  }
};

export { addSong, listSong, removeSong };
