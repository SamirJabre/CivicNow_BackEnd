import express, { json } from "express";
import connectToDatabase from "./Database/connection.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectToDatabase();
});
