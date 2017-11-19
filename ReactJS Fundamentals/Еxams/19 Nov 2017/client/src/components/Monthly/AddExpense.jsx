import React, { Component } from 'react';
import Input from './../common/Input'

import { addExpense } from '../../api/remote';


export default class AddExpence extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            category: '',
            amount: 0,
            date: 1
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();

        const year = Number(this.props.match.params.year)
        const month = Number(this.props.match.params.month)
        const date = Number(this.state.date)
        const amount = Number(this.state.amount)

        
        addExpense(year, month, date, this.state.name, this.state.category, amount)
            .then(res => {
                console.log(res)                
                if (res.success) {
                    this.props.history.push(`/plan/${year}/${month}`); // redirects
                } else {
                    console.log('Enter data again');
                }
            })
    }


    render() {
        let monthMap = {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December'
        }

        const year = Number(this.props.match.params.year)
        const month = Number(this.props.match.params.month)


        return (
            <main>
                <div className="container">
                    <div className="row space-top">
                        <div className="col-md-12">
                            <h1>Add Expenses</h1>
                            <h3>{monthMap[month]} {year}</h3>
                        </div>
                    </div>
                    <div className="row space-top">
                        <div className="col-md-10">
                            <form onSubmit={this.onSubmitHandler}>
                                <legend>Add a new expense</legend>
                                <div className="form-group">
                                    <Input
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChangeHandler}
                                        label="Name:"
                                    />
                                </div>
                                <div className="form-group">
                                    <Input
                                        name="category"
                                        value={this.state.category}
                                        onChange={this.onChangeHandler}
                                        label="Category:"
                                    />
                                </div>
                                <div className="form-group">
                                    <Input
                                        name="amount"
                                        type="number"
                                        value={this.state.amount}
                                        onChange={this.onChangeHandler}
                                        label="Cost:"
                                    />
                                </div>
                                <div className="form-group">
                                    <Input
                                        name="date"
                                        type="number"
                                        value={this.state.date}
                                        onChange={this.onChangeHandler}
                                        label="Payment Date:"
                                    />
                                </div>
                                <input type="submit" className="btn btn-secondary" value="Add" />
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}