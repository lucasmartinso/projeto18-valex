import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import "express-async-errors";
import cardRouter from "./routes/cardRouter";
import rechargeRouter from "./routes/rechargeRouter";
import shopRouter from "./routes/shopRouter";
import errorHandler from "./middlewares/errorHandlerMiddleware";"./middlewares/errorHandlerMiddleware";
dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.use(cardRouter);
app.use(rechargeRouter); 
app.use(shopRouter);
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 4200;

app.listen(PORT, () => {
  console.log(`\nListening server on port: ${PORT}`);
});