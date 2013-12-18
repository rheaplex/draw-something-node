/*  point.js - A 2D point.
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

var Point = function (x, y) {
	this.x = x;
	this.y = y;
}

Point.prototype.distance_to_point = function (p) {
  return Math.sqrt (Math.pow (p.x - this.x, 2) +
			        Math.pow (p.y - this.y, 2));
}

module.exports = Point;
