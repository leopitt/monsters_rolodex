import { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    console.log('constructor');
    super();

    this.state = {
      monsters: [],
      monstersFiltered: []
    }
  }

  componentDidMount() {
    console.log('componentDidMount');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => {
        this.setState(
          () => {
            return {
              monsters: users,
              monstersFiltered: users
            }
          },
          () => {
            console.log(this.state);
          });
        console.log(users);
      });
  }

  render() {
    console.log('render');
    return (
      <div className="App">
        <input
          className='search-box'
          type='search'
          placeholder='search monsters'
          onChange={(event) => {
            // Get the entered value.
            const searchName = event.target.value.toLowerCase();

            // Get filtered monsters.
            const filtered = this.state.monsters.filter((element) => {
              const monsterName = element.name.toLowerCase();
              if (monsterName.indexOf(searchName) !== -1) {
                return true;
              }
            });

            // Update this.state.monstersFiltered so it contains only filtered monsters.
            this.setState(() => {
              return {
                monstersFiltered: filtered,
              }
            });

            console.log(this.state);
          }}
        />
        {this.state.monstersFiltered.map((monster) => {
          return <div key={monster.id}>
            <h1>{monster.name}</h1>
          </div>;
        })}
      </div>
    );
  }
}

export default App;
