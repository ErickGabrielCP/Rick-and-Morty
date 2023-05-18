/***********************************************************
 * Objetivo: Arquivo responsável por carregar os dados dos personagens e suas caracteristicas,
 *  fazendo integração entre o Front e Back
 * Data: 16/05/2023
 * Autor: Erick
 * Versão: 1.0
 **********************************************************/

var botaoPesquisar = document.getElementById('pesquisar');

var CarregarMais = document.getElementById('carregarMais');

var cards = document.getElementById('cards');

var contagem = 1;

const getPersonagens = async function (pagina) {
    let url = `https://rickandmortyapi.com/api/character?page=${pagina}`;

    await fetch(url)

        .then(function (response) {
            return response.json();
        })
        .then(function (dados) {
            createCard(dados.results);
        })
};

const getPersonagensByName = async function (pagina, name) {
    let url = `https://rickandmortyapi.com/api/character?page=${pagina}&name=${name}`;


    await fetch(url)

        .then(function (response) {
            return response.json();
        })
        .then(function (dados) {
            createCard(dados.results);
        })
};

const createCard = function (dados) {

    dados.forEach(function (item) {

        let card = document.createElement('div');

        card.setAttribute('class', 'dividir');

        let div1 = document.createElement('div');

        let figure = document.createElement('figure');

        let img = document.createElement('img');

        img.setAttribute('src', item.image);

        img.setAttribute('class', 'perso');

        let div2 = document.createElement('div');

        div2.setAttribute('class', 'caracteristicas');

        let spanNome = document.createElement('span')

        let spanGen = document.createElement('span')

        let spanEsp = document.createElement('span')

        let spanStatus = document.createElement('span')

        let spanOrigem = document.createElement('span')

        let txtNome = document.createTextNode(`nome: ${item.name}`)

        let txtGenero = document.createTextNode(`genêro: ${item.gender}`)

        let txtEspecies = document.createTextNode(`Espécie: ${item.species}`)

        let txtStatus = document.createTextNode(`Status: ${item.status}`)

        let txtOrigem = document.createTextNode(`Origem: ${item.origin.name}`)

        cards.appendChild(card);
        card.appendChild(div1);
        div1.appendChild(figure);
        figure.appendChild(img);
        card.appendChild(div2);

        div2.appendChild(spanNome);
        div2.appendChild(spanGen);
        div2.appendChild(spanEsp);
        div2.appendChild(spanStatus);
        div2.appendChild(spanOrigem);

        spanNome.appendChild(txtNome);
        spanGen.appendChild(txtGenero);
        spanEsp.appendChild(txtEspecies);
        spanStatus.appendChild(txtStatus);
        spanOrigem.appendChild(txtOrigem);

    });

};

const clearCards = function () {
    cards.innerText = '';
}

window.addEventListener('load', function () { getPersonagens(); });

botaoPesquisar.addEventListener('click', function (event) {

    event.preventDefault();

    clearCards();

    let nome = document.getElementById('nome').value;

    contagem = 1;

    if (nome == '') {

        getPersonagens(contagem);
    } else {
        getPersonagensByName(contagem, nome);
    }

})


CarregarMais.addEventListener('click', function () {

    let nome = document.getElementById('nome').value;

    contagem = contagem + 1;

    if (nome == '') {

        getPersonagens(contagem);
    } else {
        getPersonagensByName(contagem, nome);
    }
});

