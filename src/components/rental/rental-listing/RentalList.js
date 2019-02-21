import React, { Component } from 'react';
import { RentalCard } from '../rental-card/RentalCard'
import { connect } from 'react-redux'
import { fetchList } from '../../../actions'

class RentalListContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillMount() {
        // this.props.dispatch(fetchList())
        this.props.fetchList();
    }

    renderRentals() {
        return this.props.rentals.map(rental => {
            return (<RentalCard key={rental._id} rental={rental} />)
        }
        )
    }

    render() {
        return (
            <section id='rentalListing'>
                <h1 className='page-title'>Your Home All Around the World</h1>
                <div className='row'>
                    {this.renderRentals()}
                </div>
            </section>
        )
    }
}


const mapStatetoProps = (state) => {
    return {
        rentals: state.rentals.data
    }
}

const RentalList = connect(mapStatetoProps,{fetchList})(RentalListContainer);
export { RentalList };