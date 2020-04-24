// import React from "react";

// const Login = () => {
//   // make a post request to retrieve a token from the api
//   // when you have handled the token, navigate to the BubblePage route
//   return (
//     <>
//       <h1>Welcome to the Bubble App!</h1>
//       <p>Build a login page here</p>
//     </>
//   );
// };

// export default Login;
import React from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';


class Login extends React.Component {
    state = {
        credentials: {
            username: '',
            password: ''
        },
        isLoading: false
    }
handleChange = e => {
    this.setState({
        credentials: {
            ...this.state.credentials,
            [e.target.name]: e.target.value
        }
    });
};

login = e => {
    e.preventDefault();
    this.setState({
        isLoading: true
    })
    axiosWithAuth()
    .post('http://localhost:5000/api/login', this.state.credentials)
    .then(res => {
        localStorage.setItem('token', JSON.stringify(res.data.payload));
        this.props.history.push('/colors');
        this.setState({
            isLoading: true
    })
})
    .catch(err => console.log({err}));
}


render(){
    return (
        <div class="meow">
            {this.setState.isLoading && <p>Loading...</p>}
        <form onSubmit={this.login}>
          User Name:
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          Password:
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    )
}

}

export default Login;