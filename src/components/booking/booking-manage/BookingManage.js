import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserBookings } from '../../../actions';
import { Link } from 'react-router-dom';
import { BookingCard } from './BookingCard'

class BookingManage extends Component {

    componentDidMount() {
        this.props.fetchUserBookings()
    }

    renderBookings(bookings) {
        return bookings.map((booking, index) => <BookingCard booking={booking} key={index} />);
    }

    render() {
        const { data: bookings, isFetching } = this.props.userBookings;
        console.log(bookings);
        return (
            <div>
                <section id='userBookings'>
                    <h1 className='page-title'>My Bookings</h1>
                    <div className='row'>
                        {this.renderBookings(bookings)}
                    </div>
                    {!isFetching && bookings.length === 0 ? <div className='alert alert-warning'>
                        You have no bookings created go to rentals section and book your place today.
                  <Link style={{ 'marginLeft': '10px' }} className='btn btn-bwm' to='rentals index page'>Available Rental</Link>
                    </div>
                        : null}
                </section>

            </div >)
    }
}

const mapStateToProps = (state) => {
    return {
        userBookings: state.userBookings
    }
}

export default connect(mapStateToProps, { fetchUserBookings })(BookingManage)