import React from 'react';
import 'isomorphic-fetch'; 
import gql from 'graphql-tag';
import { Query } from "react-apollo";

const COURSES = gql`
{
  courses: CampusManager_listCourse {
    totalCount
    edges {
      node {
        name
        id
      }
    }
  }
}`

const ListCourses = ({ onCourseSelected }) => (
  <Query query={COURSES}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return (
        <div className="App">
          <header className="App-header">
            <select name="course" onChange={onCourseSelected}>
              {data.courses.edges.map(({node}) => (
                <option key={node.id} value={node.name}>
                  {node.name}
                </option>
              ))}
            </select>
          </header>
        </div>
      );
    }}
  </Query>
);

export default ListCourses;