const express = require('express');
const cors = require('cors');
const {dbConection} = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.habitacionesPath = '/api/habitaciones'

        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB(){
        await dbConection()
    }

    middlewares(){

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.habitacionesPath, require('../routes/habitaciones'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en el puerto ', this.port);
        })
    }

}

module.exports = Server;