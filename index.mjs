const STAR_WARS_ACCEPTED_RESOURCES = ['people', 'planets', 'starships', 'films']
const STAR_WARS_API_URL = 'https://swapi.dev/api'

const POKEMON_ACCEPTED_RESOURRCES = ['pokemon', 'type', 'ability']
const POKEMON_API_URL = 'https://pokeapi.co/api/v2'

const createApi = (url, acceptedResources) => {
 return new Proxy({}, {
  get: (target, prop) => {
    return async (id, queryParams) => {
      if(!acceptedResources.includes(prop))
        return Promise.reject({error: `Resource ${prop} not accepted`})

      let query = queryParams
        ? `?${new URLSearchParams(queryParams).toString()}`
        : ''
      
      const resource = `${url}/${prop}/${id}${query}`
      console.log(resource)

      const res = await fetch(resource)
      if (res.ok)  return res.json()
      return Promise.reject({ error: `Something went wrong with ${resource}`})
    }
  }
 })
}

const starWarsAPI = createApi(STAR_WARS_API_URL, STAR_WARS_ACCEPTED_RESOURCES)
const luke = await starWarsAPI.people(1)

const pokeAPI = createApi(POKEMON_API_URL, POKEMON_ACCEPTED_RESOURRCES)
const pokemon = await pokeAPI.pokemon('pikachu', { limit: 1, offset: 0, valid: true })

console.log({luke: luke.name})
console.log({pokemon: pokemon.name})
