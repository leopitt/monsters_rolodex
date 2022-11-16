import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SeaarchBox from './components/search-box/search-box.comonent';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      monstersFiltered: []
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => {
        this.setState(
          () => {
            return {
              monsters: users,
              searchField: ''
            }
          });
      });
  }

  onSearchChange = (event) => {
    // Get the entered value.
    const searchField = event.target.value.toLowerCase();

    // Update this.state.monstersFiltered so it contains only filtered monsters.
    this.setState(() => {
      return { searchField }
    });
  }

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    // Get filtered monsters.
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <SeaarchBox onChangeHandler={onSearchChange} placeholder='Search monsters' className='search-box' />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
