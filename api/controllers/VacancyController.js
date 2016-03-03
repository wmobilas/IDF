/**
 * VacancyController
 *
 * @description :: Server-side logic for managing vacancies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  destroy: function(req, res, next) {
    var params = req.params.all();
    Vacancy.findOneById(params.id).exec(function(err, vacancy) {
      if (err) {
        waterlock.logger.debug(err);
        return res.redirect('/vacancy');
      }
      if (!vacancy) {
        return res.json('Vacancy doesn\'t exist.');
      }

      Vacancy.destroy({
        id: vacancy.id
      }).exec(function(err, record) {
        if (err) {
          waterlock.logger.debug(err);
          return res.redirect('/vacancy');
        }

        Vacancy.publishUpdate(vacancy.id, {
          id: vacancy.id,
          action: ' has been destroyed.'
        });

        Vacancy.publishDestroy(vacancy.id);
        return res.json("Vacancy deleted successfully");
      });
    });
  }
};
