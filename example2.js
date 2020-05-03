const width = 600,
    height=10000;


var svg = d3.select('#figure')
    .append('svg')
    .attr('width', width).attr('height', height)


var myGrid = grid()
    .grid_width(4)
    .cell_width(32)
    .grid_buffer(2)
    .between(2)
    .color_scale(d3.scaleSequential()
                    .domain([-0.1, 0.1])
                    .interpolator(d3.interpolateViridis))


d3.csv('data/pop100.csv').then(function(cells) {
    console.log('this')
    svg
        .append('g').attr('id', 'grid')
        .selectAll('rect')
        .data(cells)
        .enter()
        .filter(function(d){return (d.x <= 2) & (d.y <= 2)})
        .call(myGrid)

    // Create a different cells that is all pairs
    cell_pairs = [];
    var n = d3.selectAll('rect').size()

    var k=0;
    var v_buff = 2;

    var rects = d3.selectAll('rect');
    var n = rects.size();

    var k = 0;
    var l = 0;
    rects.each(
        function(d,i) {
            rects.each(function(c,j) {


                d_obj = {
                    'x': d.x,
                    'y': d.y,
                    'z': d.z,
                    'target_x': 300,
                    'target_y': v_buff
                }

                c_obj = {
                    'x': c.x,
                    'y': c.y,
                    'z': c.z,
                    'target_x': 334,
                    'target_y': v_buff
                }

                cell_pairs.push(d_obj)
                cell_pairs.push(c_obj)
                v_buff += 34;

            })
        }
    )

    console.log(cell_pairs)

    svg.append('g')
        .attr('id', 'pairs')
        .selectAll('rect')
        .data(cell_pairs)
        .enter()
        .call(myGrid)

    d3.select('#pairs')
        .selectAll('rect')
        .data(cell_pairs)
        .transition()
            .delay(function(d,i){return(100*i)})
            .duration(1000)
            .attr('x', function(d,i){return(d.target_x)})
            .attr('y', function(d,i){return(d.target_y)})
})