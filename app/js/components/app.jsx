var Blocks = require('./blocks.jsx');
var React = require('react');

var App = React.createClass({
  getInitialState: function() {
    return {
    };
  },

  render: function() {
    return (
      <div className="app">
        <div className="title">
          <h1>Ethereum Visualization</h1>
        </div>

        <svg className="canvas" viewBox="0 0 100 100">
          <rect fill="#efefef" x="0" y="0" width="100" height="100" />
          <Blocks />
        </svg>
      </div>
    );
  }
});

module.exports = App;
