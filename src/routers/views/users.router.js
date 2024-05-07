import { Router } from "express";
import userController from "../../controllers/users.controller.js";
import { authMiddleware,StrategyMiddleware } from "../../utils.js";

const router = Router();

router.get('/users',StrategyMiddleware('jwt'),authMiddleware(['admin']), async (req, res) => {
    const users= await userController.getAll();
    res.render('users', { users: users.map(pro=>pro.toJSON()), title: 'Users list' })
});

export default router