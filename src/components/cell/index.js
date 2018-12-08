import React, { Component } from "react";

import styles from "./styles.module.css";

class Cell extends Component {
  render() {
    return (
      <div className={styles.columnCells}>
        <input
          className={styles.columnInput}
          type="text"
          value={this.props.data[this.props.colIndex]}
          onChange={e =>
            this.props.onChange(
              e.target.value,
              this.props.colIndex,
              this.props.index
            )
          }
        />
      </div>
    );
  }
}

export default Cell;
