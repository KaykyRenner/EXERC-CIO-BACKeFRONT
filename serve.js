const express = require('express');
const mongoose = require('mongoose');
const { type } = require('os');
const path = require('path');
const { stringify } = require('querystring');
require('dotenv').config();

const app = express();
const port = process.env.port;

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('conectado ao banco de Dados')
}).catch(err=>{
    console.log(`err ao conectar ao banco de dados ${err}`)
});

// Criar modelo de Tarefa
const modeloDeTarefa = new mongoose.Schema({
    descricao: {type : String, required: true},
    completa: {type: Boolean, default: false}
});
const tarefa = mongoose.model('tarefa', modeloDeTarefa);

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

// Rota para a página inicial
app.get('/',(req,res)=>{
        res.sendFile(path.join(__dirname, 'views', 'index.html')),(err)=>{
            if(err) res.status(500).json({err:'erro ao carregar página'});
        }
})

// Rota para adicionar uma tarefa
app.post('/adiciona-tarefa',async (req,res)=>{
    const {descricao} = req.body;
    try {
        const novaTarefa = new tarefa({descricao});
        await novaTarefa.save();
        res.status(201).json(novaTarefa);
    }catch(err){
        res.status(501).json({err:'erro ao adicionar nova tarefa'})
    }
})

// Rota para buscar todas as tarefas

// Rota para excluir uma tarefa

// Iniciar servidor
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})