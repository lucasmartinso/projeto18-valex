import { Router } from "express"; 
import { shopping } from "../controllers/shopController";

const router = Router();

router.post("/shopping/:id", shopping); 

export default router;