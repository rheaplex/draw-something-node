/*  drawing_svg.js - Draw to SVG.
    Copyright 2004-5, 2013 Rob Myers <rob@robmyers.org>
  
    This file is part of draw-something js.
    
    draw-something js is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 3 of the License, or
    (at your option) any later version.
    
    draw-something js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var builder = require('xmlbuilder');

var Drawing = require('./drawing');

var DrawingSVG = function (width, height, num_points) {
  this.drawing = new Drawing (width, height, num_points);
}

DrawingSVG.prototype.draw = function () {
  while(! this.drawing.should_finish ()) {
    this.drawing.to_next_point ();
  }
}

DrawingSVG.prototype.polyline_to_SVG = function (polyline, style) {
  var d = ' M ' + polyline.points[0].x.toFixed(3) 
      + ' ' + polyline.points[0].y.toFixed(3);
  for (var i = 1; i < (polyline.points.length); i++) {
    d += ' L ' + polyline.points[i].x.toFixed(3) 
      + ' ' + polyline.points[i].y.toFixed(3);
  }
  var svg = {'path': {'@d':d}};
  if (style) {
    svg['path']['@style'] = style;
  }
  return svg;
}

DrawingSVG.prototype.toSVG  = function (show_skeleton, style,
                                        skeleton_style) {
  var viewbox = '0 0 ' + this.drawing.width + ' ' + this.drawing.height;
  var svg = builder.create('svg', 
                           {version: '1.0', encoding: 'UTF-8',
                            standalone: true});
  svg.attribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.attribute('version', '1.1');
  svg.attribute('width', this.drawing.width);
  svg.attribute('height', this.drawing.height);
  svg.attribute('viewbox', viewbox);
  svg.element(this.polyline_to_SVG(this.drawing.outline, style));
  if (show_skeleton) {
    svg.element(this.polyline_to_SVG(this.drawing.skeleton, skeleton_style));
  }
  return svg.end({ pretty: true});
}

module.exports = DrawingSVG;
