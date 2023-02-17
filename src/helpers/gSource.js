import { GoogleSpreadsheet } from 'google-spreadsheet';

import creds from './credentials.json';

const doc = new GoogleSpreadsheet(creds.sheet_id);


const gSource = () => {

  const gSheetInit = async () => {
    try {
      await doc.useServiceAccountAuth(creds);
      await doc.loadInfo();
    } catch (e) {
      console.error('Error LoadDocInfo: ', e);
    }
  }; 

  function builtMatrix(rows,header_values) {
    let resMatrix = [];
    let row_o = {};

    for (let i = 0; i < rows.length; i++) {

      row_o = {};

      for (let h = 0; h < header_values.length; h++) {
        Object.assign(row_o, { [header_values[h]]: rows[i]._rawData[h] });
      }
      resMatrix = [...resMatrix, row_o];
    }

    return resMatrix;
  }

  function parseTable(json) {

    const headings = json.table.cols.map(item => item.label);

    // data of each row is associated to the headings
    let data = json.table.rows.map(item => {
      let row = {};
      item.c.forEach((cell, idx) => {
        row[headings[idx]] = cell?.v?? null;
      });
      return row;
    });

    return data;
  }

  async function getTable(table_name,{setTable},id=null,field_name="id") {
 
    const spreadsheetId =  `${creds.sheet_id}`,
    response = await fetch(`https://docs.google.com/spreadsheets/d/${creds.sheet_id}/gviz/tq?tqx=out:json&gid=${creds.table_id[table_name]}`),
    result = await response.text(),
    json = JSON.parse(result.replace(/.*google.visualization.Query.setResponse\({(.*?)}\);?/s, '{$1}'));

    let data = parseTable(json);

    if(id!= null)
      data = data.filter(i=> i[field_name]==id)

    setTable(data)
  
  }

  // async function getTable(SheetId,{ setTable },id=null) {

  //   (async function getRowInfo() {
  //     await gSheetInit()
  //     doc.getInfo();
  //     const sheet = doc.sheetsByTitle[SheetId];
  //     const rows = await sheet.getRows();
  //     const header_values = rows[0]._sheet.headerValues;

  //     let resMatrix = builtMatrix(rows,header_values);
  //     if(id!=null){
  //       resMatrix = resMatrix.filter((m) => (m.id==id))
  //       console.log(resMatrix)
  //     }
  //     setTable(resMatrix);
  //   }());
  // }

  

  async function addRow(SheetId,Row,{returnMessage}) {

    (async function getRowInfo() {
      await gSheetInit()
      doc.getInfo();
      // delete Row.itemlength;
      const sheet = doc.sheetsByTitle[SheetId];
      const moreRows = await sheet.addRows([Row]);

      returnMessage();
    }());
  }
  async function deleteRow(SheetId,Row,{returnMessage},Sfield="id") {

    (async function getRowInfo() {
      await gSheetInit()
      doc.getInfo();

      const sheet = doc.sheetsByTitle[SheetId];
      const rows = await sheet.getRows();
      let searchid=null;
      rows.map((d,index)=>{if(d[Sfield]==Row.id){searchid = index}})
      await rows[searchid].delete(); // delete a row
      returnMessage();

    }());
  }
  async function updateRow(SheetId,Row,{returnMessage}) {

    (async function getRowInfo() {
      await gSheetInit()
      doc.getInfo();

      const sheet = doc.sheetsByTitle[SheetId];
      const rows = await sheet.getRows();
      const header_values = rows[0]._sheet.headerValues;

      let searchid=null;
      rows.map((d,index)=>{if(d.id==Row.id){searchid = index}})

      for(let h = 0; h < header_values.length; h++){
        rows[searchid][header_values[h]] = Row[header_values[h]]; //update
      }
      await rows[searchid].save();
      returnMessage();
    }());
  }

  async function getTableUnion(SheetId1,SheetId2,id_alquiler,{ setTable }) {

    const spreadsheetId1 =  `${creds.sheet_id}`,
    response1 = await fetch(`https://docs.google.com/spreadsheets/d/${creds.sheet_id}/gviz/tq?tqx=out:json&gid=${creds.table_id[SheetId1]}`),
    result1 = await response1.text(),
    json1 = JSON.parse(result1.replace(/.*google.visualization.Query.setResponse\({(.*?)}\);?/s, '{$1}'));
  
    let data1 = parseTable(json1);

    data1 = data1.filter(i=> i.id_alquiler==id_alquiler);

    const spreadsheetId2 =  `${creds.sheet_id}`,
    response2 = await fetch(`https://docs.google.com/spreadsheets/d/${creds.sheet_id}/gviz/tq?tqx=out:json&gid=${creds.table_id[SheetId2]}`),
    result2 = await response2.text(),
    json2 = JSON.parse(result2.replace(/.*google.visualization.Query.setResponse\({(.*?)}\);?/s, '{$1}'));
  
    let data2 = parseTable(json2);
    let idbuff;

    data1.map((i)=>{
      idbuff = i.id;
      Object.assign(i,data2.filter((t)=>(t.id == i.id_traje))[0]);
      i.id = idbuff;
    })

    // console.log(data1);
    setTable(data1);

  }

  async function getInfoFromTable(srcMatrix,SheetId2,{ setTable }) {

    (async function getRowInfo() {
      await gSheetInit()
      doc.getInfo();

      const sheet2 = doc.sheetsByTitle[SheetId2];
      const rows2 = await sheet2.getRows();
      const header_values2 = rows2[0]._sheet.headerValues;

      let resMatrix2 = builtMatrix(rows2, header_values2); //trajes
      let idbuff;

      for (let i = 0; i < srcMatrix.length; i++) {

        idbuff = srcMatrix[i].id;
        Object.assign(srcMatrix[i],resMatrix2.filter((t)=>(t.id == srcMatrix[i].id_traje))[0]);
        srcMatrix[i].id= idbuff;
              
      }

      setTable(srcMatrix);
    }());
  }

  return {
    getTable,
    addRow,
    deleteRow,
    updateRow,
    getTableUnion,
    getInfoFromTable
  }
}

export default gSource;