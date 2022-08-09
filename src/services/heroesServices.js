const URL = "https://akabab.github.io/superhero-api/api"


export const getAllHeroesService = () => {

    return fetch(`${URL}/all.json`)
}

export const getUserById = ({id}) => {
    return fetch(`${URL}/id/${id}.json`)
}