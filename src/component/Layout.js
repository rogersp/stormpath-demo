import React from 'react'

export default class Layout extends React.Component {    
    render() {
        return (
            <div className="container">
                <h2>React-Stormpath + React-Express</h2>
                {this.props.children}
            </div>
        );
    }
}