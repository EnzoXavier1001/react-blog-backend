const router = require("express").Router()

const usersController = require("../controllers/UserController")

const UserController = new usersController()

router.route("/users").post((req, res) => UserController.create(req, res))
router.route("/auth").post((req, res) => UserController.auth(req, res))
router.route("/users").get((req, res) => UserController.index(req, res))
router.route("/users/:id").get((req, res) => UserController.show(req, res))

module.exports = router