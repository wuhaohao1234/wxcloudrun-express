const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { init: initDB, Counter, Classes, Reserve } = require("./db");

const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

// 首页
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 更新计数
app.post("/api/count", async (req, res) => {
  const { action } = req.body;
  if (action === "inc") {
    await Counter.create();
  } else if (action === "clear") {
    await Counter.destroy({
      truncate: true,
    });
  }
  res.send({
    code: 0,
    data: await Counter.count(),
  });
});

app.get("/api/classes", async (req, res) => {
  const result = await Classes.findAll();
  res.send({
    code: 0,
    data: result
  })
})

app.post("/api/classes", async (req, res) => {
  const result = await Classes.create({
    title: req.body.title,
    desc: req.body.desc,
    question: req.body.question,
    imgUrls: req.body.imgUrls,
    fileUrls: req.body.fileUrls,
    type: req.body.type
  })
  res.send({
    code: 0,
    data: result
  })
})

app.get("/api/reservation", async (req, res) => {
  const result = await Reserve.findAll();
  res.send({
    code: 0,
    data: result
  })
})

app.post("/api/reservation", async (req, res) => {
  const result = await Reserve.create({
    title: req.body.title,
    desc: req.body.desc,
    userId: req.body.userId
  })
  res.send({
    code: 0,
    data: result
  })
})

// 获取计数
app.get("/api/count", async (req, res) => {
  const result = await Counter.count();
  res.send({
    code: 1,
    data: result,
  });
});

// 小程序调用，获取微信 Open ID
app.get("/api/wx_openid", async (req, res) => {
  if (req.headers["x-wx-source"]) {
    res.send(req.headers["x-wx-openid"]);
  }
});

const port = process.env.PORT || 80;

async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();
