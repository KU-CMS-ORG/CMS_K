const Koa = require("koa");
const Router = require("@koa/router");
const multer = require("koa-multer");
const { BlobServiceClient } = require("@azure/storage-blob");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
);
const containerClient = blobServiceClient.getContainerClient("images");

const upload = multer({
    dest: "uploads/",
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error("Only image files are allowed!"));
        }
        cb(null, true);
    },
});
const prisma = new PrismaClient();

function uploadFile(file, ...path) {}

function downloadFile(...path) {}

module.exports = { uploadFile, downloadFile };
