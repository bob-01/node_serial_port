var graph = function(port) {
  var data = [];
  var data_counter = 0;
  var time_len = 10000;
  var update_interval = 40;
  var data_len = parseInt(time_len / update_interval);
  var last_data_point = 0;
  var no_data = true;
  var stop_timer = false;
  var options = {
      series: {
          shadowSize: 0 // Drawing is faster without shadows
      },
      xaxis: {
          mode: 'time',
          timeformat: '%M:%S'
      },
      colors: ['#049cdb']
  };
/*
  var plot = $.plot("#graph", [], options);
  var interval = 0;
  var timer = function() {
      if(stop_timer) {
          clearInterval(interval);
          return;
      }
      var t = Date.now();
      if(data.length >= data_len) {
          data = data.slice(1);
      }
      data.push([t, last_data_point]);
      plot.setData([data]);
      plot.setupGrid();
      plot.draw();
  };
  port.on('data', function(data) {
      last_data_point = data;
      if(no_data) {
          no_data = false;
          timer();
          interval = setInterval(function() {
              timer();
          }, update_interval);
      }
      console.log("data received: " + data);
  });
*/
};

module.exports = graph;