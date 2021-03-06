import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRentalById } from '../../../actions';
import { RentalDetailInfo } from './RentalDetailInfo';
import { RentalMap } from './RentalMap';
import Booking from '../../booking/Booking'

class RentalDetailContainer extends Component {

    componentWillMount() {
        let rentalId = this.props.match.params.id;
        this.props.fetchRentalById(rentalId);
    }

    render() {
        const rental = this.props.rental;
        return (
            <div>
                {!rental._id ?
                    <p>Loading...</p> :
                    <div>
                        <section id='rentalDetails'>
                            <div className='upper-section'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <img src={rental.image} alt=''></img>
                                    </div>
                                    <div className='col-md-6'>
                                        <RentalMap location={`${rental.city}, ${rental.street}`} />
                                    </div>
                                </div>
                            </div>

                            <div className='details-section'>
                                <div className='row'>
                                    <div className='col-md-8'>
                                        <RentalDetailInfo rental={rental} />
                                    </div>
                                    <div className='col-md-4'>
                                        <Booking rental={rental} />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                }
            </div>)
    }
}

const mapStatetoProps = (state) => {

    return {
        rental: state.rental.data
    }
}

const RentalDetail = connect(mapStatetoProps, { fetchRentalById })(RentalDetailContainer);
export { RentalDetail }

