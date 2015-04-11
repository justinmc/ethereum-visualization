var React = require('react');

var rootElement = document.querySelector('.app');

var App = React.createClass({
  getInitialState: function() {
    return {
      name: 'React Gulp Boilerplate'
    };
  },

  render: function() {
    return (
      <div>
        <h1>Hello {this.state.name}</h1>
      </div>
    );
  }
});

React.render(<App />, rootElement);
