const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Criar modelo de Tarefa
const TarefaSchema = new mongoose.Schema({
    descricao: String,
    completa: { type: Boolean, default: false }
});

const Tarefa = mongoose.model('Tarefa', TarefaSchema);

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Rota para adicionar uma tarefa
app.post('/adicionar-tarefa', async (req, res) => {
    const { descricao } = req.body;
    const novaTarefa = new Tarefa({ descricao });
    await novaTarefa.save();
    res.json(novaTarefa);
});

// Rota para buscar todas as tarefas
app.get('/tarefas', async (req, res) => {
    const tarefas = await Tarefa.find();
    res.json(tarefas);
});

// Rota para excluir uma tarefa
app.delete('/tarefa/:id', async (req, res) => {
    await Tarefa.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tarefa excluída' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
