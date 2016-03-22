"use strict";
/*global
    math, Plotly, document,
*/
var englishLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var englishFrequencies = [0.0812, 0.0149, 0.0271, 0.0432, 0.1202, 0.023, 0.0203, 0.0592, 0.0731, 0.001, 0.0069, 0.0398, 0.0261, 0.0695, 0.0768, 0.0182, 0.0011, 0.0602, 0.0628, 0.091, 0.0288, 0.0111, 0.0209, 0.0017, 0.0211, 0.0007];
var defaultTexts = {
    vigenere: "NRUATWYAHJSEDIODIITLWCIJDOIPRADPANTOEOOPEGTNCWASDOBYAPFRALLWHSQNHWDTDPIJGENDEOBUWCEHLWKQGNLVEEYZZEOYOPXAGPIPDEHQOXGIKFSEYTDPOXDENGEZAHAYOIPNWZNASAOEOHZOGQONAAPEENYSWYDBTNZEHASIZOEJZRZPRXFTPSENPIOLNEXPKCTWYTZTFBPRAYCAMEPHEAYTDPSAEWKAUNDUEESEYCNJPPLNWWYOTSKYEGYOSDTDLTPSEDTDZPNKCDACWWDCKYSPCUYEEZMYDFMWYIJEEHWICPNYPWDPRALSPSEKCDACOBYAPFRALPLLRAYTHJCKXEOQRKXAOZUNNEKFTOTDAZFKFROPLRPSWYDEDMKCEIJSPPREZUO",
    sherlockPlain: "IN the year 1878 I took my degree of Doctor of Medicine of the University of London, and proceeded to Netley to go through the course prescribed for surgeons in the army. Having completed my studies there, I was duly attached to the Fifth Northumberland Fusiliers as Assistant Surgeon. The regiment was stationed in India at the time, and before I could join it, the second Afghan war had broken out. On landing at Bombay, I learned that my corps had advanced through the passes, and was already deep in the enemy's country. I followed, however, with many other officers who were in the same situation as myself, and succeeded in reaching Candahar in safety, where I found my regiment, and at once entered upon my new duties. The campaign brought honours and promotion to many, but for me it had nothing but misfortune and disaster. I was removed from my brigade and attached to the Berkshires, with whom I served at the fatal battle of Maiwand. There I was struck on the shoulder by a Jezail bullet, which shattered the bone and grazed the subclavian artery. I should have fallen into the hands of the murderous Ghazis had it not been for the devotion and courage shown by Murray, my orderly, who threw me across a pack-horse, and succeeded in bringing me safely to the British lines. Worn with pain, and weak from the prolonged hardships which I had undergone, I was removed, with a great train of wounded sufferers, to the base hospital at Peshawar. Here I rallied, and had already improved so far as to be able to walk about the wards, and even to bask a little upon the verandah, when I was struck down by enteric fever, that curse of our Indian possessions. For months my life was despaired of, and when at last I came to myself and became convalescent, I was so weak and emaciated that a medical board determined that not a day should be lost in sending me back to England. I was dispatched, accordingly, in the troopship Orontes, and landed a month later on Portsmouth jetty, with my health irretrievably ruined, but with permission from a paternal government to spend the next nine months in attempting to improve it. I had neither kith nor kin in England, and was therefore as free as air---or as free as an income of eleven shillings and sixpence a day will permit a man to be. Under such circumstances, I naturally gravitated to London, that great cesspool into which all the loungers and idlers of the Empire are irresistibly drained. There I stayed for some time at a private hotel in the Strand, leading a comfortless, meaningless existence, and spending such money as I had, considerably more freely than I ought. So alarming did the state of my finances become, that I soon realized that I must either leave the metropolis and rusticate somewhere in the country, or that I must make a complete alteration in my style of living. Choosing the latter alternative, I began by making up my mind to leave the hotel, and to take up my quarters in some less pretentious and less expensive domicile.", // A Study in Scarlet, https://www.gutenberg.org/files/244/244-h/244-h.htm#link2H_4_0001
    sherlockVigenere: "PBETIQLOCUXGVYXKHWNFPQSXKCNFSJVTXQHAJWYQSXAVPGRACSCEMLFCQXSFKCYMRVWFZOIWKSOFSFLHWQCLVUZFLJVIRTXZLQZGVKLDCQWUYWMQHXVFDGVYLCYEMFAVPMVEFVLHMFNQZYTDLHPPQQZHFPMWZHSQVWPKLEHMSMLFXSJVPPXGAVPRMXAVYAVLOIXNIJSOYPJMZWWUIJZODMWKPGEMRLZICSIGUHSQVWNWXQRLDODEXSAWZZIVPBTZHAHOEFLWAWXQEFKPPRSJLWNAYDKXZURAAHSQWWJCYPEXNVLZASYVLPFJVYPZSMACYXEFKWYSELICXNEQPZPMVFLRETELTMNAVHZVLPEVCOYOIVAVCAYYOHSQTSZGPEEFKKLEEDYSLPCVLSAURLOSPZIEFGNAYFAFJUJGSZZIIVOCHQZWYKTFLEHBJAXZLFZRJAJSCEAZVKPDIAUHSQWSTSDUXMHHTARSZAJEIDMOYPWMJQPQHWKWYDISJVTZKUHBOMLSYWYEEXLHJILWYSTRSMURXKVWNWXQRLHBOMXGUQPQRLLFPPYHVBXKRWDRFFMWZHSQGSTDLUKFIFZGKZAVZZSMYGLZHHYCXAXAVBEAQSUMMGXXVFXQMLOOOZSLOWYSFMAATEJGYHFZISUROUWSZHPDMOHGCQQGCSORVGTAJNVANOOQEFKOEFEUOSOFSLOSMQVCZVTDIKDWETAZVATEIJCSOMXLOSQMXSSPLFXDLCQYEADOYPXZLFPUASZGEDYURCYFLWZVZGPVLFMKEBLNLUPTBZWQXOOWNTWZHHEQVWKHSQFGUSLZHYYOKQHLOSDGFUSOGUEFHFEQVQPGSAYDKVLHIXHZWQRAUHZFLWOOYPWGMHSQQMYRPDSMZUSMDAZVLPMLUCENIWUTZDXZLRPHSLPCYMRVJCFDEYLGSAAFIMXGVJHMXKSJKSCXCOOCETVWDAPMGJVGDMTSJYSAVKLOYPWMJQPQHWKWYNVAUUTZKELGLRIDFHZFLWIFTFMKOZTZIKDCCZAAAVAMMFHBOIISRTCAQLOSADSDVBRQHZHFOELAWGHTMUOWSMHMURPDKGUSTIEKYSXAZWKKTFLSNFPMXLYOTZSXDCFZHWKGFRJWYSCEXGAVPNEKLVZETAAOWMXHLGSMASYVPDIAYOWXMWKOYPLSKOWDISKMTYTJVJPPWGMOCMWLVPPMFDLHZIEDROMAYLAVPIEJKGLZHWCSYFSTHGVMPAAHWQYHVBETINLFLZHSOKSQRADODEXJBQVPSOUPJQRLLFTOJWCSCFLSAQFDWWVTZGVAURTMRHVGDQWKPCYEJGYAZZXZZAJXMXLKLEHWZDLUVWKCQMRVDVPZELSODFMUHAPFSEFGPXJSURMQGSTSNARNHZPEGWUHTIEKZCHQECHBOQQSJWLFIVAVLFEELRTOEDICLDHVLHPDQAUSOFLSABZFEVHMDTSMSRMQPGZHTZWWURTZKELPLOOLVSYSPSURTIEKKWDBELJVPPEUJCCPMFNZJURLOSEDSGWGSUTGYCYFIKHBOXEFKSOMQGUHSXELLFZZTGYHDYSMAVUQXLFKTFLEFVPMPLOWCDILYWPHETSMCGMFLRMGXOPHSBIJTWDEMGUTCAQSWOEQVFHZRAZWYBXQRLACDBIFKHSQRWEHYURWTCYFLKPBLFXWTDEURYACTYTJVJPUXAOOOZIAAVPDOAAVYAVCPBTZIFNZLZHSURHMWLOSCQJGYSLEJJLSLEEAYCCMWXYSPMWSUWYOSELCQQPWCSYELASZTZKKHBOEMPWSYOISKOJIMDSDPDQAAOXMRLVPPGRVLFDGGZJWCOYEZHLZGWZWYMXMYOWXCYYOGUXSASOFSDVBOARLOOESVWHHNQWKWCZXMFACHTMUOOWXXZLZZGRYLFDMRVPRWQVKVTETIWTDTDISYSTDVWZWDFMTSMODEAUSOFLWYSTEXSFSORSJZCXQXATSLFEHYWGMXWOCEQPAUHSQWLYOYPPWHRTZKSJCXRSJAZPEWELOYURYSSDEIPPGEQRULOYPWHLBOURYZINTQGUSJMWAOOOOSFZWOQVSIZJYSJLTCQIDFHSMRAVIRTXKVOWMVEPBRPMVAVPEXSASZRQQMWYMRULGMQGGTSETELPGZARJLOWUDWKHSMXATIDFIAAVPDPWHJPFLWTSEDSHVZTEEFKFFEXAJOEQWGTSHTIJLWYFLWJCFZXJFCCFLSAWXGWLTOVQEUVAAXILLOWFIJHHTARAUAJEXQSSZRPACWYSGZVCDURYAVPXELASCMPLLFYMXACSTNIYHBMKQSRWYSYHTMXURVACWQENLHSQLGASWMRVACEMOWBDXKUMHFEQVKPBDAQWSSDETJLHPZXAVIDMRVSSDEIPWSYEMNLRZYMUPZP" // vigenere encrypted with key "holmes"
};

// Helper Functions
Object.defineProperty(String.prototype, "countChar", {
    value: function(char) {
        return this.split(char).length - 1;
    },
    writable: false,
    enumerable: false,
    configurable: false
});
Object.defineProperty(Array.prototype, "rotateRight", {
    value: function(n) {
        n = -n; 
        while (this.length && n < 0) n += this.length;
        this.push.apply(this, this.splice(0, n));
        return this;
    },
    writable: false,
    enumerable: false,
    configurable: false
});

var Message = function(textOfMessage){
    // var userMessage = new Message(userText)
    this.originalText = textOfMessage;
    this.cleanText = this.cleanString(textOfMessage);
};
Message.prototype.alphabet = englishLetters;
Message.prototype.cleanString = function(string){
    string = string.toUpperCase();
    var cleanedString = "";
    for (var i=0; i<string.length;i++){
        if (this.alphabet.indexOf(string[i]) > -1){
            cleanedString += string[i];
        }
    }
    return cleanedString;
};
Message.prototype.getStaggeredFrequencies = function(stagger){
    // userMessage.getStaggeredFrequencies(stagger);
    // returns array of arrays: [arrayFreq0,arrayFreq1,...] where arrayFreqK is frequency count for every 'stagger'th letter starting with Kth letter.
    var alphabet = this.alphabet;
    var staggeredFrequencies = [];
    
    var getFrequencies = function(string){
        var counts = [];
        for (var index in alphabet){
            counts.push(string.countChar(alphabet[index]));
        }
        return math.multiply(counts,1/math.sum(counts));
    };
    
    for (var offset = 0; offset < stagger; offset++){
        //Get relevant characters
        var relevantCharacters = "";
        for (var j = offset; j < this.cleanText.length; j += stagger){
            relevantCharacters += this.cleanText[j];
        }
        //Count frequencies
        staggeredFrequencies.push(getFrequencies(relevantCharacters));
    }
    return staggeredFrequencies;
};

var setDefaults = function() {
    var stagger = 4;
    var offset = 0;
    var defaults = {
        message: new Message(defaultTexts.sherlockVigenere), //Message object storing text
        stagger:stagger, //every "stagger"th character in message is analyzed ...
        offset:offset, //starting at character number "offset"
        rotated:0, //how much has frequency chart been rotated so far?
    }
    document.getElementById('inputStagger').setAttribute("value",stagger)
    document.getElementById('inputOffset').setAttribute("value",offset)
    return defaults
};
var updateDisplayText = function(userInput) {
    var highlightEveryNth = function(string,N,offset){
        var offset = offset % N;
        var newString = "";
        for (var i = 0; i < string.length; i++){
            if (i % N === offset){
                newString += "<mark class='char-included'>" + string[i] + "</mark>";
            } else {
                newString += "<mark class='char-excluded'>" + string[i] + "</mark>";
            }
        }
        return newString;
    };
    var highlightedText = highlightEveryNth(userInput.message.cleanText,userInput.stagger,userInput.offset);
    document.getElementById('displayText').innerHTML = highlightedText;
};
var initializeChart = function(userInput,chartDivID) {
    var englishTrace = {
            x: englishLetters,
            y: englishFrequencies,
            type: "bar",
            name: "Standard <br> English"
    };
    var userTrace = {
        x:englishLetters, 
        y: userInput.message.getStaggeredFrequencies(userInput.stagger)[userInput.offset],
        type: "scatter",
        mode: "lines+markers",
        marker: {
            size:6
        },
        line: {
            width: 3
        },
        nameTemplate: "Input Text <br> (Shift: <b>%data%</b>)",
    };
    userTrace.name = userTrace.nameTemplate.replace("%data%","0");
    var data = [englishTrace,userTrace];
    var layout = {
        autosize:false,
        width:640,
        height:400,
        xaxis: {
            fixedrange:true
        },
        yaxis: {
            fixedrange:true
        },
        showlegend:true,
        title: "Letter Frequencies",
        margin:{
            l:50,
            r:50,
            t:75,
            b:75
        },
        font: {
            size:14
        },
        legend: {
            x: 0.8,
            y: 1,
        }
    };
    var config = {
        displayModeBar: false
    };
    return Plotly.newPlot(chartDivID, data, layout, config);
};
var updateChartStaggerOffsetText = function(userInput,chartDivID) {
    userInput.rotated = 0;
    var chartDiv = document.getElementById(chartDivID);
    var trace = chartDiv.data[1];
    var staggeredFrequencies = userInput.message.getStaggeredFrequencies(userInput.stagger);
    trace.y =  staggeredFrequencies[userInput.offset];
    Plotly.redraw(chartDiv);
};
var rotateTraceRight = function(userInput,chartDivID,value){
    var chartDiv = document.getElementById(chartDivID);
    var trace = chartDiv.data[1]; //get 1st trace
    trace.y.rotateRight(value);
    userInput.rotated = (userInput.rotated + value) % trace.y.length;
    chartDiv.data[1].name = chartDiv.data[1].nameTemplate.replace("%data%",userInput.rotated);
    Plotly.redraw(chartDiv);
};


// Set default state
var chartDivID = "chartHolder";
var userInput = setDefaults();
updateDisplayText(userInput);
initializeChart(userInput,chartDivID);

// on update stagger
$("#inputStagger").on("input propertychange paste", function(event) {
    if (this.value !== ""){
        userInput.stagger = Number(this.value);
        updateChartStaggerOffsetText(userInput,chartDivID);
        updateDisplayText(userInput);
    }
});
// on update offset
$("#inputOffset").on("input propertychange paste", function(event) {
    if (this.value !== ""){
        userInput.offset = Number(this.value) % userInput.stagger;
        updateChartStaggerOffsetText(userInput,chartDivID);
        updateDisplayText(userInput);
    }
});

// on left/right arrows
$("#rotateLeft").on("click", function() {
    rotateTraceRight(userInput,chartDivID,-1);
});
$("#rotateRight").on("click", function() {
    rotateTraceRight(userInput,chartDivID,+1);
});

// on submit new text
$("#submitText").on("click", function(){
    userInput.message = new Message($("#inputText").val());
    updateChartStaggerOffsetText(userInput,chartDivID);
    updateDisplayText(userInput);
});




