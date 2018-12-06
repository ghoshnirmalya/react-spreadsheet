import React, { Component } from "react";

import styles from "./styles.module.css";

class App extends Component {
  state = {
    length: 10,
    columns: [
      ["John", "Jane", "Mary", "Roger", "Gerrard", "Mark", "Taylor"],
      ["Doe", "Appleseed", "Tyler", "Lopez", "Moreno", "Barry", "Smith"],
      ["Doe", "Appleseed", "Tyler", "Lopez", "Moreno"]
    ]
  };

  columnHeaderNode = index => {
    return (
      <div className={styles.columnHeader}>
        {this.addColumnButtonNode(index)}
        {index + 1}
        {this.sortButtons(index)}
        {this.addColumnButtonNode(index + 1)}
      </div>
    );
  };

  addColumnButtonNode = position => {
    return (
      <button
        className={styles.addColumnButton}
        onClick={() => this.handleAddColumn(position)}
      >
        +1
      </button>
    );
  };

  handleAddColumn = position => {
    let array = this.state.columns;

    array.splice(position, 0, []);

    this.setState({
      columns: array
    });
  };

  columnCellsNode = (columns, id) => {
    return (
      <div className={styles.columnCellsContainer}>
        {[...Array(this.state.length)].map((key, index) => {
          return (
            <div key={index} className={styles.columnCells}>
              {typeof columns === "undefined" ? (
                <input
                  className={styles.columnInput}
                  type="text"
                  defaultValue=""
                />
              ) : (
                <input
                  className={styles.columnInput}
                  type="text"
                  defaultValue={columns[index]}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  columnNode = () => {
    return [...Array(this.state.length)].map((key, index) => {
      return (
        <div key={index} className={styles.column}>
          {this.columnHeaderNode(index)}
          {this.columnCellsNode(this.state.columns[index], index)}
        </div>
      );
    });
  };

  firstColumnNode = () => {
    return (
      <div className={styles.column}>
        {[...Array(this.state.length).keys()].map((data, index) => {
          return (
            <div key={index} className={styles.firstColumn}>
              {index + 1}
            </div>
          );
        })}
      </div>
    );
  };

  sortArrayOfArrays = type => {
    const compareData = (a, b) => {
      if (type === "asc") {
        if (a < b) return -1;
        if (a > b) return 1;
      } else {
        if (a < b) return 1;
        if (a > b) return -1;
      }

      return 0;
    };

    return this.state.columns.map(array => {
      return array.sort(compareData);
    });
  };

  handleSort = (type = "asc") => {
    let sortedData = this.sortArrayOfArrays(type);

    this.setState({
      columns: sortedData
    });
  };

  sortButtons = index => {
    return (
      <div className={styles.sortButtonsContainer}>
        <button
          className={styles.sortButton}
          onClick={() => {
            this.handleSort("asc");
          }}
        >
          ASC
        </button>
        <button
          className={styles.sortButton}
          onClick={() => {
            this.handleSort("desc");
          }}
        >
          DESC
        </button>
      </div>
    );
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.columnsContainer}>
          {this.firstColumnNode()}
          {this.columnNode()}
        </div>
      </div>
    );
  }
}

export default App;
