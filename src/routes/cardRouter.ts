import { Router } from "express"; 
import "../controllers/cardController";
import { createCard } from "../controllers/cardController";

const router = Router();

router.post("/cards", createCard); 

export default router;