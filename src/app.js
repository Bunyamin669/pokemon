import axios from 'axios';

let result = '';
let prevInfo = '';
let nextInfo = '';

// Ophalen data
async function getAllPokemonData() {
    try {
        result = await axios.get('https://pokeapi.co/api/v2/pokemon');

        nextInfo = result.data.next

        console.log(result.data);
        const pokemons = result.data.results;

      pokemonList(pokemons)

    } catch (e) {
        console.error(e);
    }
}


// Pokemon namen
function pokemonList(pokemon) {
    const container = document.getElementById('container');

    container.innerHTML = pokemon.map((poke) => {
        return `
        <li>
            <span id="space">${poke.name}</span>
        </li>
        `;
    }).join('');
}


async function getPokemonData(){

    try{
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon")
        console.log('test', response.data.results);
        // pokemonInfo(response.data)
        pokemonTest(response.data.results)

    }catch (e) {
        console.error(e)

    }
}

// Pokemon kaartjes
function pokemonTest(pokemon){
    let card = document.getElementById('test-container')

    pokemon.map((poke) => {
        async function getAllPokemon(){
            try{
                const result = await axios.get(`${poke.url}`)

                const pokemon = result.data

                card.innerHTML += `
<div id="test">
            <h2>${pokemon.name}</h2>
            <img src="${pokemon.sprites.front_default}" alt="plaatje">
            <p><strong>Moves:</strong>${pokemon.moves.length}</p>
            <p><strong>Weight:</strong>${pokemon.weight}</p>
            <p><strong>Abilities:</strong></p>
            <ul>
                ${pokemon.abilities.map((ability) => {
                    return (`
                    <li>
                        ${ability.ability.name}
                    </li>
                    `
                    )
                }).join('')}
</ul>
</div>
        `
            }catch (e) {
                console.error(e)
            }
        }
        getAllPokemon()
    })
}

// Buttons
const buttonNext = document.getElementById('button-next')
const buttonPrev = document.getElementById('button-prev')
buttonNext.addEventListener('click', next)
buttonPrev.addEventListener('click', prev)

async function next(){
    try{
        const info = await axios.get(nextInfo)
        const pokeInfo = info.data.results

        nextInfo = info.data.next
        prevInfo = info.data.previous

        pokemonList(pokeInfo)
        pokemonTest(pokeInfo)

    } catch (e) {
        console.error(e)
    }
}

async function prev(){
    try{
        const info = await axios.get(prevInfo)
        const pokeInfo = info.data.results
        prevInfo = info.data.previous
        nextInfo = info.data.next

        pokemonList(pokeInfo)
        pokemonTest(pokeInfo)

    } catch (e) {
        console.error(e)
    }
}

getPokemonData()
getAllPokemonData()
