const width = 600,
    height=600;

var svg = d3.select('#figure')
    .append('svg')
    .attr('width', width).attr('height', height)


d3.csv('data/pop100.csv', function(cells) {
    var myGrid = grid()
        .grid_width(100)
        .cell_width(8)
        .grid_buffer(2)
        .between(1)
        .color_scale(d3.scaleSequential()
                        .domain([-0.3, 0.3])
                        .interpolator(d3.interpolateViridis))

    svg
        .datum(cells)
        .call(myGrid)
})