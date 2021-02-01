const { swagger } = require('./routes')

const options = {
    openapi: '3.0.0',
    info: {
        title: 'Liste Blanche API',
        version: '0.1.0',
        description: 'API REST pour le projet Liste Blanche',
        license: {
            name: 'GPLv3',
            url: 'https://www.gnu.org/licenses/gpl-3.0.en.html'
        } /*,
            contact: {
                name: 'LogRocket',
                url: 'https://logrocket.com',
                email: 'info@email.com'
            }*/
    },
    servers: [
        {
            url: 'http://localhost:8070/'
        }
    ],
    // Usage of JS objects instead of Yaml
    paths: swagger
}

module.exports = options
