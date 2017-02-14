// Arrow Functions
var results = {}
function addResult(id, res) {
  if(!results[id]) {
     results[id] = ""
  }
  
  results[id] += res + "<br />";
  document.getElementById(id).innerHTML = (results[id])
}

function clearResult(id) {
  results[id] = ""
}


var convert = i => code => {
  return code
    .replace(/<(?:\w|\/)(?:.|\n)*?>/gm, '')
    .replace(/console/, `clearResult("${i}"); \nconsole`)
    .replace(/console.log\((.*)\).*/g, `
try { 
  var _______a = $1;
  if(typeof(_______a) === 'object' && _______a != window) {
    _______a = JSON.stringify(_______a)
  }
  addResult('${i}', '$1 -> ' + _______a); }
  catch(e) {addResult('${i}', '$1 -> '+ e);}`)
   
}

var removeNoEval = (s) => s.replace(/no-eval.*\n/, "")

function decodeEntities(encodedString) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
}


function executeCode(i){

  var code = convert(i)(decodeEntities($(".codeblock-" + i)[0].innerHTML)); 
  
  console.log(code)
  try {
    eval(code);
  } catch(e) {
      console.log(e);
    addResult(i, e)
  }
}

$(".lang-javascript,.javascript").each(function(i) {

  if(this.innerHTML.indexOf("no-eval") === -1){

    $(this).addClass("codeblock-" + i)
    $(this).parent().after(`<button onclick="executeCode('${i}')">Evaluate</button>
        <div class="results" id="${i}"></div>`)
     
  } else {
      this.innerHTML = removeNoEval(this.innerHTML)
  } 
     
  this.innerHTML = this.innerHTML
 

})


$(".lang-javascript,.javascript").prop('contenteditable',  'true');

$("h2").each(function() {
  $(this).wrap( `<a name="${this.innerHTML}"></a>`)
   
  $(".content-index").append(`<li><a href="#${this.innerHTML}">${this.innerHTML} </a></li>`)
})

$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});
