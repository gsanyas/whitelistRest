const app = require('./app').app

// listen to incoming requests on port 8000
app.listen(8070, () => {
    console.log('Server started !')
})
