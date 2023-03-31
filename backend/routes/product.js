/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         productId:
 *           type: number
 *           description: Product Number
 *         productName:
 *           type: string
 *           description: Product Name
 *         Developers:
 *           type: array
 *           description: Developer Names
 *           items:
 *             type: string
 *         scrumMasterName:
 *           type: string
 *           description: Scrum Master
 *         startDate:
 *           type: string
 *           format: date
 *           description: Start Date
 *         methodology:
 *           type: string
 *           description: Methodology (Agile or Waterfall)
 *       example:
 *         productId: 7869898
 *         productName: Training Cinestatic
 *         scrumMasterName: Morgan Ballard
 *         Developers:
 *           - Morgan Ballard
 *           - Georgina Powers
 *           - Kaitlyn Olson
 *         startDate: 2013/05/09
 *         methodology: Agile
 */

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: The Product Manager API
 * /api/product:
 *   get:
 *     summary: Lists all the Products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The created product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 * /api/product/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 *   put:
 *    summary: Update the product by the id
 *    tags: [Product]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: The product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: The product was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: The product was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the product by id
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The product id
 *
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 */

const express = require("express");
const router = express.Router();

const products = require("../data/product_static.json");

router.get("/", function (req, res) {
	// convert products object into array
	const productArr = Object.keys(products).map(key => {
		const product = products[key];
		product.productId = parseInt(key);
		return product;
	})

	res.status(200).json(productArr);
});

router.get("/:productId", function (req, res) {
	const product = products[req.params.productId];
	if(!product) {
		res.sendStatus(404);
		return;
	} else {
		product.productId = parseInt(req.params.productId);
		res.status(200).json(product);
	}
});

// returns true if the object can be a valid
// product object
function isValidProduct(product) {
	const requiredKeys = [
        "productName",
        "productOwnerName",
        "Developers",
        "scrumMasterName",
        "startDate",
        "methodology",
	]

	if(requiredKeys.some(key => !product[key])) {
		return false;
	} else if(product.Developers.length == 0 || product.Developers.some(str => !str)) {
		return false;
	} else {
		return true;
	}
}

function getNewProductId() {
	// generate a new product ID
	// well just generate random integers until we find
	// one that hasn't been filled yet. Very efficient for the
	// first few billion entries
	let productId;
	do {
		productId = 1 + Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 10));
	} while(products[productId]);
	return productId;
}


router.post("/", function (req, res) {
	if(!isValidProduct(req.body)) {
		res.sendStatus(400)
		return
	}

	const productId = getNewProductId();
	const product = req.body;
	product.productId = productId;
	products[productId] = product;

	res.status(201).json(product);
});

router.put("/:productId", function (req, res) {
	if (products[req.params.productId]) {
		products[req.params.productId] = req.body;
		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
});

router.delete("/:productId", function (req, res) {
	if (products[req.params.productId]) {
		delete products[req.params.productId];
	} else {
		return res.sendStatus(404);
	}

	res.sendStatus(204);
});

module.exports = router;
