import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { listMonthly, updateMonthly, deleteExpense } from '../../api/remote';
import Input from '../common/Input';


export default class MonthlyBalance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            budget: 0,
            income: 0,
            expenses: []
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);

        this.deleteExpenses = this.deleteExpenses.bind(this);
    }

    async getData(year, month) {
        const data = await listMonthly(year, month)

        this.setState(data);
    }

    async deleteExpenses(id) {
        try {
            const res = await deleteExpense(id);
            console.log(res)
        } catch (e) {
            console.log(e)
        }

        const year = Number(this.props.match.params.year)
        const month = Number(this.props.match.params.month)

        this.getData(year, month);
    }

    componentDidMount() {
        const year = Number(this.props.match.params.year)
        const month = Number(this.props.match.params.month)

        this.getData(year, month)
            .then(() => {
                console.log(this.state)
            })
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();

        const year = Number(this.props.match.params.year)
        const month = Number(this.props.match.params.month)
        const newIncome = Number(this.state.income)
        const newBudget = Number(this.state.budget)

        updateMonthly(year, month, newIncome, newBudget)
            .then(res => {
                console.log(res)
                if (res.success) {
                    this.props.history.push(`/plan/${year}`); // redirects to yearly balance
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
                            <h1>Welcome to Budget Planner</h1>
                        </div>
                    </div>
                    <div className="row space-top ">
                        <div className="col-md-12 ">
                            <div className="card bg-secondary">
                                <div className="card-body">
                                    <blockquote className="card-blockquote">
                                        <h2 id="month">{monthMap[month]} {year}</h2>
                                        <div className="row">
                                            <div className="col-md-3 space-top">
                                                <h4>Planner</h4>
                                                <form onSubmit={this.onSubmitHandler}>
                                                    <div className="form-group">
                                                        <Input
                                                            name="income"
                                                            type="number"
                                                            value={this.state.income}
                                                            onChange={this.onChangeHandler}
                                                            label="Income:"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <Input
                                                            name="budget"
                                                            type="number"
                                                            value={this.state.budget}
                                                            onChange={this.onChangeHandler}
                                                            label="Budget:"
                                                        />
                                                    </div>
                                                    <input type="submit" className="btn btn-secondary" value="Save" />
                                                </form>
                                            </div>
                                            <div className="col-md-8 space-top">
                                                <div className="row">
                                                    <h4 className="col-md-9">Expenses</h4>
                                                    <Link to={`/plan/${year}/${month}/expence`} className="btn btn-secondary ml-2 mb-2">Add expenses</Link>
                                                </div>
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Category</th>
                                                            <th>Cost</th>
                                                            <th>Payment Date</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.expenses.map(exp => {
                                                            return (
                                                                <tr key={exp.id}>
                                                                    <td>{exp.name}</td>
                                                                    <td>{exp.category}</td>
                                                                    <td>{parseFloat(Math.round(exp.amount * 100) / 100).toFixed(2)}</td>
                                                                    <td>{exp.date}-{exp.month}-{exp.year}</td>
                                                                    <td>
                                                                        <a href="javascript:void(0)" onClick={() => this.deleteExpenses(exp.id)} className="btn btn-secondary">Delete</a>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}