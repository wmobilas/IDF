/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {
  //  var User = Waterline.Collection.extend({
  // types: {
    //  point: function(latlng){
    //   return latlng.x && latlng.y
    //  },

  //   password: function(password) {
  //       return password === this.passwordConfirmation;
  //     }
  //     //);
  // },
  attributes: require('waterlock').models.user.attributes({

    /* e.g.
    nickname: 'string'
    */

    username: {
      type: "STRING",
      //required: true,
      // minLength: 5,
      // maxLength: 20,
      unique: true
    },
    confirmed: {
      type: "boolean",
      required: false,
      defaultsTo: false
    },
    salt: {
      type: "STRING",
      required: false
    },
    attempts: {
      collection: 'attempt',
      via: 'user'
    },
    jsonWebTokens: {
      collection: 'jwt',
      via: 'owner'
    },
    auth: {
      model: 'auth'
    }

  }),

  beforeCreate: require('waterlock').models.user.beforeCreate,
  beforeUpdate: require('waterlock').models.user.beforeUpdate
};
