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
                <h2>#: ${pokeId}</h2>
                <img src="${pokemonImage}" alt="pokemon sprite">
                <h2 id="name">${pokeName}</h2>
                <h3>Type: ${pokeType}</h3>
                
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
