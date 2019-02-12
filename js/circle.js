const knowledges = [
  {
    name: 'Алгоритмы',
    level: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  },
  {
    name: 'Структуры данных',
    level: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  },
  {
    name: 'C++',
    level: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  },
  {
    name: 'Java',
    level: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    name: 'Golang',
    level: [1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
  },
  {
    name: 'JavaScript',
    level: [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  },
  {
    name: 'PHP',
    level: [1, 1, 1, 1, 1, 0, 0, 0, 1, 0],
  },
  {
    name: 'MySQL',
    level: [1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
  },
  {
    name: 'MongoDB',
    level: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  },
  {
    name: 'Oracle',
    level: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    name: 'GraphDB',
    level: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    name: 'Scrum',
    level: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  },
];

var circle = [];
for (let index = 0; index < knowledges.length; index++) {
  circle = circle.concat(knowledges[index].level);
}

const initialRadius = 20;
const offsetRadius = 20;
const sectors = knowledges.length;
const levels = circle.length / sectors;

const ir = function(d, i) {
  return initialRadius+(i % levels)*offsetRadius;
}
const or = function(d, i) {
  return initialRadius+(i % levels+1)*offsetRadius;
}
const sa = function(d, i) {
  return Math.floor(i / levels) * 2 * Math.PI / sectors;
}

const ea = function(d, i) {
  return (Math.floor(i / levels) + 1) * 2 * Math.PI / sectors;
}

drawCircle(circle, knowledges.length);
//Draw the chart
// var color = d3.scale.linear().domain([0.04, 1]).range(["white", "red"]);
function drawCircle(data, levels) {
  // console.log(sectorNumber, data);
  
  var color = d3.scale.linear().domain([0.04, 2]).range(["white", "blue"]);
  // const sectorAngle = 1 / (data.length / levels); 
  // const startAngle = sectorNumber * sectorAngle;
  d3.select("svg").append("g").attr("id", "chart");
  d3.select('#chart')
  .selectAll('path')
  .data(data)
  .enter().append('svg:path')
  .attr('d', d3.svg.arc().innerRadius(ir).outerRadius(or).startAngle(sa).endAngle(ea))
  // .attr('d', d3.svg.arc().innerRadius(ir).outerRadius(or).startAngle(startAngle).endAngle(startAngle + sectorAngle))
  .attr('transform', 'translate(300, 300)')
    .attr('fill', color)
    .attr("stroke", "gray")
    .attr("stroke-width", "0.3px")
}

function ts_to_datestring(ts, day_offset) {
	date = new Date(ts + day_offset * 3600 * 24 * 1000);
	return date.toDateString().slice(4, 10);
}

function calculate_totals(week_data) {
	var totals = {days:[0, 0, 0, 0, 0, 0, 0], week:0};
		for(var d=0; d<7; d++) {
			for(var h=0; h<24; h++)
				totals.days[d]+=week_data[d*24+h];
			totals.week += totals.days[d]
		}
	return totals;
}

//Labels
function addLabels() {
  var day_labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  var label_rad = 106;
  for(var i=0; i<7; i++) {
    label = day_labels[i];
    label_angle = 4.73;
    d3.select("svg").append("def")
      .append("path")
      .attr("id", "day_path"+i)
      .attr("d", "M300 300 m"+label_rad*Math.cos(label_angle)+" "+label_rad*Math.sin(label_angle)+" A"+label_rad+" "+label_rad+" 90 0 1 "+(300+label_rad)+" 300");
    d3.select("svg").append("text")
      .attr("class", "day label")
      .append("textPath")
      .attr("xlink:href", "#day_path"+i)
      .text(label);
    label_rad += rad_offset;
  }

  label_rad = 280;
  d3.select("svg").append("def")
    .append("path")
    .attr("id", "time_path")
    .attr("d", "M300 "+(300-label_rad)+" a"+label_rad+" "+label_rad+" 0 1 1 -1 0");



  for(var i=0; i<24; i++) {
    label_angle = (i-6)*(2*Math.PI/24);
    large_arc = i<6 || i> 18? 0 : 1;
    d3.select("svg").append("text")
      .attr("class", "time label")
      .append("textPath")
      .attr("xlink:href", "#time_path")
      .attr("startOffset", i*100/24+"%")
      .text(i);
  }
}
