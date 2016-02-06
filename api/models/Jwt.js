/**
 * Jwt
 *
 * @module      :: Model
 * @description :: Holds all distributed json web tokens
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  attributes: require('waterlock').models.jwt.attributes({
    token: 'string',
    uses: {
      collection: 'use',
      via: 'jsonWebToken'
    },
    owner: {
      model: 'user'
    },
    revoked: {
      type: 'boolean',
      defaultsTo: false
    }
  })
};
