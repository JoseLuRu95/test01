const pokemon = {
    'mock': [
        {
            'name': '',
            'height': 7,
            'weight': 69,
            'sprites': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
            'abilities': [],
            'type': '',
            'image': ''
        }
    ]
}

let mockService = () => new Promise(resolve => resolve(pokemon))
export default mockService


// const fetchSongs = () =>
//   fetch("URL")
//   .then(res => res.json())
//   .catch(err => {throw err})

// export default fetchSongs
