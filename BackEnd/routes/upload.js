import multer from 'multer';
import path from 'path';
import Datauri from 'datauri';
import express from "express"

const Router = express.Router();
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');

const dUri = new Datauri();

const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

Router.route("/upload")

    .post( multerUploads, (req, res) => {
        if (req.file) {
            const file = dataUri(req).content;
            return uploader.upload(file).then((result) => {
                const image = result.url;
                return res.status(200).json({
                    messge: 'Your image has been uploded successfully to cloudinary',
                    data: {
                        image
                    }
                })
            }).catch((err) => res.status(400).json({
                messge: 'someting went wrong while processing your request',
                data: {
                    err
                }
            }))
        }
    });

    export default Router;