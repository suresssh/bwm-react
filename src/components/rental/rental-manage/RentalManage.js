import React, { Component } from 'react';
import { getUserRentals } from '../../../actions';
import { Link } from 'react-router-dom';
import { RentalManageCard } from './RentalManageCard';
import { RentalManageModal } from './RentalManageModal';
import { ToastContainer, toast } from 'react-toastify';
import * as actions from '../../../actions';

class RentalManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRentals: [],
            errors: [],
            isFetching: false
        }
    }

    componentWillMount() {
        this.setState({ isFetching: true });

        getUserRentals().then(
            userRentals => this.setState({ userRentals, isFetching: false }),
            errors => this.setState({ errors, isFetching: false }))
    }

    renderRentalCards(rentals) {
        return rentals.map((rental, index) =>
            <RentalManageCard modal={<RentalManageModal bookings={rental.bookings} />}
                key={index}
                rental={rental}
                rentalIndex={index}
                deleteRentalCb={this.deleteRental} />);
    }

    deleteRental = (rentalId, rentalIndex) => {
        actions.deleteRental(rentalId).then(
            () => this.deleteRentalFromList(rentalIndex),
            errors => toast.error(errors[0].detail))
    }

    deleteRentalFromList = (rentalIndex) => {
        console.log(rentalIndex)
        const user_Rentals = this.state.userRentals.slice();
        user_Rentals.splice(rentalIndex, 1);

        this.setState({ userRentals: user_Rentals });
    }


    render() {
        const { userRentals, isFetching } = this.state;
        return (
            <div>
                <section id='userRentals'>
                    <ToastContainer />
                    <h1 className='page-title'>My Rentals</h1>
                    <div className='row'>
                        {this.renderRentalCards(userRentals)}
                    </div>
                    {!isFetching && userRentals.length === 0 &&
                        <div className='alert alert-warning'>
                            You dont have any rentals currenty created. If you want advertised your property
                            please follow this link.
                    <Link style={{ 'marginLeft': '10px' }} className='btn btn-bwm' to='/rentals/new'>Register Rental</Link>
                        </div>}
                </section>

            </div>
        )
    }
}

export default RentalManage