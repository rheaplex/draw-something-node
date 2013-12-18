/*  draw_node_svg.js - Draw to SVG and write to stdout using node.js.
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

var DrawingSVG = require('./drawing_svg');

var draw_something = new DrawingSVG(600, 400, 12);
draw_something.draw();
var svg = draw_something.toSVG(true, 'stroke: black 5px; fill: none;',
                               'stroke: red 1px; fill: none');

console.log(svg);
