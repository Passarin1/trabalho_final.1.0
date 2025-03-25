const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Rota de cadastro
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Verifica se o usuário já existe
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "Email já cadastrado" });

  // Hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Criação do usuário
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: "Usuário criado com sucesso!" });
});

// Rota de login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: "Senha incorreta" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
});

module.exports = router;