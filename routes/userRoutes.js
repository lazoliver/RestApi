const fs = require('fs'); // Importando o módulo FS.
const { join } = require('path');

const filePath = join(__dirname, 'users.json');

const getUsers = () => {
    const data = fs.existsSync(filePath) // Verificar a existência o arquivo filePath
        ? fs.readFileSync(filePath) //  Caso ele exista, vamos ler o arquivo
        : [] // Caso não exista, retornamos um objeto vazio.
    try {
        return JSON.parse(data) // Retornando os dados
    } catch (error) {
        return []  // Se houver um erro, retornamos um objeto vazio
    }
}

const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'));

const userRoute = (app) => { // Função para buscar usuários
    app.route('/users/:id?')
        .get((req, res) => {
            const users = getUsers()

            res.send({ users })
        })
        .post((req, res) => { // Função para criar usuários
            const users = getUsers()

            users.push(req.body)
            saveUser(users)

            res.status(201).send('OK')
        })
        .put((req, res) => {
            const users = getUsers()

            saveUser(users.map(user => {
                if(user.id == req.params.id) {
                    return {
                        ...user,
                        ...req.body
                    }
                }

                return user
            }))

            res.status(200).send('OK')
        })
        .delete((req, res) => {
            const users = getUsers()

            saveUser(users.filter(user => user.id !== req.params.id))

            res.status(200).send('OK')
        })
}

module.exports = userRoute;