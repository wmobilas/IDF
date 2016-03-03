/**
 * ResumeController
 *
 * @description :: Server-side logic for managing Resumes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  destroy: function(req, res, next) {
    var params = req.params.all();
    Resume.findOneById(params.id).exec(function(err, resume) {
      if (err) {
        waterlock.logger.debug(err);
        return res.redirect('/resume');
      }
      if (!resume) {
        return res.json('Resume doesn\'t exist.');
      }

      Resume.destroy({
        id: resume.id
      }).exec(function(err, record) {
        if (err) {
          waterlock.logger.debug(err);
          return res.redirect('/resume');
        }

        Resume.publishUpdate(resume.id, {
          id: resume.id,
          action: ' has been destroyed.'
        });

        Resume.publishDestroy(resume.id);
        return res.json("Resume deleted successfully");
      });
    });
  }
};
