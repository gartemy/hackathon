exports.up = pgm => {
  pgm.createTable('sensortype', {
    sensorTypeId:         {
      type: 'serial',
      primaryKey: true,
    },
    minValue:{
      type: 'integer'
    },
    maxValue: {
      type: 'integer'
    }
  }, {
    ifNotExists: true,
    comment:'типы скнсоров'
  });
  pgm.sql('INSERT INTO sensortype ("minValue","maxValue") values (20,80)')
  pgm.sql('INSERT INTO sensortype ("minValue","maxValue") values (1200,2300)')
  pgm.sql('INSERT INTO sensortype ("minValue","maxValue") values (2,5)')
};

exports.down = pgm => {
};
