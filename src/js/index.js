var AppView = require('views/app');
var HelpView = require('views/help');
var ListView = require('views/list');
var GraphView = require('views/graph');

var indexView = new AppView({
  user: true,
  pages: [
    {id: 'help', view: HelpView},
    {id: 'list', view: ListView},
    {id: 'graph', view: GraphView}
  ],
  page: 1
});