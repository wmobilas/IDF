module.exports = require('waterlock').actions.user({
  register: function(req, res) {
    var params = req.params.all(),
      def = waterlock.Auth.definition,
      criteria = {},
      scopeKey = def.email !== undefined ? 'email' : 'username',
      auth = {
        email: params.email,
        password: params.password
      },
      userObj = {
        firstName: params.firstName,
        lastName: params.lastName,
        confirmed: params.confirmed
      };

    var attr = {
      password: params.password
    };
    attr[scopeKey] = params[scopeKey];
    criteria[scopeKey] = attr[scopeKey];

    waterlock.engine.findAuth(criteria, function(err, user) {
      if (user)
        return res.badRequest("User already exists");
      else
        User.create(userObj)
        .exec(function(err, user) {
          if (err) {
            waterlock.logger.debug(err);
            req.session.flash = {
              err: err
            };

            return res.redirect('/registration');
          }
          req.session.user = user;
          req.session.authenticated = true;
          waterlock.engine.attachAuthToUser(auth, user, function(err) {

            if (err) {
              waterlock.logger.debug(err);
              res.redirect('/registration');
            }
            user.online = true;
            user.save(function(err, user) {
              if (err) {
                sailsLog('err', err);
                return next(err);
              }
              user.action = " signed-up and logged-in.";


              ///////////////
              // adding link to auth (IT IS DANGEROUS TO OTHER TO SEE
              // USER`S CREDENTIALS)
              // Auth.findOne({
              //   id: user.id
              // })
              // .exec(function(e, auth) {
              //   user.auth=auth;
              //   user.save(function(err, res) {
              //      console.log(res);
              //    })
              // });
              //////////////


              User.publishCreate(user);
              waterlock.logger.debug('user login success');

              var jwtData = waterlock._utils.createJwt(req, res, user);

              Jwt.create({
                token: jwtData.token,
                uses: 0,
                owner: user.id
              }).exec(function(err) {
                if (err) {
                  return res.serverError('JSON web token could not be created');
                }

                var result = {};

                result[waterlock.config.jsonWebTokens.tokenProperty] = jwtData.token || 'token';
                result[waterlock.config.jsonWebTokens.expiresProperty] = jwtData.expires || 'expires';

                if (waterlock.config.jsonWebTokens.includeUserInJwtResponse) {
                  result['user'] = user;
                }

                //return res.json(result);
                return res.redirect('/user/show/' + user.id);
              });
            });
          });
        });
    });
  },
  // route to [get] and show user
  show: function(req, res, next) {
      var params = req.params.all();
      User.findOne(params.id, function foundUser(err, user) {
        if (err) {
          waterlock.logger.debug(err);
          return req.serverError();
        }
        if (!user) {
          waterlock.logger.debug('User not found.');
          return next();
        }
        res.locals.layout = 'layoutShow';
        res.view({
          'user': user
        }, { layout: 'layoutShow' });
      });
    },
    // route to [get] and show all users
    index: function(req, res, next) {
      User.find(function foundUsers(err, users) {
        if (err) {
          waterlock.logger.debug(err);
          return req.serverError();
        }
        res.view({
          'users': users
        });
      });
    },
  // route used to [get] user fields for edit
  edit: function(req, res, next) {
    var params = req.params.all();
    User.findOne(params.id, function foundUser(err, user) {
      if (err) {
        waterlock.logger.debug(err);
        return req.serverError();
      }
      if (!user) {
        waterlock.logger.debug('User not found.');
        return next();
      }

      res.view({
        user: user
      });
    });
  },
  // route to [post] edited fields and save to user/auth collections
  update: function(req, res, next) {
    var params = req.params.all(),
      userObj = {
        firstName: params.firstName,
        lastName: params.lastName,
        confirmed: params.confirmed
      },
      authObj = {
        email: params.email,
        password: params.password
      },
      admin = false,
      adminParam = params.admin;

    if (req.session.user.admin) {
      if (typeof adminParam !== 'undefined') {
        if (adminParam === 'unchecked') {
          admin = false;
        } else if (adminParam[1] === 'on') {
          admin = true;
        }
      }
      userObj.admin = admin;
    }

    User.update(params.id, userObj).exec(function(err) {
      if (err) {
        waterlock.logger.debug(err);
        return res.redirect('/user/edit/' + params.id);
      }

      if (!authObj.password || authObj.password === 'undefined') {
        delete(authObj.password);
      }

      Auth.update({
        user: req.session.user.id
      }, authObj).exec(function(err) {
        if (err) {
          waterlock.logger.debug(err);
          return res.redirect('/user/edit/' + params.id);
        }
        req.session.user.email = params.email;
        res.redirect('/user/show/' + params.id);
      });
    });
  },
  // route to [post] user id to delete user record from user/auth collections
  destroy: function(req, res, next) {
    var params = req.params.all();
    User.unsubscribe(req.socket, params.id);
    User.findOneById(params.id).exec(function(err, usr) {
      if (err) {
        waterlock.logger.debug(err);
        return res.redirect('/user');
      }
      if (!usr) {
        waterlock.logger.debug('User doesn\'t exist.');
        return res.redirect('/user');
      }

      User.destroy({
        id: usr.id
      }).exec(function(err, record) {
        if (err) {
          waterlock.logger.debug(err);
          return res.redirect('/user');
        }
        var auth = record.map(function(rId) {
          return rId.id;
        });
        Auth.destroy({
          user: auth
        }).exec(function(err) {
          if (err) {
            waterlock.logger.debug(err);
            return res.redirect('/user');
          }

          User.publishUpdate(usr.id, {
            id: usr.id,
            name: usr.name,
            action: ' has been destroyed.'
          });

          User.publishDestroy(usr.id);
          res.redirect('/user');
        });
      });
    });
  },
  // route [web socket] to add users for flash messages
  subscribe: function(req, res) {
    User.find(function(err, users) {
      if (err) {
        waterlock.logger.debug(err);
        return res.serverError();
      }

      User.watch(req.socket);

      User.subscribe(req.socket, users);

      res.send(200);
    });
  }
});
