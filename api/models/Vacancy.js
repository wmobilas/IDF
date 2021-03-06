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
      type: 'integer',
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

    phone: {
      type: 'string',
      required: false
    },

    email: {
      type: 'string',
      required: false
    },

    duration: {
      type: 'integer',
      required: false
    }

  }
};
