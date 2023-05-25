require( 'dotenv' ).config();
const { pool } = require( './postgresql' )
const fastify = require( 'fastify' )( {
    logger:true,
} );

fastify.register(require('@fastify/cors'), (instance) => {
    return (req, callback) => {
        const corsOptions = {
            // This is NOT recommended for production as it enables reflection exploits
            origin: true
        };

        // do not include CORS headers for requests from localhost
        if (/^localhost$/m.test(req.headers.origin)) {
            corsOptions.origin = false
        }

        // callback expects two parameters: error and options
        callback(null, corsOptions)
    }
})

// Создание маршрута для get запроса
fastify.get( '/', async function (request, reply) {
    let data = {
        message:   'error',
        statusCode:400
    }
    const client = await pool.connect()
    try {
        const result = await client.query( `select *
                                            from "таблица"
                                            where "условие" = $1`, [ 'параметр, по которому фильтруем' ] )
    }
    catch ( e ) {
        console.log( e )
        data.message = 'Ошибка при выполнении запроса' + e.message
    }
    finally {
        client.release()
    }
    reply.send( data )
} )

// Создание маршрута для post запроса
fastify.post('/post',async function (request, reply) {
    let data = {
        message:   'error',
        statusCode:400
    }
    const client = await pool.connect()
    try {
        const result = await client.query( `insert into "таблица" ("значение1","значение2") values ($1,$2) returning id`, [ 'параметр1, параметр2' ] )

        if(result.rowCount > 0){
            console.log(`Успешно добавили запись`)
            data.message = {
                id:result.rows[0].id
            }
        }
        else{
            console.log(`Ошибка при добавлении записи`)
        }
    }
    catch ( e ) {
        console.log( e )
        data.message = 'Ошибка при выполнении запроса' + e.message
    }
    finally {
        client.release()
    }
    reply.send( data )
})

fastify.post('/update',async function (request, reply) {
    let data = {
        message:   'error',
        statusCode:400
    }
    const client = await pool.connect()
    try {
        const result = await client.query( `update "таблица" set "значение1" = $1,"значение2" = $2`, [ 'параметр1, параметр2' ] )

        if(result.rowCount > 0){
            console.log(`Успешно обновили запись`)
            data.message = {
                id:result.rows[0].id
            }
        }
        else{
            console.log(`Ошибка при обновлении записи`)
        }
    }
    catch ( e ) {
        console.log( e )
        data.message = 'Ошибка при выполнении запроса' + e.message
    }
    finally {
        client.release()
    }
    reply.send( data )
})

// Создание запроса с использование path параметров
fastify.get('/:id',function (request, reply) {
    console.log(`Path параметры, переданные в запросе: `,JSON.stringify(request.params))
    reply.send(request.params)
})

// Создание запроса с использованием query параметров
fastify.get('/query',function (request, reply) {
    console.log(`Query параметры, переданные в запросе`, JSON.stringify(request.query))
    reply.send(request.query)
})

fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})