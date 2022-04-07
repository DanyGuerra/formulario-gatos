require("dotenv").config();
const mime = require("mime");
const mimeTypes = require("mime-types");
const path = require("path");
const xl = require("excel4node");
const fs = require("fs");
const multer = require("multer");
let router = require("express").Router();
const AWS = require("aws-sdk");
var auth = require("./auth");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb("", Date.now() + "." + mimeTypes.extension(file.mimetype));
  },
});

const upload = multer({
  storage: storage,
});

const s3 = new AWS.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET,
});

const uploadFile = (filePath, fileName) => {
  const fileContent = fs.readFileSync(filePath);

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileName, // File name you want to save as in S3
    Body: fileContent,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, function (err, data) {
      if (err) {
        reject("bad");
      }
      resolve("ok");
      console.log(`File uploaded successfully. ${data.Location}`);
    });
  });
};

const headerColumns = ["Nombre", "Correo", "Telefono"];

const data = [
  { name: "luis", email: "luis@example.com", phone: "4644634234" },
  { name: "Roberto", email: "roberto@example.com", phone: "234523452345" },
];

const createExcelFile = () => {
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet("Sheet1");
  let colIndex = 1;
  headerColumns.forEach((item) => {
    ws.cell(1, colIndex++).string(item);
  });
  let rowIndex = 2;
  data.forEach((item) => {
    let columnIndex = 1;
    Object.keys(item).forEach((colName) => {
      ws.cell(rowIndex, columnIndex++).string(item[colName]);
    });
    rowIndex++;
  });
  wb.write("routes\\datosformulario.xlsx");
};

const deleteFile = (pathFile) => {
  try {
    fs.unlinkSync(pathFile);
  } catch (err) {
    console.error(err);
  }
};

router.get("/formulario", (req, res) => {
  createExcelFile();
  const file = __dirname + "\\datosformulario.xlsx";

  const fileName = path.basename(file);
  const mimeType = mime.getType(file);
  res.setHeader("Content-Disposition", "attachment;filename=" + fileName);
  res.setHeader("Content-Type", mimeType);
  setTimeout(() => {
    res.download(file);
    setTimeout(() => {
      deleteFile("routes\\datosformulario.xlsx");
    }, 5000);
  }, 2000);
});

router.post("/inicio-sesion", auth.isAuthorized, (req, res) => {
  res.sendStatus(200);
});

router.post("/subir", upload.single("file"), async (req, res) => {
  const file = req.file;
  try {
    await uploadFile(file.path, file.filename);
    deleteFile(file.path);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
