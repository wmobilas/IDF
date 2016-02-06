/**
 * OwnerId.js
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

    idArmy: {
      type: 'integer',
      required: false,
      maxLength: 10
    },

    about: {
      type: 'string',
      required: false
    },

    rank: {
      type: 'string',
      required: false
    },

    photo: {
      type: 'photo',
      required: false
    },

    birthDate: {
      type: 'date',
      required: false
    },
    
    draftDate: {
      type: 'string',
      required: false
    },

    phone: {
      type: 'string',
      required: false
    },

    target_position: {
      type: 'string',
      required: false
    },

    activities: {
      collection: 'activity',
      via: 'resumeId'
    },

    background: {
      collection: 'background',
      via: 'resumeId'
    },

    education: {
      collection: 'education',
      via: 'resumeId'
    },

    tags: {
      collection: 'tag',
      via: 'resumeId'
    }
  }
};
