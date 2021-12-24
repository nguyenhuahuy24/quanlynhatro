
var optionsBar = {
  seriesBarDistance: 10,
  axisX: {
    showGrid: false
  },
  height: "265px",
  plugins: [
        ChartistTooltip({
          appendToBody: true
        })
      ]
};
var responsiveBar = [
  [
    "screen and (max-width: 640px)",
    {
      seriesBarDistance: 10,
      axisX: {
        labelInterpolationFnc: function(value) {
          return value[0];
        }
      }
    }
  ]
];
var legendBar = {
  names: ["Tesla Model S", "BMW 5 Series"],
  types: ["info", "danger"]
};

module.exports = {
  optionsBar,
  responsiveBar,
  legendBar // For charts (Dashboard view)
};
