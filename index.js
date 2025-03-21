require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("API funcionando!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Servidor rodando na porta ${PORT}'));


const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);