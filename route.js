const express = require('express');
const db = require('./db')
const router = express.Router();



//C
router.post(
    '/insert', async (request, response) => {
        const result = await db.insertTb(request.body);
        console.log(request.body);
        response.send(
            JSON.stringify(result)
        );
    }
);

//R
router.get(
    '/list', async (request, response) => {
        const dados = await db.selectTb();
        response.send(
            JSON.stringify(dados)
        );
    }
);
router.get(
    '/list/:ids', async (request, response) => {
        const dados = await db.selectWhereTB(request.params.ids);
        console.log(dados);
        response.send(
            JSON.stringify(dados)
        );
    }
);
 
//U
router.put(
    '/alter', (request, response) => {
        response.send('Executou o PUT');
    }
);

//D
router.delete(
    '/delete:id', async (request, response) => {
        const dados = await db.deletetb(request.params.id)
        console.log(dados);
        response.send(
         console.log('Executou o DELETE')
         );
    }
);

module.exports = router