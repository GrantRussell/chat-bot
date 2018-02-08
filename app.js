///////////////////////////////////////////////////////////////////////////
//  _______                           _           _   
// |__   __|                         | |         | |  
//    | |_ __ _   _ _ __ ___  _ __   | |__   ___ | |_ 
//    | | '__| | | | '_ ` _ \| '_ \  | '_ \ / _ \| __|
//    | | |  | |_| | | | | | | |_) | | |_) | (_) | |_ 
//    |_|_|   \__,_|_| |_| |_| .__/  |_.__/ \___/ \__|
//  A bot to mimic the speech| |patterns of Donald Trump                      
//    v0.1.0 (Prototype)     |_|                      
///////////////////////////////////////////////////////////////////////////
const natural = require('natural');


natural.PorterStemmer.attach();

var query = 'How is your boy Kim doing?';

var queryTS = query.tokenizeAndStem();

console.log(queryTS);

var answers = [
    {
        key: ['North', 'Korea', 'nuke', 'Kim', 'Jong', 'Un'],
        value: ['North Korea Answer #1', 'North Korea Answer #2']
    },
    {
        key: ['Barack', 'Obama'],
        value: ['Obama Answer #1', 'Obama Answer #2']
    },
    {
        key: ['news', 'fake', 'cnn'],
        value: ['Fake News Answer #1', 'Fake News Answer #2']
    }
];


var results = [];

for(var i = 0; i < answers.length; i++){
    var temp = {
        count: 0,
        score: 0
    }
    results.push(temp);
}

var count = 0;
for(var i=0; i<queryTS.length; i++){
    for(var j=0; j<answers.length; j++){
        var temp = {count : 0}
        for(var k=0; k<answers[j].key.length; k++){
            if(queryTS[i] === answers[j].key[k].stem()){
                results[j].count++;
            }
        }
    }
}

console.log(`Q: ${query}`);

var noOutput = true;
for(var i=0; i<results.length; i++){
    results[i].score = results[i].count / queryTS.length;
    if(results[i].score >= .40){
        console.log(`A: ${answers[i].value[0]}`);
        noOutput = false;
    }
}
if(noOutput){
    console.log("You must be from one of those shithole countries, because I didn't understand a word of what you just said.")
}
