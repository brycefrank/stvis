
// Attempting to make a reusable grid figure function
// based on https://bost.ocks.org/mike/chart/
// for simplicity this will always be square
function grid() {

    function my(selection) {
        const grid_width = my.grid_width(),
        cell_width = my.cell_width(),
        grid_buffer = my.grid_buffer(),
        color_scale = my.color_scale(),
        between = my.between();

        selection.each(
            function(d, i) {
                d3.select(this)
                    .append('rect')
                    .attr('x', function(d) { return ((d.x-1) % grid_width) * cell_width + grid_buffer})
                    .attr('y', function(d) { return ((d.y-1) % grid_width) * cell_width + grid_buffer})
                    .attr('width',  cell_width - between)
                    .attr('height', cell_width - between)
                    .attr('fill', color_scale(d.z))
            }
        )
    }

    // The number of cells on a side
    my.grid_width = function(value) {
        if (!arguments.length) return grid_width;
        grid_width = value;
        return my;
    }

    // The width of a cell in pixels
    my.cell_width = function(value) {
        if (!arguments.length) return cell_width;
        cell_width = value;
        return my;
    }

    // The width of the area between cells in pixels
    my.between = function(value) {
        if (!arguments.length) return between;
        between = value;
        return my;
    }

    // The outer buffer of the grid
    my.grid_buffer = function(value) {
        if (!arguments.length) return grid_buffer;
        grid_buffer = value;
        return my;
    }

    // The color scale
    my.color_scale = function(value) {
        if (!arguments.length) return color_scale;
        color_scale = value;
        return my;
    }

    return my;
}

// A pair is two circles connected with a line that can be moved
// by the user and provide access to their current x,y positions
function pair() {
    function my(selection) {
        var width = my.width();
        var height = my.height();
        var radius = my.radius();


        // Init two circles
        var circles = d3.range(2).map(function() {
            return {
                x: Math.round(Math.random() * (width - radius * 2) + radius),
                y: Math.round(Math.random() * (height - radius * 2) + radius)
            };
        });


        // Add circles to selection
        selection
            .selectAll('circle')
            .data(circles)
            .enter()
            .append('circle')
            .attr('cx', function(d){return d.x})
            .attr('cy', function(d){return d.y})
            .attr('r', radius).attr('fill', 'yellow').attr('stroke', 'black')
            .on("click", clicked)
            .call(d3.drag()
                .clickDistance(CLICK_DISTANCE)
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
    }

    my.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return my;
    }

    my.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return my;
    }

    my.radius = function(value) {
        if(!arguments.length) return radius;
        radius = value;
        return my;
    }

    return my;

}