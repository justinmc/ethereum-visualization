var Blocks = require('./blocks.jsx');
var React = require('react');

var App = React.createClass({
  getInitialState: function() {
    return {
      name: 'React Gulp Boilerplate',
      blocks: {}
    };
  },

  render: function() {
    return (
      <div>
        <h1>Hello {this.state.name}</h1>
        <svg className="app" viewBox="0 0 100 100">
          <rect fill="#efefef" x="0" y="0" width="100" height="100">
          </rect>
          <Blocks />
        </svg>
      </div>
    );
  }
});

module.exports = App;
