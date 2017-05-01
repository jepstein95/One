var AppView = require('views/app.js');
var HelpView = require('views/help.js');
var HomeView = require('views/home.js');

var splashView = new AppView({
  pages: [
    {id: 'help', view: HelpView},
    {id: 'home', view: HomeView}
  ],
  page: 1
});