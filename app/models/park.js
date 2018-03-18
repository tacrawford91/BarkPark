// create/define the Park table within the BarkPark_db

module.exports = function(sequelize, DataTypes) {
    var Park = sequelize.define("Park", {
      park_name: DataTypes.STRING,
      address_lat: DataTypes.DOUBLE,
      address_long: DataTypes.DOUBLE,
      dog_count: DataTypes.INTEGER
    });
    return Park;
  };