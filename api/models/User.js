/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  attributes: require('waterlock').models.user.attributes({

    firstName: {
      type: "string"
    },
    lastName: {
      type: "string"
    },
    confirmed: {
      type: "boolean",
      required: false,
      defaultsTo: false
    }
    // ,
    // salt: {
    //   type: "string"
    // }
  }),

  beforeCreate: require('waterlock').models.user.beforeCreate,
  beforeUpdate: require('waterlock').models.user.beforeUpdate
};
