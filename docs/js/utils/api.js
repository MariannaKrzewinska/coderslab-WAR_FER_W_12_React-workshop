export let savedToken = null;

export const login = () => {
  return fetch('https:\/\/mk-super-heroes.herokuapp.com/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ email: 'some@email.com', password: 'Password1!' })
  })
    .then(resp => resp.json())
    .then(({ token }) => {
      savedToken = token;
      return { token };
    })
}

export const getSuperheroes = () => {
  return (!savedToken
    ? login()
    : Promise.resolve())
    .then(() => {

      return fetch('https:\/\/mk-super-heroes.herokuapp.com/superheroes', {
        headers: {
          Authorization: savedToken
        }
      })
        .then(data => data.json())
    })
}

export const getSuperhero = (id) => {
  return (!savedToken
    ? login()
    : Promise.resolve())
    .then(() => fetch(`https:\/\/mk-super-heroes.herokuapp.com/superheroes/${id}`, {
      headers: {
        Authorization: savedToken
      }
    }))
      .then(data => data.json())
}
