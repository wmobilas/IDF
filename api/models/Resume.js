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

    unit: {
      type: 'string',
      required: false
    },

    rank: {
      type: 'integer',
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

    targetPosition: {
      type: 'string',
      required: false
    },

    //past army experience
    experience: {
      collection: 'experience',
      via: 'resumeId'
    },

    //past work
    work: {
      collection: 'work',
      via: 'resumeId'
    },

    //past activities
    activity: {
      collection: 'activity',
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
