import React from 'react'
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from './context'

const Movies = () => {
  const { movie } = useGlobalContext();

  return (
    <>
      {movie.map((curMovie) => {
        return (
          <section className='movies-page'>
            <div className='container grid-4-col grid'>
              {movie.map((curMovie) => {
                const { imdbID, Title, Poster } = curMovie;
                return (
                  <NavLink to={`movie/${imdbID}`
                } key={ imdbID } >
                  <div className='card'>
                    <div className='card-info'>
                      <h2>{Title}</h2>
                      <img src={Poster} alt={imdbID} />
                    </div>
                  </div>
                </NavLink>
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  )
}

export default Movies