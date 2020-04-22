const data = [
    { time_interval: 0, messages: [ 79 ] },
    { time_interval: 1, messages: [ 64 ] },
    { time_interval: 2, messages: [ 72 ] },
    { time_interval: 3, messages: [ 77 ] },
    { time_interval: 4, messages: [ 67 ] },
    { time_interval: 5, messages: [ 81 ] },
    { time_interval: 6, messages: [ 76 ] },
    { time_interval: 7, messages: [ 77 ] },
    { time_interval: 8, messages: [ 61 ] },
    { time_interval: 9, messages: [ 71 ] },
    { time_interval: 10, messages: [ 76 ] },
    { time_interval: 11, messages: [ 70 ] },
    { time_interval: 12, messages: [ 86 ] },
    { time_interval: 13, messages: [ 60 ] },
    { time_interval: 14, messages: [ 68 ] },
    { time_interval: 15, messages: [ 80 ] },
    { time_interval: 16, messages: [ 76 ] },
    { time_interval: 17, messages: [ 75 ] },
    { time_interval: 18, messages: [ 86 ] },
    { time_interval: 19, messages: [ 79 ] },
    { time_interval: 20, messages: [ 86 ] },
    { time_interval: 21, messages: [ 72 ] },
    { time_interval: 22, messages: [ 71 ] },
    { time_interval: 23, messages: [ 90 ] }
];

// start of visualization
const margin = {top: 40, right: 0, bottom: 30, left: 50};
const height = 800 - margin.top - margin.bottom;
const width = 1300 - margin.left - margin.right;
const bar_width = 50;

const svg = d3.select('body')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// x scale
const x_scale = d3.scale.linear()
    .domain([0, d3.max(data.map(d => d.time_interval)) + 1])
    .range([0, width - 10]);
const x_axis = d3.svg.axis()
    .scale(x_scale)
    .orient('bottom')
    .ticks(25)
    .tickSize(2);

// y scale
const y_scale = d3.scale.linear()
    .domain([0, 100])
    .range([height, 0])
const y_axis = d3.svg.axis()
    .scale(y_scale)
    .orient('left')
    .ticks(20)
    .tickSize(2);

const color_scale = d3.scale.category20c();
color_scale.domain(data.map(d=> d.time_interval));

const tooltip = d3.select('body').append('text').attr('class', 'tooltip').style('visibility', 'hidden');

// title
svg.append('g')
    .attr('class', 'label title')
    .attr('transform','translate(' + width / 3 + ',' + margin.top + ')')
    .append('text')
    .text('Total messages By time interval visualization chart for Nebraskans');

//x axis
svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(' + margin.left + ',' + height +')')
    .call(x_axis)
    .append('text')
    .attr('class', 'label')
    .attr('x', width/2)
    .attr('y', 50)
    .style('text-anchor', 'end')
    .text('Time interval (Hrs)');

// y axis
svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + 5 +')')
    .attr('class', 'y axis')
    .call(y_axis)
    .append('text')
    .attr('class', 'label')
    .attr('transform', 'rotate(-90)')
    .attr('x', 0 - height / 2.5)
    .attr('y', 0 - 30)
    .style('text-anchor', 'end')
    .text('Total Messages sent');

svg.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x_scale(d.time_interval) + bar_width)
    .attr('width', bar_width)
    .attr('y', d => y_scale(d3.max(d.messages)))
    .attr('height', d => height - y_scale(d3.max(d.messages)))
    .attr('fill', d => color_scale(d.time_interval))
    .on('mouseover', function(d) {
        d3.select(this).style('fill', 'orange');
        tooltip.style('visibility', 'visible');
        tooltip.html('messages' + ': ' + d.messages)
            .style('left', (d3.event.pageX -30) + 'px')
            .style('top', (d3.event.pageY - 30) + 'px');
    })
    .on('mouseout', function(d) {
        d3.select(this).style('fill', '#9399a1');
        tooltip.style('visibility', 'hidden');
    });






