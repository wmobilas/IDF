/**
 * ResumeController
 *
 * @description :: Server-side logic for managing Resumes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  register: function(req, res) {
    var params = req.params.all(),
      resumeObj = {
        ownerId: params.ownerId,
        idArmy: params.idArmy,
        about: params.about,
        phone: params.phone,
        //желаемая должность если имеется
        target_position: params.target_position,
        rank: params.rank,
        photo: params.photo,
        draftDate: params.draftDate,

      },
      //другая деятельность и значимые заслуги
      activity = {
        activities: params.activities
      },
      //учеба и года
      education = {
        education: params.education
      },
      //работа и года
      background = {
        background: params.background
      },
      tags = {
        tags: params.tags
      };
    Resume.create(resumeObj)
      .exec(function(err, resume) {
        if (err) {
          waterlock.logger.debug(err);
          return res.redirect('/resume/new');
        }
        resume.save(function(err, resume) {
          if (err) {
            sailsLog('err', err);
            return next(err);
          }
          Resume.publishCreate(resume);

          return res.json(result);
        });
      });

    Activity.create({
      resume: res.resume.id
    }, activityObj).exec(function(err) {
      if (err) {
        waterlock.logger.debug(err);
        return res.redirect('/resume/new/');
      }
    });
    Background.create({
      resume: res.resume.id
    }, backgroundObj).exec(function(err) {
      if (err) {
        waterlock.logger.debug(err);
        return res.redirect('/resume/new/');
      }
    });
    Education.create({
      resume: res.resume.id
    }, educationObj).exec(function(err) {
      if (err) {
        waterlock.logger.debug(err);
        return res.redirect('/resume/new/');
      }
    });
    Activity.create({
      resume: res.resume.id
    }, activityObj).exec(function(err) {
      if (err) {
        waterlock.logger.debug(err);
        return res.redirect('/resume/new/');
      }
    });
    Tag.create({
      resume: res.resume.id
    }, tagObj).exec(function(err) {
      if (err) {
        waterlock.logger.debug(err);
        return res.redirect('/resume/new/');
      }
    });

  },
  // route to [get] and show resume
  show: function(req, res, next) {
    var params = req.params.all()
    Resume.findOne(params.id, function foundResume(err, resume) {
      if (err) {
        waterlock.logger.debug(err);
        return req.serverError();
      }
      if (!resume) {
        waterlock.logger.debug('Resume not found.');
        return next();
      }
      res.view({
        resume: resume
      });
    });
  },
  // route to [get] and show all resumes
  index: function(req, res, next) {
    Resume.find(function foundResumes(err, resumes) {
      if (err) {
        waterlock.logger.debug(err);
        return req.serverError();
      }
      res.view({
        resumes: resumes
      });
    });
  },
  // route used to [get] resume fields for edit
  edit: function(req, res, next) {
    var params = req.params.all();
    Resume.findOne(params.id, function foundResume(err, resume) {
      if (err) {
        waterlock.logger.debug(err);
        return req.serverError();
      }
      if (!resume) {
        waterlock.logger.debug('Resume not found.');
        return next();
      }

      res.view({
        resume: resume
      })
    })
  },
  update: function(req, res, next) {
    var params = req.params.all(),
      resumeObj = {
        ownerId: params.ownerId,
        idArmy: params.idArmy,
        about: params.about,
        phone: params.phone,
        //желаемая должность если имеется
        target_position: params.target_position,
        rank: params.rank,
        photo: params.photo,
        draftDate: params.draftDate,

      },
      //другая деятельность и значимые заслуги
      activity = {
        activities: params.activities
      },
      //учеба и года
      education = {
        education: params.education
      },
      //работа и года
      background = {
        background: params.background
      },
      tags = {
        tags: params.tags
      };
    Resume.findOne(params.id, function foundResume(err, resume) {
      if (err) {
        waterlock.logger.debug(err);
        return req.serverError();
      }
      if (!resume) {
        waterlock.logger.debug('Resume not found.');
        return res.JSON('Resume not found.');
      } else {

        Resume.update(params.id, resumeObj).exec(function(err) {
          if (err) {
            waterlock.logger.debug(err);
            return res.redirect('/resume/edit/' + params.id);
          }
        });

        Activity.update({
          resume: req.session.resume.id
        }, activityObj).exec(function(err) {
          if (err) {
            waterlock.logger.debug(err);
            return res.redirect('/resume/edit/' + params.id);
          }
        });
        Background.update({
          resume: req.session.resume.id
        }, backgroundObj).exec(function(err) {
          if (err) {
            waterlock.logger.debug(err);
            return res.redirect('/resume/edit/' + params.id);
          }
        });
        Education.update({
          resume: req.session.resume.id
        }, educationObj).exec(function(err) {
          if (err) {
            waterlock.logger.debug(err);
            return res.redirect('/resume/edit/' + params.id);
          }
        });
        Activity.update({
          resume: req.session.resume.id
        }, activityObj).exec(function(err) {
          if (err) {
            waterlock.logger.debug(err);
            return res.redirect('/resume/edit/' + params.id);
          }
        });
        Tag.update({
          resume: req.session.resume.id
        }, tagObj).exec(function(err) {
          if (err) {
            waterlock.logger.debug(err);
            return res.redirect('/resume/edit/' + params.id);
          }
        });

      }
      res.view({
        resume: resume
      });
    });

    //req.session.resume.email = params.email;
    res.redirect('/resume/show/' + params.id);

  }
};
