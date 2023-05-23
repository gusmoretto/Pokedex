let pokemon = 1;
const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");
console.log(pokemonName)
const form = document.querySelector(".formulario");
const input = document.querySelector(".input_search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

const conexaoApiPokemon = async (pokemonResp) =>{
    const APIresponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonResp}`
    )

    if(APIresponse.status === 200){
        const data = await APIresponse.json();
        return data;
    }

}

const renderPokemon = async (pokemonResp)=>{
    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML="";

    const dataOk = await conexaoApiPokemon(pokemonResp)

    if(dataOk){
        pokemonImage.style.display="block";
        pokemonName.innerHTML = dataOk.name;
        pokemonNumber.innerHTML= dataOk.id;
        pokemonImage.src =dataOk["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
        input.value="";
        pokemon = dataOk.id;
    }else{
        pokemonImage.style.display= "none";
        pokemonName.innerHTML= "Não encontrado";
        pokemonNumber.innerHTML= "";
    }
}

buttonPrev.addEventListener("click", ()=>{
    if(pokemon>1){
        pokemon-=1;
        renderPokemon(pokemon); 
    }    
});

buttonNext.addEventListener("click", ()=>{
    pokemon+=1;
    renderPokemon(pokemon);
});

form.addEventListener("submit", (evento)=>{
    evento.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

renderPokemon(pokemon)