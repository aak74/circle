var segment_labels = knowledges.reduce((carry, item) => {
  carry.push(item.name);
  return carry;
}, []);

var circle = [];
for (let j = 0; j < 10; j++) {
  for (let index = 0; index < knowledges.length; index++) {
    circle.push(knowledges[index].level[j] * (index + 1));
  }
}
// console.log(data);

// var colorScheme = d3.scaleOrdinal(d3.schemeCategory10);
var colorScheme = d3.schemePaired;
// colorScheme[0] = "#eeeeee";
// colorScheme.unshift("#eeeeee");

var domain = [];
for (let index = 0; index < 12; index++) {
  domain.push(index);
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