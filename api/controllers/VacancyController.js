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
  },
  // route to [get] and show vacancy
  show: function(req, res, next) {
    var params = req.params.all();
    Vacancy.findOne(params.id, function foundVacancy(err, vacancy) {
      if (err) {
        waterlock.logger.debug(err);
        return req.serverError();
      }
      if (!vacancy) {
        waterlock.logger.debug('Vacancy not found.');
        return next();
      }
      res.view({
        'vacancy': vacancy
      });
    });
  },
  // route to [get] and show all vacancies
  index: function(req, res, next) {
    Vacancy.find(function foundVacancy(err, vacancies) {
      if (err) {
        waterlock.logger.debug(err);
        return req.serverError();
      }
      res.view({
        'vacancies': vacancies
      });
    });
  }
};
