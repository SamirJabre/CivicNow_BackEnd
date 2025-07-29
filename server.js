import express, { json } from "express";
import connectToDatabase from "./Database/connection.js";
import authRouter from "./Routes/auth.route.js";
import issueRouter from "./Routes/issue.route.js";
import voteRouter from "./Routes/vote.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());

app.use("/", authRouter);
app.use("/", issueRouter);
app.use("/vote", voteRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectToDatabase();
});
