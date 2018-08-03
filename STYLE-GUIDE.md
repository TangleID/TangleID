# Style Guide

## Overview

TangleID defers to [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
with the following exceptions or extra manner.

### Require constructor names to begin with a capital letter

Since the constructor functions are just regular functions, it is
recommended to use thse uppercase specify constructors.

```javascript
// bad
function person(options) {
  this.name = options.name;
}

const bad = new person({
  name: 'Alice',
});

// good
class Person {
  constructor(options) {
    this.name = options.name;
  }
}

const good = new Person({
  name: 'Alice',
});
```

#### Reference
- [new-cap | ESLint](https://eslint.org/docs/rules/new-cap)
- [new-cap | Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#naming--PascalCase)

### Allow the unary operators ++ and --

Since we are using semicolons instead of ASI, it would be straightforward to use
`++` and `--` operators without side effects.

```javascript
var foo = 0;
foo++;

var bar = 42;
bar--;

for (i = 0; i < l; i++) {
  return;
}
```

## Code example

### React Components

Class-based components are preferable over the ones in pure function,
because the former can use Lifecycle methods and state.

Here is a class-based React component example:
```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyCounterComponent extends Component {
  constructor(props) {
    super(props);

    /**
     * Bind your class method in constuctor function. If you forget to
     * bind this.handleClick and pass it to onClick, this will be
     * undefined when the function is actually called.
     *
     * Reference: https://reactjs.org/docs/handling-events.html
     */
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      total: 0, // give your state initial values
    }
  }

  /**
   * Do something after component has been rendered to the DOM.
   *
   * Reference: https://reactjs.org/docs/react-component.html
   */
  componentDidMount() {
    // do something
  }

  handleClick() {
    this.setState({
      total: this.state.total + 1,
    });
  }

  handleClear() {
    this.setState({
      total: 0,
    });
  }

  render() {
    return (
      <div>
        <h3>{ this.props.title }<h3>
        { this.state.total }
        <button onClick={this.handleClick}>Click</button>
        <button onClick={this.handleClear}>Clear</button>
      </div>
    );
  }
}
/**
 * Check your component props type
 *
 * Reference: https://reactjs.org/docs/typechecking-with-proptypes.html
 */

MyCounterComponent.propTypes = {
  title: PropTypes.string,
};

export default MyCounterComponent;
```
