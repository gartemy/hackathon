/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('sensors', {
        sensorId:           {
            type:       'bigint',
            primaryKey: true,
        },
        lineId:{
            type:'bigint',
            comment:'Номер линии, к которой привязан датчик'
        },
        sensorType:{
          type: 'integer',
          comment: 'тип датчика 1-температура 2-давление 3-напряжение'
        }
    }, {
        ifNotExists: true,
        comment:'Датчики'
    });
};

exports.down = pgm => {
};
