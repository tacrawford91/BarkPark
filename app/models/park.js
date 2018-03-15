// create/define the Park table within the BarkPark_db

module.exports = function(sequelize, DataTypes) {
    var Park = sequelize.define("Park", {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      park_name: DataTypes.STRING,
      address: DataTypes.STRING
    });
    return Park;
  };