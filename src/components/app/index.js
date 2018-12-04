import React, { Component } from "react";

import styles from "./styles.module.css";

const COLUMNS = [
  {
    key: "firstName",
    title: "First name"
  },
  {
    key: "lastName",
    title: "Last name"
  }
];

const ROWS = [
  {
    firstName: "John",
    lastName: "Appleseed"
  },
  {
    firstName: "Jane",
    lastName: "Doe"
  }
];

class App extends Component {
  state = {
    sortBy: "firstName",
    sortOrder: "asc",
    data: ROWS
  };

  handleSort = (by, order) => {
    let data = this.state.data;

    if (order === "asc") {
      data.sort((a, b) => {
        if (a[by] < b[by]) return -1;
        if (a[by] > b[by]) return 1;
        return 0;
      });
    } else {
      data.sort((a, b) => {
        if (a[by] < b[by]) return 1;
        if (a[by] > b[by]) return -1;
        return 0;
      });
    }

    this.setState({
      data
    });
  };

  columnsHeaderNode = () => {
    return (
      <div className={styles.columnHeader}>
        {COLUMNS.map((column, index) => {
          return (
            <div className={styles.columnCell} key={index}>
              <div className={styles.columnTitle}>{column.title}</div>
              <div className={styles.sort}>
                <button
                  className={styles.sortButton}
                  onClick={() => this.handleSort(column.key, "asc")}
                >
                  Asc
                </button>
                <button
                  className={styles.sortButton}
                  onClick={() => this.handleSort(column.key, "desc")}
                >
                  Desc
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  rowNode = () => {
    return this.state.data.map((row, index) => {
      return (
        <div className={styles.row} key={index}>
          <div className={styles.cell}>{row.firstName}</div>
          <div className={styles.cell}>{row.lastName}</div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className={styles.container}>
        {this.columnsHeaderNode()}
        {this.rowNode()}
      </div>
    );
  }
}

export default App;
