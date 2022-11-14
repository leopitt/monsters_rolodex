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
              searchField: ''
            }
          },
          () => {
            console.log(this.state);
          });
        console.log(users);
      });
  }

  onSearchChange = (event) => {
    // Get the entered value.
    const searchField = event.target.value.toLowerCase();

    // Update this.state.monstersFiltered so it contains only filtered monsters.
    this.setState(() => {
      return { searchField }
    });

    console.log(this.state);
  }

  render() {
    console.log('render');

    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    // Get filtered monsters.
    const filtered = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <input
          className='search-box'
          type='search'
          placeholder='search monsters'
          onChange={onSearchChange}
        />
        {filtered.map((monster) => {
          return <div key={monster.id}>
            <h1>{monster.name}</h1>
          </div>;
        })}
      </div>
    );
  }
}

export default App;
