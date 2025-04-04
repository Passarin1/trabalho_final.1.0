import { Router } from "express";
import jwt from "jsonwebtoken";
import { autenticarUsuario } from "../db/index.js";

import verificarAutenticacao from "../middlewares/autenticacao.js";

const router = Router();

router.get("/auth", verificarAutenticacao, async (req, res) => {
  console.log("Rota GET /auth solicitada");
  try {
    res.status(200).json({ user: `${req.userId}` });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

router.post("/login", async (req, res) => {
  console.log("Rota POST /login solicitada");
  try {
    const usuario = await autenticarUsuario(req.body.email, req.body.senha);
    if (usuario !== undefined) {
      const token = jwt.sign(
        { user: usuario.id, acesso: usuario.acesso },
        process.env.SECRET,
        { expiresIn: "1h" } // Token expira em 1 hora
      );
      res.status(200).json({ token: token }); // Usando status 200 para sucesso
    } else {
      res.status(404).json({ message: "Usuário/Senha incorreta!" });
    }
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

export default router;