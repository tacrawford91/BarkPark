// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");

// create/define the User table within the BarkPark_db

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      user_name: DataTypes.STRING,
      password: DataTypes.STRING,
      // The email cannot be null
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
         isEmail: true
        }
      },
      //The password can not be null
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dog_name: DataTypes.STRING,
    });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.hook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
    return User;
  };