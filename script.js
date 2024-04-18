class Cell {
    constructor(isHeader, disabled, data, row, column, rowName, columnName, active = false){
        this.isHeader = isHeader;
        this.disabled = disabled;
        this.data = data;
        this.row = row;
        this.column = column;
        this.rowName = rowName;
        this.columnName = columnName;
        this.active = active;
    }
}

const spreadSheetContainer = document.querySelector('#spreadsheet-container');
const exportBtn = document.querySelector('#export-btn');

const rows = 10;
const cols = 10;
const spreadSheet = [];
const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',  'U', 'V', 'W', 'X', 'Y', 'Z'];

exportBtn.onclick = function(e) {
    let csv = '';
    for (let i = 0; i < spreadSheet.length; i++){
        csv += spreadSheet[i].filter((item) => !item.isHeader).map((item) => item.data).join(",") + "\r\n";
    }
    
    const csvObj = new Blob([csv]);
    const csvUrl = URL.createObjectURL(csvObj);
    console.log(csvUrl);

    const a = document.createElement('a');
    a.href = csvUrl;
    a.download = 'excel.csv'
    a.click()
}

function drawSheet(){
    spreadSheetContainer.innerHTML = "";
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
            let cellData = "";
            let isHeader = false;
            let disabled = false;
            // Logic for defining the row count - 1,2,3,...
            if(j === 0){
                disabled = true; // For the 1st block
                isHeader = true;
                if(i!==0){
                    cellData = i;
                }
            }

            // Logic or Column Count
            if(i === 0){
                if(j!==0){
                    isHeader = true;
                    disabled = true;
                    cellData = alphabets[j-1];
                }
            }

            let rowName = i;
            let columnName = alphabets[j-1];
            const cell = new Cell(isHeader, disabled, cellData, i, j, rowName, columnName, false);
            spreadsheetRow.push(cell);
        }
        spreadSheet.push(spreadsheetRow)
    }
    // console.log('Spreadsheet: ', spreadSheet)
    drawSheet();
}

function createCellElement(cell){
    const cellElement = document.createElement('input');
    cellElement.className = "cell";
    cellElement.id = "cell_" + cell.row + cell.column;
    cellElement.value = cell.data;
    cellElement.disabled = cell.disabled;

    if(cell.isHeader){
        cellElement.classList.add('header');
    }

    cellElement.onclick = () => handleCellClick(cell);
    cellElement.onchange = (e) => handleOnChange(e.target.value, cell);
    return cellElement;
}

function handleCellClick(cell){
    clearActiveHeader()
    const columnHeader = spreadSheet[0][cell.column];
    const rowHeader = spreadSheet[cell.row][0];
    const columnHeaderElement = getElementId(columnHeader.row, columnHeader.column);
    const rowHeaderElement = getElementId(rowHeader.row, rowHeader.column);
    columnHeaderElement.classList.add('active');
    rowHeaderElement.classList.add('active');

    document.querySelector('#cell-status').innerHTML = cell.columnName + '' + cell.rowName;
    // console.log("Clicked Cell: ",cell, "Column Header", columnHeaderElement, "Row Header", rowHeaderElement);
}

function handleOnChange(data, cell){
    cell.data = data;
}

function clearActiveHeader(){
    // First Find Active Class and then remove it
    for (let i = 0; i < spreadSheet.length; i++){
        for(let j = 0; j<spreadSheet[i].length; j++){
            const cell = spreadSheet[i][j];
            if(cell.isHeader){
                cellElement = getElementId(cell.row, cell.column);
                cellElement.classList.remove('active')
            }
        }
        
    }
}

function getElementId(row, column){
    return document.querySelector("#cell_"+ row + column)
}