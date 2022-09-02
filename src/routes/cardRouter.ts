import { Router } from "express"; 
import "../controllers/cardController";
import { createCard } from "../controllers/cardController";
import { authApiKey } from "../middlewares/authMiddleware";

const router = Router();

router.post("/cards", authApiKey,createCard); 

export default router;