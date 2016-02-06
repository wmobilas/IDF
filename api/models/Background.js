/**
 * Background.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    resumeId: {
      model: 'resume'
    },

    background: {
      type: 'string',
      required: true
    },

    year: {
      type: 'string',
      required: true
    }
  }
};
