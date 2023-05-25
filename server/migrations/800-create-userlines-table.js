exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('userlines', {
    userlinesId:         {
      type: 'serial',
      primaryKey: true,
    },
    lineId:{
      type: 'bigint',

    },
    workshopId:{
      type: 'bigint'
    },
    userId:{
      type: 'bigint'
    }
  }, {
    ifNotExists: true,
    comment:'связь линий и пользователя'
  });
};

exports.down = pgm => {
};
