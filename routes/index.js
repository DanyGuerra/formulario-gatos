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
const TABLE_NAME = "sense-encuestas";

AWS.config.update({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET,
  region: "us-east-1",
});

const s3 = new AWS.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(
      "",
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        mimeTypes.extension(file.mimetype)
    );
  },
});

const upload = multer({
  storage: storage,
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
      resolve(data);
    });
  });
};

//Ecuestas en Dynamo
const getEncuestas = async () => {
  const params = {
    TableName: TABLE_NAME,
  };

  const encuestas = await dynamoClient.scan(params).promise();

  return encuestas;
};

const addOrUpdateEncuesta = async (encuesta) => {
  const params = {
    TableName: TABLE_NAME,
    Item: encuesta,
  };
  return await dynamoClient.put(params).promise();
};

const getEncuestaByUser = async (user) => {
  const params = {
    TableName: TABLE_NAME,
    FilterExpression: "#user = :user",
    ExpressionAttributeNames: {
      "#user": "user",
    },
    ExpressionAttributeValues: {
      ":user": user,
    },
  };
  return await dynamoClient.scan(params).promise();
};

const getEncuestasByDay = async (day) => {
  const params = {
    TableName: TABLE_NAME,
    FilterExpression: "#day = :day",
    ExpressionAttributeNames: {
      "#day": "day",
    },
    ExpressionAttributeValues: {
      ":day": day,
    },
  };
  return await dynamoClient.scan(params).promise();
};

// getEncuestas();

const createExcelFile = (headerColumns, data, filename) => {
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
  wb.write(`routes\\encuestas-dia${filename}.xlsx`);
};

const deleteFile = (pathFile) => {
  try {
    fs.unlinkSync(pathFile);
  } catch (err) {
    console.error(err);
  }
};

router.post("/inicio-sesion", auth.isAuthorized, async (req, res) => {
  const encuestas = await getEncuestaByUser(req.body.user);

  if (encuestas.Count == 2) {
    res.status(401).json({ mensaje: "El usuario ya contestó las encuestas" });
  } else {
    res.status(200).json({ usuario: req.body.user, dia: encuestas.Count + 1 });
  }
});

router.post("/admin", auth.isAdmin, async (req, res) => {
  console.log("todo bien");
  res.status(200).json({ mensaje: "Usuario autorizado" });
});

router.post("/subir", upload.single("file"), async (req, res) => {
  const file = req.file;
  try {
    const dataVideo = await uploadFile(file.path, file.filename);
    deleteFile(file.path);
    res.status(200).json(dataVideo);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/enviar/encuesta", async (req, res) => {
  const usuario = req.body.usuario;
  const respuestas = req.body.respuestas;
  const videoInfo = req.body.videoInfo;
  const dia = req.body.dia;

  const encuesta = {
    id: `${usuario}${Date.now()}`,
    user: usuario,
    day: dia,
    repuestas: respuestas,
    videoInfo: videoInfo,
  };

  addOrUpdateEncuesta(encuesta);
  res.sendStatus(200);
});

router.get("/download/:filename", async (req, res) => {
  const filename = req.params.filename;
  let video = await s3
    .getObject({
      Bucket: process.env.BUCKET_NAME,
      Key: filename,
    })
    .promise();

  res.status(200).send(video.Body);
});

router.get("/admin/encuestas", async (req, res) => {
  const encuestas = await getEncuestas();
  res.status(200).json(encuestas);
});

router.get("/admin/encuestas/:dia", async (req, res) => {
  //http://localhost:5000/admin/encuestas/2
  const dia = req.params.dia;
  const encuestasDia = await getEncuestasByDay(parseInt(dia));
  res.status(200).json(encuestasDia);
});

router.get("/admin/descargar-excel/:dia", async (req, res) => {
  const dia = req.params.dia;
  const encuestasDia = await getEncuestasByDay(parseInt(dia));
  const encuestas = encuestasDia.Items;

  const headerColumns = [
    "Usuario",
    "1. ¿Cuál olio primero?",
    "2. ¿Cuál comió primero?",
    "3. ¿De cuál código comió mas?",
    "4. ¿Cuanto comió?",
    "Comentarios",
    "Nombre del video",
  ];

  const data = [];

  encuestas.map((item) => {
    const encuesta = {
      usuario: item.user,
      pregunta1: item.repuestas[0],
      pregunta2: item.repuestas[1],
      pregunta3: item.repuestas[2],
      pregunta4: item.repuestas[3],
      comentarios: item.repuestas[4],
      nombre_video: item.videoInfo.Key,
    };
    data.push(encuesta);
  });

  const fileCreate = await createExcelFile(headerColumns, data, dia);
  const file = __dirname + `\\encuestas-dia${dia}.xlsx`;

  const fileName = path.basename(file);
  const mimeType = mime.getType(file);
  res.setHeader("Content-Disposition", "attachment;filename=" + fileName);
  res.setHeader("Content-Type", mimeType);
  setTimeout(() => {
    res.download(file);
    setTimeout(() => {
      deleteFile(`routes\\encuestas-dia${dia}.xlsx`);
    }, 5000);
  }, 2000);
});

module.exports = router;
