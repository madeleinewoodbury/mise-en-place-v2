import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const DashboardRecipes = ({ recipes }) => {
  const tableRecipes = recipes.map(recipe => (
    <tr key={recipe._id}>
      <td>
        <Link to="/recipe">{recipe.name}</Link>
      </td>
      <td className="hide-sm">{recipe.category}</td>
      <td className="hide-sm">
        <Moment format="MM/DD/YYYY">{recipe.date}</Moment>
      </td>
      <td className="hide-sm">
        <i className="far fa-thumbs-up"></i> {recipe.likes.length}
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th className="hide-sm">Date Added</th>
            <th className="hide-sm">Likes</th>
          </tr>
        </thead>
        <tbody>{tableRecipes}</tbody>
      </table>
    </Fragment>
  );
};

DashboardRecipes.propTypes = {
  recipes: PropTypes.array.isRequired
};

export default DashboardRecipes;
