import React, { Component } from 'react';
import './App.css';
import 'isomorphic-fetch'; 
import ListCourses from './CourseQuery'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a
            className="App-link"
            href="https://campus-manager-slick2-5f6b9a40.us-east1.slicknode.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Our End Point
          </a>
          <h1>Courses</h1>
          <ListCourses />
        </header>
      </div>
    );
  }
}

export default App;
