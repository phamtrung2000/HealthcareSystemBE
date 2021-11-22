const Example = require("../models/example");

const express = require("express");

const router = express.Router();

/**
 * @swagger
 * /example:
 *   get:
 *     summary: This is an example request
 *     tags: [Example]
 *     responses:
 *       200:
 *         description: get example success
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Example'
 */

router.get("/example", async (req, res) => {
  res.send({
    example: "Example",
  });
});

module.exports = router;
