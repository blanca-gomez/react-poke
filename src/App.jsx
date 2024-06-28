import { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import pokemonLogo from '../public/images/pokemon.png'


function App () {
  const [nombre, setNombre] = useState('')
  const [pokemon, setPokemon] = useState(null)
  const [error,setError]= useState('')

  useEffect(() => {
    if(nombre){
      getPokemon(nombre)
    }
  }, [nombre])

  const getPokemon = async (name) => {
    try{
      setError('');
      const res = await fetch (`https://pokeapi.co/api/v2/pokemon/${name}`);
      if(!res.ok){
        throw new Error('Pokemon no encontrado')
      }
      const data = await res.json()
      setPokemon(data)
    }catch (error) {
      setPokemon(null)
      setError(error.message)
    }  
  }

  const handleSubmit = e => {
    e.preventDefault();
    getPokemon(nombre)
  }

  return(
    <>
      <div className='pokemon-name'>
        <img src='../public/images/pokemon2.png'></img>
      </div>
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
      {error && <h2 className='error'>Pokemon no encontrado</h2>}

      {pokemon && (
        <div className='card'>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.sprites.front_default} alt='pokemon name' className='logo'/>
          <div className='card-characteristics'>
            <h2>Altura: {pokemon.height} dm</h2>
            <h2>Peso: {pokemon.weight} hg</h2>
            <div class= 'card-abilities'>
              <h2>Habilidades: </h2>
              <ul>
                {pokemon.abilities.map((ability, index) => (
                  <li key={index}>{ability.ability.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
       )}
    </>
  )
};

export default App;
