// Copyright 2013 Rob Myers <rob@robmyers.org>
//     
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

"use strict";

var MongoClient = require('mongodb').MongoClient;
var Tumblr = require('tumblrwks');

var Config = require('../lib/config.js');
var DrawingSVG = require('../lib/drawing_svg.js');

// The module encapsulates this.
// And we can avoid callback function 'this' problems and endless wrappers
// by using functions that refer to it directly.
var state = {
  // This will be called approximately once a day, so is fine
  run_id: (new Date).getTime()
};

var config = null;

var mongo_url = null;

var draw_something = function (url) {
  mongo_url = url;
  Config.fetch(mongo_url, receiveConfig);
};

var receiveConfig = function (c) {
  config = c;
  createDrawing();
};

var numberOfPoints = function() {
  return config.points_min
    + Math.floor(Math.random() * (config.points_max - config.points_min));
};

var createDrawing = function() {
  config.num_points = numberOfPoints();
  var drawing = new DrawingSVG(config.image_width, config.image_height,
                               config.num_points);
  drawing.draw();
  state.svg = drawing.toSVG(true,
                            'stroke: black; stroke-width: 1.25px; fill: none;',
                            'stroke: #EEEEFF; stroke-width: 1px; fill: none');
  sendToTumblr();
};

var sendToTumblr = function () {
  var tumblr = new Tumblr(
  {
    consumerKey: config.tumblr_consumer_key,
    consumerSecret: config.tumblr_consumer_secret,
    accessToken: config.tumblr_access_token,
    accessSecret: config.tumblr_access_secret
  }, config.tumblr_blog_url);
  var svg = state.svg.replace(/<\?xml[^\?]+\?>/, '');
  var body = '<div style="display: inline-block; outline: #DDDDDD solid 1px;">'
      + svg
      + '</div>'
  var post = { type: 'text',
               title: state.run_id,
               body: body
              };
  tumblr.post('/post', post, function(err, result){
    if (err) throw err;
    state.tumblr_post_id = result.id;
    saveToMongo();
  });
};

var saveToMongo = function () {
  // Compress before archiving
  // No, it will take ages to fill a Gigabyte
  //zlib.gzip(state.svg, function(err, buffer) {
  //  if (err) throw err;
  //  state.svg = buffer.toString();
  //});
  MongoClient.connect(mongo_url, function(err, db) {
    if(err) throw err;
    var collection = db.collection('drawsomething');
    collection.insert(state, function (err, doc) {
      if (err) throw err;
      db.close();
    });
  });
};

module.exports.draw_something = draw_something;
