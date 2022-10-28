const userController = require("../controllers/user");
const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const middleware = require("../middleware/auth");

router.post("/register", catchAsync(userController.createUser));
router.post("/login", catchAsync(userController.userLogin));
router.post("/logout", middleware.verifyToken, catchAsync(userController.userLogout));
router.post("/refreshToken", catchAsync(userController.refreshRToken));
router.get("/profile", middleware.verifyToken, catchAsync(userController.getCurrentUser));
router.get("/info/:username", catchAsync(userController.getUserByUserName));

module.exports = router;
