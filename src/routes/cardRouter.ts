import { Router } from "express"; 
import { activeCard, balanceAndDeal, blockCard, createCard, getCard, unlockCard } from "../controllers/cardController";

const router = Router();

router.post("/cards", createCard); 
router.put("/cards/:id", activeCard);
router.get("/cards/:id", getCard);
router.get("/cards/balance/:id", balanceAndDeal);
router.put("/cards/block/:id", blockCard);
router.put("/cards/unlock/:id", unlockCard);

export default router;