/*  turtle.js - A classic computer graphics 'turtle'.
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

var DEGREES_TO_RADIANS = (Math.PI * 2.0) / 360.0;

var Turtle = function (position, forward_step, turn_step) {
  this.direction = 90.0;
  
  this.position = position;
  this.forward_step = forward_step;
  this.turn_step = turn_step;
}

Turtle.prototype.left = function () {
  this.direction -= this.turn_step;
}

Turtle.prototype.right = function ()
{
  this.direction += this.turn_step;
}

Turtle.prototype.forward = function ()
{
  this.position = this.next_point_would_be ();
}

Turtle.prototype.next_point_would_be = function ()
{
  var x = this.position.x +
	  (this.forward_step * Math.sin (this.direction * DEGREES_TO_RADIANS));
  var y = this.position.y +
	  (this.forward_step * Math.cos (this.direction * DEGREES_TO_RADIANS));
  return new Point (x, y);
}

module.exports = Turtle;
