import React, { PropTypes } from 'react'
import { LogoutLink } from 'react-stormpath'

export default class Home extends React.Component {

    static contextTypes = {
        user: PropTypes.object
    }

    render() {
        const user = this.context.user || { username: '' };
        return (
            <div>
                <p>Welcome, {user.username}</p>
                <p>
                    <LogoutLink className="btn btn-default">Logout</LogoutLink>
                </p>
            </div>
        );
    }
}