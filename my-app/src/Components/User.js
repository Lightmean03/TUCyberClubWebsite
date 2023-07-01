import { Component } from "react";

class User extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }
    componentDidMount(){
        fetch('/api/users')
            .then(res => res.json()) //A promise
            .then(users => {
                this.setState({users: users})
            })
    }

    render(){
        return(
            <div>
                <h1>User Component</h1>
                {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
            </div>
        )
    }
}

export default User;