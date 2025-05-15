const express = require('express');
const fs = require('fs');
const path = require('path');
const reglas = require('./politica/reglas');

const app = express();
const PORT = process.env.PORT || 3000;

const usuariosPath = path.join(__dirname, 'data', 'usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf-8'));

const validarUsuario = (usuario) => {
  const resultados = reglas.map(r => ({
    regla: r.regla,
    cumple: r.fn(usuario.password)
  }));

  const fallidas = resultados.filter(r => !r.cumple).map(r => r.regla);
  return { usuario, fallidas };
};

app.get('/validador', (req, res) => {
  const noValidos = usuarios
    .map(validarUsuario)
    .filter(u => u.fallidas.length > 0)
    .map(({ usuario }) => ({
      userName: usuario.userName,
      email: usuario.email
    }));

  res.json(noValidos);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });