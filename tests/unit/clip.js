﻿define([
	"require", "intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/gfx", "gfx/matrix"
], function (require, registerSuite, assert, tu, gfx, matrix) {

	var surface, clipped = [];

	var drawGrid = function () {
		var sz = surface.getDimensions();
		for (var r = 0; r < sz.height; r += 50) {
			surface.createLine({y1: r, x1: 0, x2: sz.width, y2: r}).stroke = {width: 1, color: "#cfcfcf"};
		}
		for (var c = 0; c < sz.width; c += 50) {
			surface.createLine({y1: 0, x1: c, x2: c, y2: sz.height}).stroke = {width: 1, color: "#cfcfcf"};
		}
	};

	var img = require.toUrl("../images/maps.png");

	tu.registerSuite({
		name: "Clipping",
		setup: function () {
			surface = tu.createSurface(600, 500);
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		"clipping": function () {

			drawGrid();
			var imageShape = surface.createImage({src: img, width: 200, height: 200});
			imageShape.clip = {x: 10, y: 80, width: 50, height: 50};
			imageShape.transform = matrix.translate(200, 200);
			clipped.push(imageShape);
			var rect = surface.createRect({width: 200, height: 200});
			rect.stroke = "red";
			rect.transform = matrix.translate(200, 200);
			// clip = ellipse
			imageShape = surface.createImage({src: img, x: 100, y: 50, width: 200, height: 200});
			imageShape.clip = {cx: 200, cy: 100, rx: 20, ry: 30};
			clipped.push(imageShape);
			surface.createRect({x: 100, y: 50, width: 200, height: 200}).stroke = "green";
			// clip = circle
			imageShape = surface.createImage({src: img, x: 0, y: 350, width: 200, height: 200});
			imageShape.clip = {cx: 100, cy: 425, rx: 60, ry: 60};
			clipped.push(imageShape);
			surface.createRect({x: 0, y: 350, width: 200, height: 200}).stroke = "blue";
			// clip = path
			imageShape = surface.createImage({src: img, x: 300, y: 350, width: 200, height: 200});
			imageShape.clip = {d: "M 350,350 C314,414 317,557 373,450.0000 z"};
			clipped.push(imageShape);
			surface.createRect({x: 300, y: 350, width: 200, height: 200}).stroke = "#00FFFF";
			// clip = polyline
			imageShape = surface.createImage({src: img, x: 300, y: 0, width: 200, height: 200});
			imageShape.clip = {points: [350, 0, 450, 50, 380, 130, 300, 110]};
			clipped.push(imageShape);
			surface.createRect({x: 300, y: 0, width: 200, height: 200}).stroke = "#FF00FF";

			var g1 = surface.createGroup();
			g1.transform = matrix.translate(50, 200);
			g1.clip = {x: 20, y: 20, width: 90, height: 150};
			var g = g1.createGroup();
			g.createRect({width: 70, height: 100}).fill = "#8B8878";
			g.createEllipse({cx: 50, cy: 90, rx: 40, ry: 20}).fill = "#CDB79E";
			g.clip = {x: 0, y: 60, width: 80, height: 30};
			g.createRect(g.getBoundingBox()).stroke = "#CDB79E";
			clipped.push(g);

			g = g1.createGroup();
			g.createRect({width: 70, height: 100}).fill = "#8B8878";
			g.createEllipse({cx: 50, cy: 90, rx: 40, ry: 20}).fill = "#CDB79E";
			g.clip = {x: 0, y: 60, width: 70, height: 50};
			g.transform = matrix.translate(50, 50);
			g.createRect(g.getBoundingBox()).stroke = "#CDB79E";
			clipped.push(g);
			rect = surface.createRect(g1.getBoundingBox());
			rect.stroke = "#8B8878";
			rect.transform = matrix.translate(50, 200);

			rect = surface.createRect({x: 50, y: 50, width: 100, height: 100});
			rect.clip = {x: 50, y: 50, width: 50, height: 50};
			rect.fill = "yellow";
			rect.transform = matrix.scaleAt(2, 2, 50, 50);
			clipped.push(rect);
			g = surface.createGroup();
			var gg = g.createGroup();
			gg.transform = matrix.scaleAt(2, 2, 50, 250);
			gg.clip = {x: 100, y: 300, width: 50, height: 50};
			gg.createRect({x: 50, y: 250, width: 100, height: 100}).fill = "red";
			clipped.push(gg);
			rect = surface.createRect({x: 50, y: 350, width: 50, height: 50});
			rect.clip = {x: 75, y: 375, width: 25, height: 25};
			rect.fill = "green";
			clipped.push(rect);

			tu.compareWithImages(this, surface, {
				/* jshint maxlen:100000, quotmark:single */
				svg: '<defs></defs><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="0" y1="0" x2="600" y2="0" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="0" y1="50" x2="600" y2="50" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="0" y1="100" x2="600" y2="100" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="0" y1="150" x2="600" y2="150" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="0" y1="200" x2="600" y2="200" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="0" y1="250" x2="600" y2="250" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="0" y1="300" x2="600" y2="300" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="0" y1="350" x2="600" y2="350" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="0" y1="400" x2="600" y2="400" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="0" y1="450" x2="600" y2="450" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="0" y1="0" x2="0" y2="500" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="50" y1="0" x2="50" y2="500" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="100" y1="0" x2="100" y2="500" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="150" y1="0" x2="150" y2="500" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="200" y1="0" x2="200" y2="500" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="0" x2="250" y2="500" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="300" y1="0" x2="300" y2="500" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="350" y1="0" x2="350" y2="500" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="400" y1="0" x2="400" y2="500" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="450" y1="0" x2="450" y2="500" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="500" y1="0" x2="500" y2="500" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(207, 207, 207)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="550" y1="0" x2="550" y2="500" stroke-dasharray="none"></line><clipPath id="gfx_clip1"><rect x="10" y="80" width="50" height="50"></rect></clipPath><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="200" height="200" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/maps.png" clip-path="url(#gfx_clip1)" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,200.00000000,200.00000000)"></image><rect fill="none" fill-opacity="0" stroke="rgb(255, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="200" height="200" ry="0" rx="0" stroke-dasharray="none" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,200.00000000,200.00000000)"></rect><clipPath id="gfx_clip2"><ellipse cx="200" cy="100" rx="20" ry="30"></ellipse></clipPath><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="100" y="50" width="200" height="200" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/maps.png" clip-path="url(#gfx_clip2)"></image><rect fill="none" fill-opacity="0" stroke="rgb(0, 128, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="100" y="50" width="200" height="200" ry="0" rx="0" stroke-dasharray="none"></rect><clipPath id="gfx_clip3"><ellipse cx="100" cy="425" rx="60" ry="60"></ellipse></clipPath><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="350" width="200" height="200" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/maps.png" clip-path="url(#gfx_clip3)"></image><rect fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="350" width="200" height="200" ry="0" rx="0" stroke-dasharray="none"></rect><clipPath id="gfx_clip4"><path d="M 350,350 C314,414 317,557 373,450.0000 z"></path></clipPath><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="300" y="350" width="200" height="200" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/maps.png" clip-path="url(#gfx_clip4)"></image><rect fill="none" fill-opacity="0" stroke="rgb(0, 255, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="300" y="350" width="200" height="200" ry="0" rx="0" stroke-dasharray="none"></rect><clipPath id="gfx_clip5"><polyline points="350,0,450,50,380,130,300,110"></polyline></clipPath><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="300" y="0" width="200" height="200" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/maps.png" clip-path="url(#gfx_clip5)"></image><rect fill="none" fill-opacity="0" stroke="rgb(255, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="300" y="0" width="200" height="200" ry="0" rx="0" stroke-dasharray="none"></rect><clipPath id="gfx_clip6"><rect x="20" y="20" width="90" height="150"></rect></clipPath><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,50.00000000,200.00000000)" clip-path="url(#gfx_clip6)"><clipPath id="gfx_clip7"><rect x="0" y="60" width="80" height="30"></rect></clipPath><g clip-path="url(#gfx_clip7)"><rect fill="rgb(139, 136, 120)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="70" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><ellipse fill="rgb(205, 183, 158)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" cx="50" cy="90" rx="40" ry="20" fill-rule="evenodd"></ellipse><rect fill="none" fill-opacity="0" stroke="rgb(205, 183, 158)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="90" height="110" ry="0" rx="0" stroke-dasharray="none"></rect></g><clipPath id="gfx_clip8"><rect x="0" y="60" width="70" height="50"></rect></clipPath><g clip-path="url(#gfx_clip8)" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,50.00000000,50.00000000)"><rect fill="rgb(139, 136, 120)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="70" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><ellipse fill="rgb(205, 183, 158)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" cx="50" cy="90" rx="40" ry="20" fill-rule="evenodd"></ellipse><rect fill="none" fill-opacity="0" stroke="rgb(205, 183, 158)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="90" height="110" ry="0" rx="0" stroke-dasharray="none"></rect></g></g><rect fill="none" fill-opacity="0" stroke="rgb(139, 136, 120)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="140" height="160" ry="0" rx="0" stroke-dasharray="none" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,50.00000000,200.00000000)"></rect><clipPath id="gfx_clip9"><rect x="50" y="50" width="50" height="50"></rect></clipPath><rect fill="rgb(255, 255, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="50" y="50" width="100" height="100" ry="0" rx="0" clip-path="url(#gfx_clip9)" fill-rule="evenodd" transform="matrix(2.00000000,0.00000000,0.00000000,2.00000000,-50.00000000,-50.00000000)"></rect><g><clipPath id="gfx_clip10"><rect x="100" y="300" width="50" height="50"></rect></clipPath><g transform="matrix(2.00000000,0.00000000,0.00000000,2.00000000,-50.00000000,-250.00000000)" clip-path="url(#gfx_clip10)"><rect fill="rgb(255, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="50" y="250" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect></g></g><clipPath id="gfx_clip11"><rect x="75" y="375" width="25" height="25"></rect></clipPath><rect fill="rgb(0, 128, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="50" y="350" width="50" height="50" ry="0" rx="0" clip-path="url(#gfx_clip11)" fill-rule="evenodd"></rect>',
				canvas: '["s","s","b","m",0,0,"l",600,0,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",0,50,"l",600,50,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",0,100,"l",600,100,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",0,150,"l",600,150,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",0,200,"l",600,200,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",0,250,"l",600,250,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",0,300,"l",600,300,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",0,350,"l",600,350,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",0,400,"l",600,400,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",0,450,"l",600,450,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",0,0,"l",0,500,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",50,0,"l",50,500,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",100,0,"l",100,500,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",150,0,"l",150,500,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",200,0,"l",200,500,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",250,0,"l",250,500,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",300,0,"l",300,500,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",350,0,"l",350,500,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",400,0,"l",400,500,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",450,0,"l",450,500,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",500,0,"l",500,500,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",550,0,"l",550,500,"fil","0,0,0,0.0","stro","207,207,207,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","t",200,200,"ro",0,"sc",1,1,"ro",0,"b","m",10,80,"l",60,80,"l",60,130,"l",10,130,"l",10,80,"c","cl","d","../../../gfx/tests/images/maps.png",0,0,200,200,"fil","0,0,0,0.0","r","s","t",200,200,"ro",0,"sc",1,1,"ro",0,"b","m",0,0,"l",200,0,"l",200,200,"l",0,200,"l",0,0,"c","fil","0,0,0,0.0","stro","255,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",218.4776,88.5195,"be",220.5075,95.8703,220.5075,104.1297,218.4776,111.4805,"be",216.4477,118.8313,212.5542,124.6716,207.6537,127.7164,"be",202.7531,130.7612,197.2469,130.7612,192.3463,127.7164,"be",187.4458,124.6716,183.5523,118.8313,181.5224,111.4805,"be",179.4925,104.1297,179.4925,95.8703,181.5224,88.5195,"be",183.5523,81.1687,187.4458,75.3284,192.3463,72.2836,"be",197.2469,69.2388,202.7531,69.2388,207.6537,72.2836,"be",212.5542,75.3284,216.4477,81.1687,218.4776,88.5195,"c","cl","d","../../../gfx/tests/images/maps.png",100,50,200,200,"fil","0,0,0,0.0","r","s","b","m",100,50,"l",300,50,"l",300,250,"l",100,250,"l",100,50,"c","fil","0,0,0,0.0","stro","0,128,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",155.4328,402.039,"be",161.5224,416.7407,161.5224,433.2593,155.4328,447.961,"be",149.3431,462.6627,137.6627,474.3431,122.961,480.4328,"be",108.2593,486.5224,91.7407,486.5224,77.039,480.4328,"be",62.3373,474.3431,50.6569,462.6627,44.5672,447.961,"be",38.4776,433.2593,38.4776,416.7407,44.5672,402.039,"be",50.6569,387.3373,62.3373,375.6569,77.039,369.5672,"be",91.7407,363.4776,108.2593,363.4776,122.961,369.5672,"be",137.6627,375.6569,149.3431,387.3373,155.4328,402.039,"c","cl","d","../../../gfx/tests/images/maps.png",0,350,200,200,"fil","0,0,0,0.0","r","s","b","m",0,350,"l",200,350,"l",200,550,"l",0,550,"l",0,350,"c","fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",350,350,"be",314,414,317,557,373,450,"c","cl","d","../../../gfx/tests/images/maps.png",300,350,200,200,"fil","0,0,0,0.0","r","s","b","m",300,350,"l",500,350,"l",500,550,"l",300,550,"l",300,350,"c","fil","0,0,0,0.0","stro","0,255,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",350,0,"l",450,50,"l",380,130,"l",300,110,"cl","d","../../../gfx/tests/images/maps.png",300,0,200,200,"fil","0,0,0,0.0","r","s","b","m",300,0,"l",500,0,"l",500,200,"l",300,200,"l",300,0,"c","fil","0,0,0,0.0","stro","255,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","t",50,200,"ro",0,"sc",1,1,"ro",0,"b","m",20,20,"l",110,20,"l",110,170,"l",20,170,"l",20,20,"c","cl","s","b","m",0,60,"l",80,60,"l",80,90,"l",0,90,"l",0,60,"c","cl","s","b","m",0,0,"l",70,0,"l",70,100,"l",0,100,"l",0,0,"c","fil","139,136,120,1","f","r","s","b","m",86.9552,82.3463,"be",91.0149,87.2469,91.0149,92.7531,86.9552,97.6537,"be",82.8954,102.5542,75.1085,106.4477,65.3073,108.4776,"be",55.5062,110.5075,44.4938,110.5075,34.6927,108.4776,"be",24.8915,106.4477,17.1046,102.5542,13.0448,97.6537,"be",8.9851,92.7531,8.9851,87.2469,13.0448,82.3463,"be",17.1046,77.4458,24.8915,73.5523,34.6927,71.5224,"be",44.4938,69.4925,55.5062,69.4925,65.3073,71.5224,"be",75.1085,73.5523,82.8954,77.4458,86.9552,82.3463,"c","fil","205,183,158,1","f","r","s","b","m",0,0,"l",90,0,"l",90,110,"l",0,110,"l",0,0,"c","fil","0,0,0,0.0","stro","205,183,158,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r","s","t",50,50,"ro",0,"sc",1,1,"ro",0,"b","m",0,60,"l",70,60,"l",70,110,"l",0,110,"l",0,60,"c","cl","s","b","m",0,0,"l",70,0,"l",70,100,"l",0,100,"l",0,0,"c","fil","139,136,120,1","f","r","s","b","m",86.9552,82.3463,"be",91.0149,87.2469,91.0149,92.7531,86.9552,97.6537,"be",82.8954,102.5542,75.1085,106.4477,65.3073,108.4776,"be",55.5062,110.5075,44.4938,110.5075,34.6927,108.4776,"be",24.8915,106.4477,17.1046,102.5542,13.0448,97.6537,"be",8.9851,92.7531,8.9851,87.2469,13.0448,82.3463,"be",17.1046,77.4458,24.8915,73.5523,34.6927,71.5224,"be",44.4938,69.4925,55.5062,69.4925,65.3073,71.5224,"be",75.1085,73.5523,82.8954,77.4458,86.9552,82.3463,"c","fil","205,183,158,1","f","r","s","b","m",0,0,"l",90,0,"l",90,110,"l",0,110,"l",0,0,"c","fil","0,0,0,0.0","stro","205,183,158,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r","r","s","t",50,200,"ro",0,"sc",1,1,"ro",0,"b","m",0,0,"l",140,0,"l",140,160,"l",0,160,"l",0,0,"c","fil","0,0,0,0.0","stro","139,136,120,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","t",-50,-50,"ro",0,"sc",2,2,"ro",0,"b","m",50,50,"l",100,50,"l",100,100,"l",50,100,"l",50,50,"c","cl","b","m",50,50,"l",150,50,"l",150,150,"l",50,150,"l",50,50,"c","fil","255,255,0,1","f","r","s","s","t",-50,-250,"ro",0,"sc",2,2,"ro",0,"b","m",100,300,"l",150,300,"l",150,350,"l",100,350,"l",100,300,"c","cl","s","b","m",50,250,"l",150,250,"l",150,350,"l",50,350,"l",50,250,"c","fil","255,0,0,1","f","r","r","r","s","b","m",75,375,"l",100,375,"l",100,400,"l",75,400,"l",75,375,"c","cl","b","m",50,350,"l",100,350,"l",100,400,"l",50,400,"l",50,350,"c","fil","0,128,0,1","f","r","r"]'
				/* jshint maxlen:120, quotmark:double */
			});
		}
	});
});