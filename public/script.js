document.getElementById('form-tarefa').addEventListener('submit',e=>{
    e.preventDefault()
    const descricao = document.getElementById('descricao').value
    // Enviar nova tarefa para o servidor
    fetch('/adicionar-tarefa',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({descricao})
    })
    .then(res=>{res.json()})
    .then(data=>{ 
        console.log('tarefa adicionada', data)
    })
    .catch(err=>{
        console.log('erro ao add', err)
    })
})