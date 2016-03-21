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
    
    for (var shift = 0; shift < stagger; shift++){
        //Get relevant characters
        var relevantCharacters = "";
        for (var j = shift; j < this.cleanText.length; j += stagger){
            relevantCharacters += this.cleanText[j];
        }
        //Count frequencies
        staggeredFrequencies.push(getFrequencies(relevantCharacters));
    }
    return staggeredFrequencies;
};

var chartInitialize = function(chartDiv) {
    var initialData = [
        {
            x: englishLetters,
            y: englishFrequencies,
            type: "bar",
            name: "Standard <br> English"
        }
    ];
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
        title: "Letter Frequencies"
    };
    var config = {
        displayModeBar: false
    };
    return Plotly.newPlot(chartDiv, initialData, layout, config);
};
var onSubmit = function(chartDiv){
    var getUserData = function(){
        var userData = {};
        userData.message = document.getElementById('inputText').value;
        userData.message = new Message(userData.message);
        userData.stagger = Number(document.getElementById('inputStagger').value);
        userData.shift = Number(document.getElementById('inputShift').value);
        userData.shift = userData.shift % userData.stagger;
        return userData;
    };
    var addTrace = function(userData){
        var yValues = userData.message.getStaggeredFrequencies(userData.stagger)[userData.shift];
        var trace = {
            x:englishLetters, 
            y: yValues,
            type: "scatter",
            mode: "lines+markers",
            marker: {
                size:6
            },
            line: {
                width: 3
            },
            nameTemplate: "Input Text <br> (Shift: %data%)",
            rotated: 0
        };
        trace.name = trace.nameTemplate.replace("%data%","0");
        //Remove old user-trace if it's already been drawn:
        if (chartDiv.data.length > 1){
            Plotly.deleteTraces(chartDiv,1);
        }
        Plotly.addTraces(chartDiv, trace);
    };
    var userData = getUserData();
    addTrace(userData);
};
var shiftTrace = function(chartDiv,traceNum,shift){
    var trace = chartDiv.data[traceNum];
    trace.y.rotateRight(shift);
    trace.rotated = (trace.rotated + shift) % trace.y.length;
    chartDiv.data[traceNum].name = chartDiv.data[traceNum].nameTemplate.replace("%data%",trace.rotated);
    Plotly.redraw(chartDiv);
};

// Set Default Text
document.getElementById('inputText').innerHTML = defaultTexts.sherlockVigenere;
// Set default chart
var chartDivID = "chartHolder";
chartInitialize(chartDivID);
var chartDiv = document.getElementById(chartDivID);
// Enable "submit" button
document.getElementById('inputSubmit').onclick = function(){
    onSubmit(chartDiv);
};
// Enable Left/Right Button
document.getElementById('shiftLeft').onclick = function(){
    shiftTrace(chartDiv,1,-1);
};
document.getElementById('shiftRight').onclick = function(){
    shiftTrace(chartDiv,1,+1);
};




