import React, { Component } from 'react';

import { listYearly } from '../../api/remote';
import MonthCard from './MonthCard';


export default class YearlyBalance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            months: {}
        };

    }

    componentDidMount() {
        const year = Number(this.props.match.params.year)
        this.getData(year)
    }

    async getData(year) {
        const data = await listYearly(year);
        this.setState({ months: data });
    }

    render() {
        return (
            <main>
                <div className="container">
                    <div className="row space-top">
                        <div className="col-md-12">
                            <h1>Yearly Balance</h1>
                        </div>
                    </div>
                    <div className="row space-top col-md-12">
                        {Object.keys(this.state.months).map(month => {
                            if (month <= 4) {
                                return <MonthCard key={month}
                                    noOfMonth={month}
                                    year={Number(this.props.match.params.year)}
                                    budget={this.state.months[month].budget}
                                    balance={this.state.months[month].balance}
                                />
                            }
                        })}
                    </div>
                    <div className="row space-top col-md-12">
                        {Object.keys(this.state.months).map(month => {
                            if (month > 4 && month <= 8) {
                                return <MonthCard key={month}
                                    noOfMonth={month}
                                    year={Number(this.props.match.params.year)}
                                    budget={this.state.months[month].budget}
                                    balance={this.state.months[month].balance}
                                />
                            }
                        })}
                    </div>
                    <div className="row space-top col-md-12">
                        {Object.keys(this.state.months).map(month => {
                            if (month > 8) {
                                return <MonthCard key={month}
                                    noOfMonth={month}
                                    year={Number(this.props.match.params.year)}
                                    budget={this.state.months[month].budget}
                                    balance={this.state.months[month].balance}
                                />
                            }
                        })}
                    </div>
                </div>
            </main>
        );
    }
}