/**
 * Use
 *
 * @module      :: Model
 * @description :: Tracks the usage of a given Jwt
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  attributes: require('waterlock').models.use.attributes({
    
    remoteAddress: {
      type: 'string'
    },
    jsonWebToken: {
      model: 'jwt'
    }
  })
};
