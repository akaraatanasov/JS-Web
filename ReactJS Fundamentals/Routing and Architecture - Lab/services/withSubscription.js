import React, { Component } from 'react';
import dataSource from './dataSource';

export default function withSubscription(WrappedComponent, dataName) {
    class WithSubscription extends Component {
        constructor(props) {
            super(props);

            this.state = {[dataName]: ''};

            this.changeListener = this.changeListener.bind(this);
        }

        changeListener(name, value) {
            this.setState({ [dataName]: value });
        }

        componentDidMount() {
            this.setState({ [dataName]: dataSource.getData(dataName) });
            dataSource.addListener(this.changeListener, dataName);
        }

        componentDidUnMount() {
            dataSource.removeListener(this.changeListener, dataName);
        }

        render() {
            const ownProps = Object.assign({}, this.state)
            return (<WrappedComponent {...ownProps} />);
        }
    }

    return WithSubscription;
}