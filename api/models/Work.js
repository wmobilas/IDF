/**
 * Work.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    company: {
      type: 'string'
    },

    position: {
      type: 'string'
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
