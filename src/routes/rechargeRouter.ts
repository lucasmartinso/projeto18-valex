import { Router } from "express"; 
import { recharge } from "../controllers/rechargeController";

const router = Router();

router.post("/recharge/:id", recharge); 

export default router;