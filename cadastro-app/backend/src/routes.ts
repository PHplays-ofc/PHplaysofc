import { Router } from "express";
import { db } from "./db";

const router = Router();

router.post("/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: "Campos obrigatórios ausentes." });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senha]
    );
    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error: any) {
    console.error(error);
    if (error?.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Email já cadastrado." });
    }
    res.status(500).json({ message: "Erro ao cadastrar usuário." });
  }
});

export default router;
