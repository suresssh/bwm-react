import React from 'react';
import {Link} from 'react-router-dom'

export const RentalCard = ({ rental }) => {
  return (
    <div className='col-md-3 col-xs-6'>
    <Link to={`/rentals/${rental.id}`} className='rental-detail-link'> 
      <div className='card bwm-card'>
        <img className='card-img-top' src={rental.image} alt='rental main pic'></img>
        <div className='card-block'>
          <h6 className={`card-subtitle ${rental.category}`}>{rental.shared ? 'Shared' : 'Whole'} Apartment &#183; New York</h6>
          <h4 className='card-title'>{rental.title}</h4>
          <p className='card-text'>${rental.dailyRate} per Night &#183; Free Cancelation</p>
          <p className='card-link'>More Info</p>
        </div>
      </div>
      </Link>
    </div>
  )
}