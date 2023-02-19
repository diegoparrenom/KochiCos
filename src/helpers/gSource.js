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

  async function getTable(table_name,{setTable},Sfield=null,SFValue=null) {
 
    const spreadsheetId =  `${creds.sheet_id}`,
    response = await fetch(`https://docs.google.com/spreadsheets/d/${creds.sheet_id}/gviz/tq?tqx=out:json&gid=${creds.table_id[table_name]}`),
    result = await response.text(),
    json = JSON.parse(result.replace(/.*google.visualization.Query.setResponse\({(.*?)}\);?/s, '{$1}'));

    let data = parseTable(json);

    if(Sfield!= null)
      data = data.filter(i=> i[Sfield]==SFValue)

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
  async function deleteRow(SheetId,Sfield,SFVAlue,{returnMessage}) {

    (async function getRowInfo() {
      await gSheetInit()
      doc.getInfo();

      const sheet = doc.sheetsByTitle[SheetId];
      const rows = await sheet.getRows();
      let searchid=null;
      rows.map((d,index)=>{if(d[Sfield]==SFVAlue){searchid = index}})
      await rows[searchid].delete(); // delete a row
      returnMessage();

    }());
  }
  async function updateRow(SheetId,SField,SFValue,Row,{returnMessage}) {

    (async function getRowInfo() {
      await gSheetInit()
      doc.getInfo();

      const sheet = doc.sheetsByTitle[SheetId];
      const rows = await sheet.getRows();
      const header_values = rows[0]._sheet.headerValues;

      let searchid=null;
      rows.map((d,index)=>{if(d[SField]==SFValue){searchid = index}})

      for(let h = 0; h < header_values.length; h++){
        rows[searchid][header_values[h]] = Row[header_values[h]]; //update
      }
      await rows[searchid].save();
      returnMessage();
    }());
  }

  async function getTableUnion(Sheet1,Sheet2,CField, setTable,S1SortField=null,S1SortFieldValue=null) {

    const spreadsheetId1 =  `${creds.sheet_id}`,
    response1 = await fetch(`https://docs.google.com/spreadsheets/d/${creds.sheet_id}/gviz/tq?tqx=out:json&gid=${creds.table_id[Sheet1]}`),
    result1 = await response1.text(),
    json1 = JSON.parse(result1.replace(/.*google.visualization.Query.setResponse\({(.*?)}\);?/s, '{$1}'));
  
    let data1 = parseTable(json1);

    if(S1SortField  != null)
      data1 = data1.filter(i=> i[S1SortField]==S1SortFieldValue);

    const spreadsheetId2 =  `${creds.sheet_id}`,
    response2 = await fetch(`https://docs.google.com/spreadsheets/d/${creds.sheet_id}/gviz/tq?tqx=out:json&gid=${creds.table_id[Sheet2]}`),
    result2 = await response2.text(),
    json2 = JSON.parse(result2.replace(/.*google.visualization.Query.setResponse\({(.*?)}\);?/s, '{$1}'));
  
    let data2 = parseTable(json2);

    data1.map((d1)=>{
      Object.assign(d1,data2.filter((d2)=>(d2[CField] == d1[CField]))[0]);
    })

    setTable(data1);

  }

  async function getInfoFromTable(srcMatrix,SheetId2,SField, setTable ) {

    (async function getRowInfo() {
      await gSheetInit()
      doc.getInfo();

      const sheet2 = doc.sheetsByTitle[SheetId2];
      const rows2 = await sheet2.getRows();
      const header_values2 = rows2[0]._sheet.headerValues;

      let resMatrix2 = builtMatrix(rows2, header_values2); //trajes

      for (let i = 0; i < srcMatrix.length; i++) {

        Object.assign(srcMatrix[i],resMatrix2.filter((t)=>(t[SField] == srcMatrix[i][SField]))[0]);
              
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