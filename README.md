# stvis
Re-usable d3 components for statistical visualizations.

This repository holds a number of reusable components for creating educational visualizations for
statistics for the d3 visualization library. Each component is implemented using the general
philosophy described [here](https://bost.ocks.org/mike/chart/).

## `grid`

### Data

`grid` represents a set of square cells, typically used to construct a simulated spatial population.
Provide data such that:

```
var cells = [
    {x: "23", y: "30", z: "-0.22749336682146"},
    {x: "24", y: "30", z: "-0.27311257527676"},
    {x: "25", y: "30", z: "-0.147085050103258"},
    {x: "26", y: "30", z: "-0.0279981860230725"},
    {x: "27", y: "30", z: "0.0299189645510937"},
    ...
    {x: "28", y: "30", z: "-0.0745176411378357"}
]
```

`x` refers to a column index and `y` refers to a row index and `z` refers to a population unit
value. Such a configuration could be made from a csv file (see `data/pop100.csv`). Such a dataset might
come from a simulated population from some other software. I used R, for example, but it is also
possible to simply construct a JavaScript object natively.

### Construction

Constructing a grid is straightforward, and mimics other `d3` structures like axes, color scales, etc.

```
var myGrid = grid()
    .grid_width(100) // The number of cells on a side (this would be a 100x100 grid)
    .cell_width(8)   // The width of the cells in pixels
    .grid_buffer(2)  // The margin around the grid in pixels
    .between(1)      // The space between cells in pixels
    .color_scale(d3.scaleSequential() // The color scale specification for `z`
                    .domain([-0.3, 0.3])
                    .interpolator(d3.interpolateViridis))
```

Finally, append the data and call it on your selection.

```
mySelection
    .datum(cells)
    .call(myGrid)
```