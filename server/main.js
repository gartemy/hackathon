require( 'dotenv' ).config();
const { pool } = require( './postgresql' )
const { create } = require('axios');
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

fastify.post('/request/add', async (request, reply) => {
    let data = {
        message:'error',
        statusCode:400
    }
    const client = await pool.connect()
    try {
        const object = request.body
        
        const createRequest = await client.query(`INSERT INTO requests ("workshopId", "lineId", "sensorId", value, "sensorType")
                                                  VALUES ($1, $2, $3, $4, $5)`, [
            object.workshopId, object.lineId, object.sensorId, object.value, object.sensorType,
        ]);
        if(createRequest.rowCount > 0){
            console.log(`Запрос успешно добавился`);
        }
        else{
            console.log(`Ошибка при добавлении запроса`);
        }
    }
    catch (e) {
        console.log(e);
    }
    finally {
        client.release()
    }
    reply.send(data)
});

fastify.post('/template/add', async (request, reply) => {
    let data = {
        message:'error',
        statusCode:400
    }
    const client = await pool.connect()
    try {
        const object = request.body
        
        const createTemplate = await client.query(`INSERT INTO messagetemplates ("messageText", "messageTitle", "sensorId", "userId", "isSms", "isEmail")
                                                   VALUES ($1, $2, $3, $4, $5, $6) RETURNING "messageTemplateId"::integer`,
            [
                object.messageText,
                object.messageTitle,
                object.sensorId,
                object.userId,
                object.isSms,
                object.isEmail,
            ]
        );
        
        if(createTemplate.rowCount > 0 && createTemplate.rows.length > 0){
            console.log(`Создали шаблон`);
            
            data.message = {
                messageTemplateId:createTemplate.rows[0].messageTemplateId
            }
            data.statusCode = 200
        }
        else{
            console.log(`Ошибка при создании шаблона`);
        }
    }
    catch (e) {
        console.log(e);
    }
    finally {
        client.release()
    }
    reply.send(data)
});

fastify.post('/template/show', async (request, reply) => {
    let data = {
        message:    'error',
        statusCode: 400,
    };
    const client = await pool.connect();
    try {
        const templates = await client.query(`SELECT *
                                              FROM messagetemplates`);
        data.message = templates.rows;
        data.statusCode = 200;
    }
    catch (e) {
        console.log(e);
    }
    finally {
        client.release();
    }
    reply.send(data);
});

fastify.get('/users/show', async (request, reply) => {
    let data = {
        message:    'error',
        statusCode: 400,
    };
    const client = await pool.connect();
    try {
        const request = await client.query(`SELECT *
                                            FROM users`);
        
        data.message = request.rows;
        data.statusCode = 200;
    }
    catch (e) {
        console.log(e);
    }
    finally {
        client.release();
    }
    reply.send(data);
});

fastify.get('/request',async (request, reply)=>{
    let data = {
        message:    'error',
        statusCode: 400,
    };
    const client = await pool.connect();
    try {
        const request = await client.query(`SELECT *
                                            FROM requests r
                                                     INNER JOIN sensors s ON s."sensorId" = r."sensorId"
                                                     INNER JOIN sensortype st ON s."sensorType" = st."sensorTypeId"
                                                     INNER JOIN messagetemplates m ON r."sensorId" = ANY (m."sensorId")
                                                     INNER JOIN users u ON u."userId" = ANY (m."userId")
                                            WHERE "isGotten" IS FALSE
                                              AND (r.value < st."minValue" OR r.value > st."maxValue") order by "requestId" limit 10`);
        
        if(request.rows.length === 0){
            data.message = 'Отправлять нечего'
            return data
        }
        await client.query(`UPDATE requests
                            SET "isGotten" = TRUE
                            FROM (SELECT r."requestId"
                                  FROM requests r
                                           INNER JOIN sensors s ON s."sensorId" = r."sensorId"
                                           INNER JOIN sensortype st ON s."sensorType" = st."sensorTypeId"
                                  WHERE "isGotten" IS FALSE
                                    AND (r.value < st."minValue" OR r.value > st."maxValue")) AS r
                            WHERE r."requestId" = requests."requestId"`);
        
        await client.query(`INSERT INTO messages ("workshopId", "lineId", "sensorId", "messageText", "messageTitle", "isSms", "isEmail")
                            SELECT r."workshopId", r."lineId", r."sensorId", m."messageText", m."messageTitle", m."isSms", m."isEmail"
                            FROM requests r
                                     INNER JOIN sensors s ON s."sensorId" = r."sensorId"
                                     INNER JOIN sensortype st ON s."sensorType" = st."sensorTypeId"
                                     INNER JOIN messagetemplates m ON r."sensorId" = ANY (m."sensorId")
                            WHERE "isGotten" IS FALSE`);
        data.message = request.rows;
        data.statusCode = 200;
    }
    catch (e) {
        console.log(e);
    }
    finally {
        client.release();
    }
    reply.send(data);
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
