function Board() {
  this.population = [];
  this.nextPopulation = [];

  this.populate = () => {
    let rowsIncrement = 0;
    let columnsIncrement = 0;

    for (let i = 0; i < numberOfCells; i++) {
      const alive = Math.random() >= 0.7;

      if (rowsIncrement === scale * columns) {
        rowsIncrement = 0;
        columnsIncrement += scale;
      };

      const cell = new Cell(0 + rowsIncrement, 0 + columnsIncrement, alive);

      this.population.push(cell);
      rowsIncrement += scale;

      cell.draw();
    }
  }

  this.numberOfNeighbors = (position) => {
    const neighbors = [
      this.population[position - rows - 1], this.population[position - rows], this.population[position - rows + 1],
      this.population[position - 1], this.population[position + 1],
      this.population[position + rows - 1], this.population[position + rows], this.population[position + rows + 1]
    ];

    return neighbors.filter(cell => cell && cell.alive).length;
  }

  this.checkAlive = (cell, neighbors) => {
    if (!cell.alive && neighbors === 3) {
      return true;
    }

    if (cell.alive && neighbors <= 1) {
      return false;
    }

    if (cell.alive && neighbors >= 4) {
      return false;
    }

    if (cell.alive && (neighbors === 2 || neighbors === 3)) {
      return true;
    }

    return false;
  };

  this.populateNextGeneration = () => {
    for (let i = 0; i < numberOfCells; i++) {
      const cell = this.population[i];
      const newCell = { ...cell };
      const neighbors = this.numberOfNeighbors(i);
      const alive = this.checkAlive(cell, neighbors);

      newCell.alive = alive;
      this.nextPopulation.push(newCell);
    }
  };

  this.update = () => {
    this.nextPopulation.forEach(cell => {
      const newCell = new Cell(cell.x, cell.y, cell.alive);
      newCell.draw();
    });

    this.population = [...this.nextPopulation];
    this.nextPopulation = [];
  };

  this.reset = () => {
    this.population = [];
    this.nextPopulation = [];
  };
}