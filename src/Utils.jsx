export class QueryUtil{

  static getQueryValue(queryStr,key){
    if(!queryStr || queryStr.length==0)
      return false;
    if(queryStr[0]=="?")
      queryStr = queryStr.substr(queryStr.length-2);

    let keyVals = queryStr.split("&");
    keyVals = keyVals.map((cur)=>{
      var curKeyVal = [];
      curKeyVal = cur.split("=");
      let curObj = {};
      curObj[curKeyVal[0]] = curKeyVal[1];
      return curObj;
    });
    let queryObj = Object.assign({},...keyVals);
    return queryObj[key];
  }
}

export class URLManager{
  static get URL_SERVER_PREFIX() {return  "http://localhost:3000/api";}
  static get URL_ISSUES() {return "http://localhost:3000/api/issues";}
}

export class DateManager{
  static formatDate(d){
    console.log("oooooooo"+d.getDate());
    var datestring = d.getFullYear() + "/" + ("0"+(d.getMonth()+1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2);
    return datestring;
  }
}
