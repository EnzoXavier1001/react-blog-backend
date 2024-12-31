const router = require("express").Router()

const postsController = require("../controllers/PostController")

const PostController = new postsController()

router.route("/posts").get((req, res) => PostController.index(req, res))
router.route("/posts/:id").get((req, res) => PostController.show(req, res))
router.route("/posts/:id").put((req, res) => PostController.update(req, res))
router.route("/posts").post((req, res) => PostController.create(req, res))
router.route("/posts/:id").delete((req, res) => PostController.delete(req, res))

module.exports = router