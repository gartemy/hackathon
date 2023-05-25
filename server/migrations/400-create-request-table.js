/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('requests', {
        requestId:           {
            type:       'bigserial',
            primaryKey: true,
        },
        workshopId:{
            type:'bigint',
            comment:'Номер цеха, с которого пришло уведомление'
        },
        lineId:{
            type:'bigint',
            comment:'Номер линии, с которой пришло уведомление'
        },
        sensorId:{
            type:'bigint',
            comment:'Номер сенсора, с котороого пришло уведомление'
        },
        value:{
            type:'integer',
            comment:'Значение датчика'
        },
        isDone: {
          type: 'boolean',
          comment: 'Обработана ли заявка',
          default: false
        },
        sensorType: {
          type:'integer',
          comment: 'тип датчика 1-температура 2-давление 3-напряжение'
        },
        isGotten:{
          type: 'boolean',
          comment: 'взята ли заявка',
          default: false
        },
        isDelay:{
          type: 'boolean',
          comment: 'просроченна ли заявка',
          default: false
        },
        createDate: {
          type: 'timestamp with time zone',
          default: pgm.func('now()')
        },
        getDate:{
          type: 'timestamp with time zone'
        }
    }, {
        ifNotExists: true,
        comment:'Сотрудники'
    });
};

exports.down = pgm => {
};
