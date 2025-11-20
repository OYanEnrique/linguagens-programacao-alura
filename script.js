let cardContainer = document.querySelector(".card-container");
let dados = [];

// Função para carregar os dados do JSON e renderizar todos os cards inicialmente
async function carregarDados(){
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados);
}

// Função chamada pelo botão "Buscar"
function iniciarBusca(){
    // Pega o valor do campo de busca, remove espaços em branco e converte para minúsculas
    const termoBusca = document.getElementById('campo-busca').value.trim().toLowerCase();

    // Filtra o array 'dados'
    const resultados = dados.filter(dado => {
        // Verifica se o termo de busca está no nome ou na descrição da linguagem
        return dado.nome.toLowerCase().includes(termoBusca) || 
               dado.descricao.toLowerCase().includes(termoBusca);
    });

    // Renderiza os cards com os resultados filtrados
    renderizarCards(resultados);
}

function renderizarCards(dados){
    cardContainer.innerHTML = ""; // Limpa a área de cards antes de exibir os novos
    for(let dado of dados){
        let article = document.createElement("article");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.ano}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        `
        cardContainer.appendChild(article);
    }
}

// Chama a função para carregar os dados assim que o script é executado
carregarDados();