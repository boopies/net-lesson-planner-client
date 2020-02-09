import React from 'react'
import ApiContext from '../ApiContext'
import TokenService from '../services/token-service'
import { Link } from 'react-router-dom'

export default class Savedlessons extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            savedlessons: [],
        }
    }

    static contextType = ApiContext;
    
    componentDidMount() {
        fetch(`http://localhost:8000/api/savedlessons`, {
            method: 'GET',
            headers: {
              'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
            .then((savedlessons) => {
                this.setState({ savedlessons })
              })
        }


      render(){
          const {savedlessons} = this.state
          let state = this.state.savedlessons
        return(
            <div className="NET_Login__form">
            <header className="login__header">
                <h1 className="login__heading">
                   Your Saved Lessons
                </h1>
            </header>
              <main className="login__main">
              <ul>
                {savedlessons.map(savedlesson => 
                <li key={savedlesson.id}>
                  <Link to={{
                      pathname: '/lesson',
                      state: { state },
                      }}>
                      {savedlesson.title}
                  </Link>
                </li>
                )}
              </ul>
              </main>
            </div>
        )
      }
    }
