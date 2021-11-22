import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ShiniHealth API",
      version: "1.0.0",
      description: "API documentation for ShiniHealth App",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/models/*.js", "./src/routers/*.js"],
};

export const specs = swaggerJsDoc(options);

//module.exports = specs;
