/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
   * etc. depending on your default view engine) your home page.              *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/
   //VIEWS
  'get /user': 'UserController.index',
  'get /user/:id': 'UserController.show',
  'get /resume': 'ResumeController.index',
  'get /resume/:id': 'ResumeController.show',
  'get /vacancy': 'VacancyController.index',
  'get /vacancy/:id': 'VacancyController.show',
  'get /presentation': {view:'slides'},

  //REST
  'get /api/user/credentials/:id': 'AuthController.findOne',
  'get /api/user': 'UserController.find',
  'get /api/user/:id': 'UserController.findOne',
  'get /api/resume': 'ResumeController.find',
  'get /api/resume/:id': 'ResumeController.findOne',
  'get /api/vacancy': 'VacancyController.find',
  'get /api/vacancy/:id': 'VacancyController.findOne',

  //USER
  'post /user': 'UserController.register', //email, password
  'post /user/delete/:id': 'UserController.destroy', //email, password
  'post /login': 'AuthController.login', //email, password
  'post /logout': 'AuthController.logout',//email, password
  'post /update': 'UserController.update', //email, password

  //VACANCY
  'post /vacancy': 'VacancyController.create', //ownerId
  'post /vacancy/delete/:id': 'VacancyController.destroy', //email, password

  //RESUME
  'post /resume': 'ResumeController.create', //ownerId
  'post /resume/delete/:id': 'ResumeController.destroy', //email, password
  'post /resume/:id/activity/': 'ResumeController.add',
  'post /resume/:id/education/': 'ResumeController.add',
  'post /resume/:id/activity/': 'ResumeController.add',
  'post /resume/:id/experience/': 'ResumeController.add',
  'post /resume/:id/tag/': 'ResumeController.add',
  'post /resume/:id/work/': 'ResumeController.add',
  //'post /:modelIdentity/:id/:collectionAttr/:childid': 'controllerIdentity.add'//, //ownerId

  // '/': {
  //   view: 'index'
  // },
  //  '/home': {
  //    view: 'home'
  //  }
  //
  // 'get /register': {
  // //  view: 'base/signup'
  // },
  // 'post /signup': 'AccountController.register',
  //
  // 'get /login': {
  // //  view: 'base/login'
  // },
  // 'post /login': 'AccountController.login',
  //
  // '/logout': 'AccountController.logout'//,

  //  '/me': 'UserController.profile'

  /***************************************************************************
   *                                                                          *
   * Custom routes here...                                                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the custom routes above, it   *
   * is matched against Sails route blueprints. See `config/blueprints.js`    *
   * for configuration options and examples.                                  *
   *                                                                          *
   ***************************************************************************/

};
