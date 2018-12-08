import React, { Component } from "react";

import Cell from "../cell";

import styles from "./styles.module.css";

class App extends Component {
  state = {
    lengthX: 10,
    lengthY: 20,
    data: [
      {
        0: "Ramsey",
        1: "Rooney",
        2: "Cole"
      },
      {
        0: "Rabiot"
      },
      {
        0: "Verrati",
        1: "Scholes",
        2: "Benitez"
      }
    ]
  };
  componentDidMount() {
    this.setState({
      lengthX: this.props.rows,
      lengthY: this.props.columns
    });
    this.calculateData();
    this.forceUpdate();
  }

  calculateData() {
    let data = this.state.data;

    for (let rowIndex = 0; rowIndex < this.state.lengthY; rowIndex++) {
      if (typeof data[rowIndex] === "undefined") {
        data[rowIndex] = {};
      }

      for (
        let columnIndex = 0;
        columnIndex < this.state.lengthX;
        columnIndex++
      ) {
        if (typeof data[rowIndex][columnIndex] === "undefined") {
          data[rowIndex][columnIndex] = "";
        }
      }
    }

    this.setState({
      data
    });
  }

  rowNode = () => {
    return this.state.data.map((data, index) => {
      return (
        <div key={index} className={styles.column}>
          {this.columnHeaderNode(index)}
          {[...Array(this.state.lengthX).keys()].map((_, colIndex) => {
            return (
              <div key={colIndex} className={styles.columnCellsContainer}>
                <Cell
                  value={data[colIndex]}
                  onChange={this.handleChange}
                  colIndex={colIndex}
                  index={index}
                  data={data}
                />
              </div>
            );
          })}
        </div>
      );
    });
  };

  handleChange = (value, row, column) => {
    let data = this.state.data;

    data[column][row] = value;

    this.setState({
      data
    });
  };

  firstColumnNode = () => {
    return (
      <div className={styles.column}>
        {[...Array(this.state.lengthX).keys()].map((data, index) => {
          return (
            <div key={index} className={styles.firstColumn}>
              {index + 1}
            </div>
          );
        })}
      </div>
    );
  };

  handleAddColumn = position => {
    this.setState({
      lengthY: this.state.lengthY + 1
    });

    let array = this.state.data;

    array.splice(position, 0, { 0: "" });

    this.setState({
      data: array
    });

    this.calculateData();
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

  columnHeaderNode = index => {
    return (
      <div className={styles.columnHeader}>
        {this.addColumnButtonNode(index)}
        {index + 1}
        {this.addColumnButtonNode(index + 1)}
      </div>
    );
  };

  render() {
    return (
      <div className={styles.container}>
        {this.firstColumnNode()}
        <div className={styles.columnsContainer}>{this.rowNode()}</div>
      </div>
    );
  }
}

export default App;
