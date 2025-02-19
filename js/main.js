$(function() {
    let userInput = '';
    async function updatePage(userInput) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${userInput}`);
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }


    function buildHTML(pokemon) {
        let pokemonImage = pokemon.sprites.front_default;
        let pokeType = '';
        let pokeName = pokemon.species.name.toUpperCase();
        let pokeId = pokemon.id;
        pokemon.types.forEach(function(type, index) {
            if (index === 0) {
                pokeType += type.type.name;
            } else if (index === 1) {
                pokeType += '/' + type.type.name;
            }
        });
        let pokeHTML =
            `<div class="pokemon">
                <img src="${pokemonImage}" alt="pokemon sprite" id="pokeImage">
                <h2>#: ${pokeId}</h2>
                <h2 id="name">${pokeName}</h2>
                <h3>Type: ${pokeType}</h3>
                <h3>Base Stats: </h3>
                <h4>Health Points: ${pokemon.stats[0].base_stat} </h4>
                <h4>Attack: ${pokemon.stats[1].base_stat} </h4>
                <h4>Defense: ${pokemon.stats[2].base_stat} </h4>
                <h4>Special Attack: ${pokemon.stats[3].base_stat} </h4>
                <h4>Special Defense: ${pokemon.stats[4].base_stat} </h4>
                <h4>Speed: ${pokemon.stats[5].base_stat} </h4>
            </div>`

        $('#pokemonContainer').html(pokeHTML);
    }



    $("#search").on('click', async function(e) {
        e.preventDefault()
        userInput = $('#pokeSearch').val().toLowerCase();
        const pokemon = await updatePage(userInput);
        buildHTML(pokemon);
    });

});
