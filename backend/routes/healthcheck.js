const express = require("express");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Health Check
 *   description: The Product Manager API
 * /api/healthcheck:
 *   get:
 *     summary: returns the status of the API
 *     tags: [ Health Check]
 *     responses:
 *       200:
 *         description: api is ok
 */
router.get("/", (_req, res) => {
  res.sendStatus(200);
});

module.exports = router;