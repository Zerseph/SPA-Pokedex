require('dotenv').config();
const axios = require('axios');
const { Pokemon, Type } = require('../db');


// Función extraer pokemon de la api y guardar los datos de cada pokemon en la base de datos
const loadPokemonsInDb = async () => {
  try {
    let totalPokemonsAdded = 0; // contador de Pokémon agregados

    let Pagina = 0; //contador de paginas

    let nextUrl = "https://pokeapi.co/api/v2/pokemon"; // URL inicial para la primera página de resultados

    const defaultImageUrl = "../img/pokemonSinImg.png";

    //Creamos un bucle para que pase por cada pagina
    while (nextUrl) {

      // Hacer la solicitud a la API externa con la URL actual
      const response = await axios.get(nextUrl);

      // Obtener la lista de Pokémon desde la respuesta
      const pokemonsDataApi = response.data.results;


      // Mapear los datos de cada Pokémon utilizando la función formatApiData
      const transformedPokemonsApi = await Promise.all(pokemonsDataApi.map(async (pokemonData) => {
        // Obtener el ID del Pokémon a partir de la URL
        const urlParts = pokemonData.url.split('/');
        const pokemonId = urlParts[urlParts.length - 2]; // El ID es el penúltimo segmento de la URL

        // Obtener los detalles del Pokémon
        const pokemonDetailsResponse = await axios.get(pokemonData.url);
        const pokemonDetails = pokemonDetailsResponse.data;

        if (pokemonDetails) {
          return {
            name: pokemonData.name || "No name",
            id: pokemonId,
            hp: pokemonDetails.stats.find(stat => stat.stat.name === 'hp').base_stat || 0,
            img: pokemonDetails.sprites.other.home.front_default || defaultImageUrl,
            attack: pokemonDetails.stats.find(stat => stat.stat.name === 'attack').base_stat || 0,
            defense: pokemonDetails.stats.find(stat => stat.stat.name === 'defense').base_stat || 0,
            special_attack: pokemonDetails.stats.find(stat => stat.stat.name === 'special-attack').base_stat || 0,
            special_defense: pokemonDetails.stats.find(stat => stat.stat.name === 'special-defense').base_stat || 0,
            speed: pokemonDetails.stats.find(stat => stat.stat.name === 'speed').base_stat || 0,
            height: pokemonDetails.height || 0,
            weight: pokemonDetails.weight || 0,
          };
        } else {
          console.error(`Error obtaining details for Pokemon: ${pokemonName}, ID: ${pokemonId}`, error);
          return null;
        }
      }));
      

      // Crear una lista de todos los pokemons que no sean nulos
      const validPokemons = transformedPokemonsApi.filter(pokemon => pokemon !== null);

      //Obtener Pokemons desde la DB
      const listPokesDB = await Pokemon.findAll();

      //Comparamos pokemons de la DB con los de la Api para obtener nuevos pokemons para agregar
      const NewPokes = validPokemons.filter((pokeApi) => {
        return !listPokesDB.find((pokeDb) => pokeDb.id == pokeApi.id);
      })

      // Crear registros para los Pokémon en la base de datos
      await Pokemon.bulkCreate(NewPokes);

      // Incrementar el contador total Pokémon agregados sumando los de cada pagina
      totalPokemonsAdded += NewPokes.length;

      Pagina++;

      if (NewPokes.length === 0) {
        console.log(`All the pokemons on page number ${Pagina} already exist ✓`)
      } else {
        console.log(`${NewPokes.length} Pokemons saved in the database de la Pagina ${Pagina} ✓`);

      }

      // Actualizar la URL para la siguiente página de resultados
      nextUrl = response.data.next;
    }

    console.log(`Total Pokemons added: ${totalPokemonsAdded} ✓`);
    if (totalPokemonsAdded === 0) {
      console.log("No new POKEMONS found, all already exist in the DB ✓")
    } else { console.log("All Pokemons saved in the database ✓"); }
  } catch (error) {
    // Manejar errores en caso de que ocurran durante el proceso
    console.error('Error saving pokemons to database:', error);
  }
}






const loadTypesInDb = async () => {
  try {
    let totalTypesAdded = 0;
    // Obtener datos de la URL que contiene información sobre los tipos de elementos
    const response = await axios.get('https://pokeapi.co/api/v2/type');
    const typesData = response.data.results;

    // Iterar sobre los datos de los tipos de elementos y guardarlos en la base de datos
    for (const typeData of typesData) {

      // Obtener el ID del tipo a partir de la URL
      const urlParts = typeData.url.split('/');
      const typeId = urlParts[urlParts.length - 2]; // El ID es el penúltimo segmento de la URL

      // Crear o encontrar el tipo de elemento en la base de datos con el ID
      let [type, created] = await Type.findOrCreate({
        where: { id: typeId },
        defaults: { name: typeData.name || 'No name' },
      });

      // Si el tipo de elemento se creó correctamente, asociar los Pokémon correspondientes
      if (created) {
        totalTypesAdded++;
        const typeResponse = await axios.get(typeData.url);
        const pokemonsData = typeResponse.data.pokemon;

        // Asociar cada Pokémon con el tipo de elemento
        for (const pokemonData of pokemonsData) {
          const pokemonName = pokemonData.pokemon.name;

          // Buscar el Pokémon en la base de datos
          const pokemon = await Pokemon.findOne({ where: { name: pokemonName } });

          // Si se encuentra el Pokémon, asociarlo con el tipo de elemento
          if (pokemon) {
            await pokemon.addType(type);
          }
        }
      }
    }
    console.log(`Total types added: ${totalTypesAdded} ✓`);
    if (totalTypesAdded === 0) {
      console.log('No new TYPES found, all already exist in the DB ✓')
    } else { console.log('Types loaded and associated with pokemons successfully ✓'); }

  } catch (error) {
    console.error('Error loading types into database:', error);
  }
};

module.exports = { loadPokemonsInDb, loadTypesInDb };