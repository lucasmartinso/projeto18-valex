import { Router } from "express"; 
import "../controllers/cardController";
import { activeCard, createCard, getCard } from "../controllers/cardController";

const router = Router();

router.post("/cards", createCard); 
router.put("/cards/:id", activeCard);
router.get("/cards/:id", getCard);

export default router;