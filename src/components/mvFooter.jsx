import React, { Component } from 'react';

class MvFooter extends Component {
  render() {
    return (
      <footer className="text-center">
        All right reserved&copy; {new Date().toLocaleDateString()}
      </footer>
    );
  }
}

export default MvFooter;
