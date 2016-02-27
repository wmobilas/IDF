/**
 * Activity.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  //army experience
  attributes: {
    unit: {
      type: 'string',
      required: true
    },
    
    position: {
      type: 'string',
      required: true
    },

    rank: {
      type: 'integer',
      required: true
    },

    competenceLevel: {
      type: 'integer',
      required: true
    },

    description: {
      type: 'string'
    },

    resumeId: {
      model: 'resume'
    },

    fromYear: {
      type: 'integer',
      required: true
    },

    toYear: {
      type: 'integer',
      required: true
    }
  }
};
