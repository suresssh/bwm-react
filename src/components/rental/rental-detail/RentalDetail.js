import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchRentalById } from '../../../actions'

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
                        <p>{rental.title}</p>
                        <p>{rental.city}</p>
                        <p>{rental.description}</p>
                        <p>{rental.category}</p>
                        <p>$ {rental.dailyRate}</p></div>
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

