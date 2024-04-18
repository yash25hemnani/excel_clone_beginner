class Cell {
    constructor(isHeader, disabled, data, row, column, active = false){
        this.isHeader = isHeader;
        this.disabled = disabled;
        this.data = data;
        this.row = row;
        this.column = column;
        this.active = active;
    }
}

const spreadSheetContainer = document.querySelector('#spreadsheet-container');

const rows = 10;
const cols = 10;
const spreadSheet = [];



function drawSheet(){
    for (let i = 0; i < spreadSheet.length; i++){
        const rowContainerElement = document.createElement('div');
        rowContainerElement.className = 'cell-row';
        for(let j = 0; j<spreadSheet[i].length; j++){
            const cell = spreadSheet[i][j];
            rowContainerElement.append(createCellElement(cell));
        }
        spreadSheetContainer.append(rowContainerElement)
    }
}

initpreadsheet();

function initpreadsheet(){
    
    for(let i = 0; i < rows; i++){
        let spreadsheetRow = [];
        for(let j = 0; j < cols; j++){
            const cell = new Cell(false, false, i+'-'+j, i, j, false);
            spreadsheetRow.push(cell);
        }
        spreadSheet.push(spreadsheetRow)
    }
    console.log('Spreadsheet: ', spreadSheet)
    drawSheet();
}

function createCellElement(cell){
    const cellElement = document.createElement('input');
    cellElement.className = "cell";
    cellElement.id = "Cell: " + cell.column + cell.row;
    cellElement.value = cell.data;
    cellElement.disabled = cell.disabled;
    return cellElement;
}