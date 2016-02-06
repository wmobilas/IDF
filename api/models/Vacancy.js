/**
 * Vacancy.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    ownerId: {
      type: 'integer',
      required: true
    },

    name: {
      type: 'string',
      required: true
    },

    rank: {
      type: 'string',
      required: false
    },

    competenceLevel: {
      type: 'integer',
      required: false
    },

    unit: {
      type: 'string',
      required: false
    },

    duration: {
      type: 'integer',
      required: false
    }

  }
};
