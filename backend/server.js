const express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express"),
  cors = require("cors"),
  path = require("path");

const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());


app.use("/", express.static(path.join(__dirname, "dist")));
app.get("/product/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
})
app.use("/api/product", require("./routes/product"));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "The Product Manager",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Daniel Guenther",
        email: "danthemango@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

const PORT = process.env.PORT || 3000;
app.listen(PORT);

console.debug("Server listening on port: " + PORT);
