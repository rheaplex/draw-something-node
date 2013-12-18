/*  polyline.js - A polyline.
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

var Point = require('./point');

var Polyline = function () 
{
  this.points = [];
}

Polyline.prototype.append = function (p)
{
  // Push is slllllllllow
  this.points.push (p);
}

Polyline.prototype.random_points_in_bounds = function (x, y, width, height,
                                                       count) {
  for (var i = 0; i < count; i++)
  {
	var x_pos = Math.random () * width;
	var y_pos = Math.random () * height;
	var p = new Point (x + x_pos, y + y_pos);
    this.append(p);
  }
}

// http://www.gamasutra.com/features/20000210/lander_l3.htm

Polyline.prototype.nearest_point_on_line = function (a, b, c) {
  // SEE IF a IS THE NEAREST POINT - ANGLE IS OBTUSE
  var dot_ta = (c.x - a.x) * (b.x - a.x) + 
	  (c.y - a.y) * (b.y - a.y);
  if (dot_ta <= 0) // IT IS OFF THE AVERTEX
  {
	return new Point (a.x , a.y);
  }
  var dot_tb = (c.x - b.x) * (a.x - b.x) + 
	  (c.y - b.y) * (a.y - b.y);
  // SEE IF b IS THE NEAREST POINT - ANGLE IS OBTUSE
  if (dot_tb <= 0)
  {
	return new Point (b.x, b.y);
  }
  // FIND THE REAL NEAREST POINT ON THE LINE SEGMENT
  // BASED ON RATIO
  var nearest_x = a.x + ((b.x - a.x) * dot_ta) / 
	  (dot_ta + dot_tb);
  var nearest_y = a.y + ((b.y - a.y) * dot_ta) / 
	  (dot_ta + dot_tb);
  return new Point (nearest_x, nearest_y);
}

Polyline.prototype.distance_from_line_to_point = function (a, b, c)
{
  var nearest = this.nearest_point_on_line (a, b, c);
  return nearest.distance_to_point (c);
}

Polyline.prototype.distance_to_point = function (p)
{
  var distance_to_poly = Number.MAX_VALUE;
  for (var i = 1; i < this.points.length; i++)
  {
	var a = this.points[i - 1];
	var b = this.points[i];
		var d = this.distance_from_line_to_point (a, b, p);
	if (d < distance_to_poly)
	{
	  distance_to_poly = d;
	}
  }
  return distance_to_poly;
}

Polyline.prototype.top_leftmost_point = function ()
{
  var top_leftmost = this.points[0];
  for (var i = 1; i < this.points.length; i++)
  {
	if ((this.points[i].y <= top_leftmost.y) ||
		((this.points[i].y == top_leftmost.y) &&
		 ((this.points[i].x < top_leftmost.x)))) 
	{
	  top_leftmost = this.points[i];
	}
  }
  return new Point (top_leftmost.x, top_leftmost.y);
}

module.exports = Polyline;
