const mongoose = require("mongoose");
/**
 * @swagger
 * components:
 *   schemas:
 *     Example:
 *       type: object
 *       required:
 *         - prop1
 *         - prop2
 *       properties:
 *         prop1:
 *           type: string
 *           description: description for prop1
 *         prop2:
 *           type: number
 *           description: description for prop2
 *         _id:
 *           type: string
 *           description: The auto generated id for this object
 *       example:
 *         id: d5fE_asz
 *         prop1: Prop1 Prop1 Prop1
 *         prop2: 2345
 */

/**
 * @swagger
 * tags:
 *   name: Example
 *   description: This is an example model
 */
const exampleSchema = mongoose.Schema(
  {
    prop1: {
      type: String,
    },
    prop2: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Example = mongoose.model("Example", exampleSchema);

module.exports = Example;
