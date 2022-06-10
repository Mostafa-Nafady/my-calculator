const defaultResult = 0;
let initialResult;
let operatorType;
let currentResult = defaultResult;
let inputUser= grtUserInput();
let  description;
let logEntry = [];


function grtUserInput(){
  return userInput.value;
}

function calculationDescrip(str1, str2, str3){
  const calcDescription = str1 + str2 + str3;
  return calcDescription;
}

function output( ){
  outputResult(currentResult, description);
  console.log(logEntry);
}

function writeLog (operation , result){
  let newObject={
    operation: "",
      result: 0,
      operand: 0 ,
  };
  newObject.operation= operation;
  newObject.result=result;
  newObject.operand=inputUser;
  logEntry.push(newObject);
  output( );
}


function calculation(calculationType){
  inputUser = grtUserInput();
  /* check for valid entry */
   if(!parseInt(inputUser)){
     return ;
   }
   
   initialResult=currentResult;
    /* ADD function condition */
 if (calculationType=== "ADD"){
   currentResult += parseInt(inputUser);
   operatorType="+";
 /* SUB function condition */
 }else if(calculationType=== "SUBT"){
 currentResult -= parseInt(inputUser);
 operatorType="-";
 /* MULT function condition */
 }else if(calculationType=== "MULTI"){
   currentResult *= parseInt(inputUser);
   operatorType="*";
   /* DIVID function condition */
 }else if(calculationType=== "DIVID"){
   currentResult /= parseInt(inputUser);
   operatorType="/";
 }
 
 description = calculationDescrip(initialResult , operatorType, inputUser);
 writeLog (calculationType , currentResult);
 
   }
   
function add(){
  calculation("ADD");
}
function subtract(){
  calculation("SUBT");
}
function multiplication(){
  calculation("MULTI");
}
function division(){
  calculation("DIVID");
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiplication);
divideBtn.addEventListener('click', division); 