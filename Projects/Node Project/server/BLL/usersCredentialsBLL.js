const axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/users';

const validateCredentials = async (enteredUsername, enteredEmail) => {
    const {data} = await axios.get(url);
    const index = await data.findIndex((user) => user.username === enteredUsername && user.email === enteredEmail );
    const isValid = index > -1;
    let id = 0;
    if(isValid) {
        id = data[index].id;
    }
    return {isValid, id}
}

module.exports = { validateCredentials };
