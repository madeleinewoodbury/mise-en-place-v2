import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import RecipeTop from './RecipeTop';
import { connect } from 'react-redux';
import { getRecipeById } from '../../actions/recipes';
import PropTypes from 'prop-types';

const Recipe = ({
  getRecipeById,
  recipes: { recipe, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getRecipeById(match.params.id);
  }, [getRecipeById, match.params.id]);

  // const ingredientsList = ingredients.map((item, id) => (
  //   <li key={id}>{item}</li>
  // ));
  return (
    <Fragment>
      {recipe === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="recipe">
            <Link to="/" className="btn btn-light">
              Go Back
            </Link>
            <div className="recipe-grid my-1">
              <RecipeTop recipe={recipe} />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>

    //   <div className="recipe-grid my-1">
    //     <div className="recipe-info bg-primary p-2">
    //       <div className="description">
    //         <h1 className="large text-white">{name}</h1>
    //         <p>{description}</p>
    //         <button type="button" className="btn btn-light">
    //           <i className="fas fa-thumbs-up"></i>{' '}
    //           <span>{likes.length > 0 ? likes.length : null}</span>
    //         </button>
    //         <button type="button" className="btn btn-light">
    //           <i className="fas fa-thumbs-down"></i>
    //         </button>
    //       </div>
    //       <div className="info-container">
    //         <div>
    //           <img className="recipe-img" src={avatar} alt="avatar" />
    //         </div>

    //         <div>
    //           <h3>{author}</h3>
    //           <p className="small-text text-white">
    //             Posted: <Moment format="MM/DD/YYYY">{date}</Moment>
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="ingredients bg-white p-2">
    //       <h2 className="text-primary">Ingredients</h2>
    //       <ul>{ingredientsList}</ul>
    //     </div>
    //     <div className="instructions bg-white p-2">
    //       <h2 className="text-primary">Instructions</h2>
    //       <div>
    //         <p>{instructions}</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

Recipe.propTypes = {
  getRecipeById: PropTypes.func.isRequired,
  recipes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipes,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getRecipeById }
)(Recipe);
