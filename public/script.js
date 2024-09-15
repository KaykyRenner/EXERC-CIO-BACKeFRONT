document.getElementById('form-tarefa').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const descricao = document.getElementById('descricao').value;

    // Enviar nova tarefa para o servidor
    fetch('/adicionar-tarefa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descricao })
    })
    .then(response => response.json())
    .then(data => {
        adicionarTarefaNaLista(data);
        document.getElementById('descricao').value = '';
    });
});

// Buscar todas as tarefas ao carregar a página
window.onload = () => {
    fetch('/tarefas')
    .then(response => response.json())
    .then(tarefas => {
        tarefas.forEach(adicionarTarefaNaLista);
    });
};

// Função para adicionar tarefa na lista
function adicionarTarefaNaLista(tarefa) {
    const ul = document.getElementById('lista-tarefas');
    const li = document.createElement('li');
    li.textContent = tarefa.descricao;
    li.id = tarefa._id;

    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.onclick = () => excluirTarefa(tarefa._id);

    li.appendChild(botaoExcluir);
    ul.appendChild(li);
}

// Função para excluir uma tarefa
function excluirTarefa(id) {
    fetch(`/tarefa/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        document.getElementById(id).remove();
    });
}
