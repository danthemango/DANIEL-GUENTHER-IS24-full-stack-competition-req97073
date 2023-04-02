const express = require("express");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Health Check
 *   description: Returns the health status of the API
 * /api/healthcheck:
 *   get:
 *     summary: A status of 200 indicates the API is healthy
 *     tags: [ Health Check]
 *     responses:
 *       200:
 *         description: api is ok
 */
router.get("/", (_req, res) => {
  res.sendStatus(200);
});

module.exports = router;
