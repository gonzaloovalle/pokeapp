$(function() {
    let userInput = '';
    async function updatePage() {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${userInput}`);
            const data = await response.json();
            console.log(data);
            buildHTML(data)
        } catch (error) {
            console.log(error);
        }
    }


    function buildHTML(pokemon) {
        let pokemonImage = pokemon.sprites.front_default;
        let pokeType = ''
        pokemon.types.forEach(function(type, index) {
            if (index === 0) {
                pokeType += type.type.name;
            } else if (index === 1) {
                pokeType += '/' + type.type.name;
            }
        });
        let pokeHTML =
            `<div class="pokemon">
                <img src="${pokemonImage}">
                <h2 id="name">${pokemon.species.name.toUpperCase()}</h2>
                <h3>Type: ${pokeType}</h3>
            </div>`

        $('#pokemonContainer').html(pokeHTML);
    }



    $("#search").on('click', function(e) {
        e.preventDefault()
        userInput = $('#pokeSearch').val().toLowerCase();
        updatePage()
    });

});
