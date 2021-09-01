import express from "express";
import bodyParser from "body-parser";
import path from 'path'
import morgan from 'morgan'
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subCategoryRoutes from "./routes/subCategoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import availableInBulkRoutes from "./routes/availableInBulkRoutes.js";
import availableInDomesticRoutes from "./routes/availableInDomesticRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDb();
const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json());
// app.use(require("connect").bodyParser());
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subcategory", subCategoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/avail-bulk", availableInBulkRoutes);
app.use("/api/avail-domestic", availableInDomesticRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/email", emailRoutes);


const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(
    `Admin Console Node Server Listening on PORT ${PORT} in ${process.env.NODE_ENV}`.yellow.bold
  )
);
