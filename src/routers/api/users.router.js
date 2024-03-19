import { Router } from "express";
import userController from "../../controllers/users.controller.js";
import { StrategyMiddleware, authMiddleware, createHash, isValidPassword, verifyToken, generateToken, authToken } from "../../utils.js";


const router = Router();

router.put('/users/premium/:uid', async (req, res) => {
    const { uid } = req.params;
    const user = await userController.getById(uid);
    if (!user) {
        res.status(error.statusCode || 500).json({ status: 'error', message })
    } else {

        await userController.upgradePremium(uid);

        res.status(204).end();
    }

});

export default router