import React, { Component } from "react";

import styles from "./styles.module.css";

class App extends Component {
  state = {
    columns: [
      ["John", "Jane", "Mary", "Roger", "Gerrard", "Mark", "Taylor"],
      ["Doe", "Appleseed", "Tyler", "Lopez", "Moreno", "Barry", "Smith"]
    ]
  };

  columnHeaderNode = index => {
    return (
      <div className={styles.columnHeader}>
        {index + 1}
        {this.sortButtons(index)}
      </div>
    );
  };

  columnCellsNode = (columns, id) => {
    return (
      <div className={styles.columnCellsContainer}>
        {columns.map((column, index) => {
          return (
            <div key={index} className={styles.columnCells}>
              {column}
            </div>
          );
        })}
      </div>
    );
  };

  columnNode = () => {
    return this.state.columns.map((columns, index) => {
      return (
        <div key={index} className={styles.column}>
          {this.columnHeaderNode(index)}
          {this.columnCellsNode(columns, index)}
        </div>
      );
    });
  };

  firstColumnNode = () => {
    return (
      <div className={styles.column}>
        {this.state.columns.map((data, id) => {
          if (id === 0) {
            return this.state.columns[id].map((row, index) => {
              return (
                <div key={index} className={styles.firstColumn}>
                  {index + 1}
                </div>
              );
            });
          } else {
            return false;
          }
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
