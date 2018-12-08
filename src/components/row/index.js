import React, { Component } from "react";

import Cell from "../cell";

import styles from "./styles.module.css";

class Row extends Component {
  addColumnButtonNode = position => {
    return (
      <button
        className={styles.addColumnButton}
        onClick={() => this.props.handleAddColumn(position)}
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

  handleChange = (value, row, column) => {
    let data = this.props.data;

    data[column][row] = value;

    this.props.updateData(data);
  };

  render() {
    return this.props.data.map((data, index) => {
      return (
        <div key={index} className={styles.column}>
          {this.columnHeaderNode(index)}
          {[...Array(this.props.lengthX).keys()].map((_, colIndex) => {
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
  }
}

export default Row;
