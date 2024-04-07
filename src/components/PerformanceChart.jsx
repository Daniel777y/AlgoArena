import React from "react";
import PropTypes from "prop-types";

const PerformanceChart = ({ platform, performance }) => {
  console.log("PerformanceChart", platform, performance);
  return (
    <div>
      <h1>{platform.toUpperCase()} Chart</h1>
      <p>{performance.handle}</p>
      <p>{performance.rating}</p>
    </div>
  );
};

PerformanceChart.propTypes = {
  platform: PropTypes.string.isRequired,
  performance: PropTypes.shape({
    handle: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

export default PerformanceChart;
