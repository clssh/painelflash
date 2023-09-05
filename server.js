const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/modulos', (req, res) => {
  try {
    // Leitura do arquivo texto.txt
    fs.readFile('key.txt', 'utf8', (err, data) => {
      if (err) {
        console.error('Erro ao ler o arquivo key.txt:', err);
        res.status(500).send('Erro ao ler o arquivo key.txt');
      } else {
        const textotxt = data; // Valor de textotxt disponível aqui

        // Recebe o comando da solicitação POST
        const comando = req.body.comando;
        const senha = req.body.senha;
        
        if (senha == textotxt) {
          exec(comando, (error, stdout, stderr) => {
            if (error) {
              res.status(500).send(stderr);
            } else {
              res.send(stdout);
              console.log('Sucesso!');
            }
          });
        } else {
          console.log('Senha inválida');
          res.send('Senha inválida');
        }
      }
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
