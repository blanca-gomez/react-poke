import { useState, useEffect } from 'react';
import './App.css';
import './index.css';


function App () {
  const [nombre, setNombre] = useState('')
  const [pokemon, setPokemon] = useState(null)

  const getPokemon = async (name) => {
    try{
      const res = await fetch (`https://pokeapi.co/api/v2/pokemon/${name}`);
      if(!res.ok){
        throw new Error('Pokemon no encontrado')
      }
      const data = await res.json()
      setPokemon(data)
    }catch(error){
      console.log(error)
    }  
  }

  const handleSubmit = e => {
    e.preventDefault();
    getPokemon(nombre)
  }

  return(
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='nombre'>Nombre del pokemon</label>
        <input
          type='text'
          id='nombre'
          placeholder='nombre'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button type='submit'>Buscar</button>
      </form>

      {pokemon && (
      <div className='card'>
        <h1>{pokemon.name}</h1>
        <img src={pokemon.sprites.front_default} alt='pokemon name' className='logo'/>
        <h2>Altura: {pokemon.height} dm</h2>
        <h2>Peso: {pokemon.weight} hg</h2>
        <h2>Habilidades: </h2>
        <ul>
          {pokemon.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>
      
      
      </div>
    )}
    </>
    


  )
  
};

export default App;
