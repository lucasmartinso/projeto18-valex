import { Router } from "express"; 
import "../controllers/cardController";
import { activeCard, createCard } from "../controllers/cardController";

const router = Router();

router.post("/cards", createCard); 
router.put("/cards/:id", activeCard);

export default router;