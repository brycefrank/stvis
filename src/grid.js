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

        selection
            .append('rect')
            .attr('x', function(d) { return ((d.x-1) % grid_width) * cell_width + grid_buffer})
            .attr('y', function(d) { return ((d.y-1) % grid_width) * cell_width + grid_buffer})
            .attr('width',  cell_width - between)
            .attr('height', cell_width - between)
            .attr('fill', function(d) {return color_scale(d.z)})
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