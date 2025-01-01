const router = require("express").Router()

const postsController = require("../controllers/PostController")

const verifyJWT = require("../middlewares/auth")

const PostController = new postsController()

router.route("/posts").get((req, res) => PostController.index(req, res))
router.route("/posts/:id").get((req, res) => PostController.show(req, res))
router.route("/posts/:id").put(verifyJWT, (req, res) => PostController.update(req, res));
router.route("/posts").post(verifyJWT, (req, res) => PostController.create(req, res));
router.route("/posts/:id").delete(verifyJWT, (req, res) => PostController.delete(req, res));

module.exports = router