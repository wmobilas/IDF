/**
 * WantedController
 *
 * @description :: Server-side logic for managing wanteds
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `WantedController.getbysearcherid()`
   */
  searcher: function(req, res) {
    Wanted.find({message: req.allParams().message}
    ,function(err, wanted) {
        sails.log.debug(req.allParams().message);
        if (err) {
          response = res.json({
            "status": 0,
            "error": err
          });
          return response;
        } else {
          response = res.json(wanted);
          return response;
        }
      });
  },

  /**
   * `WantedController.all()`
   */
  all: function(req, res) {
    return res.json({
      todo: 'all() is not implemented yet!'
    });
  }
};
