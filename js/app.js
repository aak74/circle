const knowledges = [
  {
    name: 'Alghorithms',
    level: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  },
  {
    name: 'Data structure',
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

// var segment_labels = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

var segment_labels = knowledges.reduce((carry, item) => {
  carry.push(item.name);
  return carry;
}, []);

var circle = [];
for (let j = 0; j < 10; j++) {
  for (let index = 0; index < knowledges.length; index++) {
    circle.push(knowledges[index].level[j] * (index + 1) / 12);
  }
}
// console.log(data);

// var colorScheme = d3.scaleOrdinal(d3.schemeCategory10);
var colorScheme = d3.schemePaired;
colorScheme.unshift("#dddddd");
// console.log(colorScheme, segmentLabels, segment_labels);

var domain = [];
for (let index = 0; index < 12; index++) {
  domain.push(index / 12);
}

var color = d3.scaleLinear()
.domain(domain)
.range(colorScheme)

var chart = circularHeatChart()
  .innerRadius(20)
  .numSegments(12)
  // .domain([0, 10000])
  // .range(["brown", "steelblue"])
  .color(color)
  .segmentLabels(segment_labels);
  // .segmentLabels(segmentLabels);


d3.select('#chart')
  .selectAll('svg')
  .data([circle])
  .enter()
  .append('svg')
  .call(chart);