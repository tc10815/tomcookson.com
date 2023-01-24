/**
 * Contains variables of raw data about Romania for use with other pages.
 * Also includes simple FIFO queue.
 */

const city_locations = {
    Oradea:[0.143298969,0.049152542], 
    Zerind:[0.102061856,0.161016949], 
    Arad:[0.072164948,0.283050847], 
    Sibiu:[0.279381443,0.379661017], 
    Timisoara:[0.07628866,0.511864407],
    Lugoj:[0.204123711,0.605084746], 
    Mehadia:[0.207216495,0.722033898], 
    Drobeta:[0.201030928,0.837288136], 
    Craiova:[0.356701031,0.874576271], 
    Rimnicu_Vilcea:[0.324742268,0.515254237], 
    Fagaras:[0.453608247,0.405084746], 
    Pitesti:[0.483505155,0.642372881], 
    Bucharest:[0.621649485,0.755932203], 
    Giurgiu:[0.575257732,0.922033898], 
    Urziceni:[0.721649485,0.691525424], 
    Hirsova:[0.858762887,0.689830508], 
    Eforie:[0.906185567,0.857627119], 
    Vaslui:[0.815463918,0.413559322], 
    Iasi:[0.753608247,0.23220339],
    Neamt:[0.630927835,0.142372881]}

const romania_line_data = {
    Oradea: {Zerind:71,Sibiu:151},
    Zerind: {Oradea:71,Arad:75},
    Arad: {Zerind:75,Sibiu:140,Timisoara:118},
    Sibiu: {Oradea:151,Rimnicu_Vilcea:80,Arad:140,Fagaras:99},
    Timisoara: {Arad:118,Lugoj:111},
    Lugoj: {Timisoara:111,Mehadia:70},
    Mehadia: {Lugoj:70,Drobeta: 75},
    Drobeta: {Mehadia:75,Craiova:120},
    Craiova: {Drobeta:120,Rimnicu_Vilcea:146,Pitesti:138},
    Rimnicu_Vilcea:{Sibiu:80,Craiova:146,Pitesti:97},
    Pitesti:{Craiova:138,Rimnicu_Vilcea:97,Bucharest:101},
    Fagaras:{Sibiu:99,Bucharest:211},
    Bucharest: {Pitesti:101,Fagaras:211,Giurgiu:90,Urziceni:85},
    Giurgiu:{Bucharest:90},
    Urziceni:{Bucharest:85,Vaslui:142,Hirsova:98},
    Hirsova:{Urziceni:98,Eforie:86},
    Eforie:{Hirsova:86},
    Vaslui:{Urziceni:142,Iasi:92},
    Iasi:{Vaslui:92,Neamt:87},
    Neamt:{Iasi:87}}

var line_list = [];
for (fromCityName in romania_line_data){
    for(toCityName in romania_line_data[fromCityName]){
        let from_xy = city_locations[fromCityName];
        let to_xy = city_locations[toCityName];
        let dist = romania_line_data[fromCityName][toCityName];
        line_list.push([fromCityName,toCityName,dist,from_xy,to_xy])
    }
}

const romaniaMap = {
    Oradea: [['Zerind',71],['Sibiu',151]],
    Zerind: [['Oradea',71],['Arad',75]],
    Arad: [['Zerind',75],['Sibiu',140],['Timisoara',118]],
    Sibiu: [['Oradea',151],['Rimnicu_Vilcea',80],['Arad',140],['Fagaras',99]],
    Timisoara: [['Arad',118],['Lugoj',111]],
    Lugoj: [['Timisoara',111],['Mehadia',70]],
    Mehadia: [['Lugoj',70],['Drobeta', 75]],
    Drobeta: [['Mehadia',75],['Craiova',120]],
    Craiova: [['Drobeta',120],['Rimnicu_Vilcea',146],['Pitesti',138]],
    Rimnicu_Vilcea:[['Sibiu',80],['Craiova',146],['Pitesti',97]],
    Pitesti:[['Craiova',138],['Rimnicu_Vilcea',97],['Bucharest',101]],
    Fagaras:[['Sibiu',99],['Bucharest',211]],
    Bucharest: [['Pitesti',101],['Fagaras',211],['Giurgiu',90],['Urziceni',85]],
    Giurgiu:[['Bucharest',90]],
    Urziceni:[['Bucharest',85],['Vaslui',142],['Hirsova',98]],
    Hirsova:[['Urziceni',98],['Eforie',86]],
    Eforie:[['Hirsova',86]],
    Vaslui:[['Urziceni',142],['Iasi',92]],
    Iasi:[['Vaslui',92],['Neamt',87]],
    Neamt:[['Iasi',87]]
}
const node_list =['Oradea','Zerind','Arad','Sibiu','Timisoara','Lugoj','Mehadia','Drobeta','Craiova',
    'Rimnicu_Vilcea','Pitesti','Fagaras','Bucharest','Giurgiu','Urziceni','Hirsova','Eforie',
    'Vaslui', 'Iasi', 'Neamt' ];
