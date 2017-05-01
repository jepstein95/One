var BaseView = require('views/base');

module.exports = BaseView.extend({

  el: '#graph',

  template: require('templates.js')['graph'],

  threads: [],
  checked: [],
  pallete: [
    '#DB2828',
    '#F2711C',
    '#FFD700',
    '#B5CC18',
    '#21BA45',
    '#00B5AD',
    '#2185D0',
    '#6435C9',
    '#A333C8',
    '#E03997',
    '#A5673F',
    '#1B1C1D'
  ],

  events: {
    'change :checkbox': 'on_change'
  },

  atc_events: {
    'update-graph': 'update_graph'
  },

  initialize: function(options) {
    BaseView.prototype.initialize.call(this, options);
    google.charts.load('current', {'packages':['corechart']});
    this.render(true);
    $(window).on('orientationchange', this.draw.bind(this));
  },

  render: function(loading) {
    this.$el.html(this.template({threads: this.threads, checked: this.checked, loading: loading}));
    this.draw();
  },

  update_graph: function(threads) {
    this.checked = _.map(threads, function(thread) { return thread._id; });
    this.threads = _.map(threads, function(thread, i) {
      thread.color = this.pallete[i % this.pallete.length];
      return thread;
    }, this);
    this.data = this.format_data();
    this.render();
  },

  on_change: function(e) {
    this.checked = _.map($(':checked').serializeArray(), function(obj) {
      return obj.name;
    });
    this.draw();
  },

  draw: function() {
    if (!this.threads.length) return;

    /*var colors = _.map(this.threads, function(thread) {
      return (_.contains(this.checked, thread._id)) ? thread.color : '#767676';
    }, this);*/
    var colors = _.map(this.threads, function(thread) { return thread.color; });

    var options = {
      colors: colors,
      legend: {
        position: 'none'
      }
    };

    var chart = new google.visualization.LineChart(document.getElementById('line-chart'));
    chart.draw(this.data, options);

    var disabled = _.map(this.threads, function(thread, i) {
      return (_.contains(this.checked, thread._id)) ? 0 : i + 1;
    }, this);

    _.each(disabled, function(i) {
      if (i) $('#line-chart path:nth-child(' + i + ')').css({opacity: '0'});
    });
  },

  format_data: function() {

    /* Alright, I know this is a mess so bear with me...
     *
     * The goal here is to make a 2d array of the following format:
     *
     *    [ [date_1, thread_1 score, thread_2 score, ... , thread_n score],
     *      [date_2, thread_1 score, thread_2 score, ... , thread_n Score],
     *                                ...
     *      [date_m, thread_1 score, thread_2 score, ... , thread_3 score] ]
     *
     */

    // First, get a list of dates. The first thread is the oldest, so use that
    var first = new Date(this.threads[0].log[0].date);
    first.setDate(first.getDate() - 1);
    var dates = [first];
    _.each(this.threads[0].log, function(mark) {
      dates.push(new Date(mark.date));
    });

    // Filter threads based on checkboxes
    var threads = _.filter(this.threads, function(thread) {
      return _.contains(this.checked, thread._id);
    }, this);

    // Now, convert each thread to a simple list of 1's and -1's
    threads = _.map(threads, function(thread) {
      return _.map(thread.log, function(mark) {
        return (mark.mark) ? 1 : -1;
      });
    });

    // Make a 2d array of <dates.length> rows
    var rows = [];
    _.each(dates, function(date) {
      rows.push([date]);
    });

    // And populate it with the modified threads
    rows = _.map(rows, function(row, i) {
      _.each(threads, function(thread) {

        // If the thread hadn't been started yet, push 0
        if (i + thread.length < rows.length)
          row.push(0);

        // Otherwise, push the value for row i
        else
          row.push(thread[i - (rows.length - thread.length)]);
      });
      return row;
    });

    // Finally, sum all columns
    for (var i = 0; i < rows.length; i++) {

      // First row is already set
      if (i === 0) continue;
      
      var row = rows[i];
      for (var j = 0; j < row.length; j++) {

        // Don't mess with the dates
        if (j == 0) continue;

        // Otherwise add the current cell to the cell above
        rows[i][j] = rows[i][j] + rows[i-1][j];
        if (rows[i][j] < 0) rows[i][j] = 0;
      }
    }

    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    _.each(threads, function(thread) {
      data.addColumn('number', thread.name);
    });
    data.addRows(rows);

    return data;
  }

});