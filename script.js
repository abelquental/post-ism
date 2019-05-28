//let data = [];
//let showProj;
//let closeProj;
//let wrapper = document.getElementById('wrapper');
//let list = document.getElementById('wrapper-list');
//let proj = document.getElementById('wrapper-proj');
//let projList = document.getElementById('proj-ul');
//let back = document.getElementById('bck-btn');
//let pText = document.getElementById('proj-tit');
//let pTitle = document.getElementById('proj-txt');
//
//let traerExpo = function() {
//    fetch('expo-postism.json')
//    .then(res => res.json())
//    .then(expoData => {
//        for (let i = 0; i < expoData.length; i++) {
//            data[i] = {
//                alunos: expoData[i].Alunos,
//                landTitulo: expoData[i].landTitulo,
//                titulo: expoData[i].Titulo,
//                subTitulo: expoData[i].subTitulo,
//                texto: expoData[i].Texto,
//                texture: expoData[i].textureImg
//            }
//        }
//
//        let titles = expoData.map((project,i) => `<li id='proj-${i}'>post - ${project.Titulo} - ism</li>`);
//        titles = titles.join();
//        document.getElementById('proj-ul').innerHTML = titles;            
//        console.log('dataCtrl: data successfully imported');                 
//        console.log(data);                 
//        new p5(cilinder);
//
//        showProj = function() {  
//            let rawID, splitID, ID;
//        
//            rawID = event.target.id;
//            splitID = rawID.split('-');
//            ID = Number(splitID[1]);
//            // Reset Content
//            pText.innerHTML = " ";
//            pTitle.innerHTML = " ";
//            console.log(ID);
//            // Add Content
//            pText.innerHtml = `<p>${data[ID].texto}</p>`
//            pTitle.innerHtml = `<h2>${data[ID].titulo}</h2>`
//        
//            proj.classList.toggle("transX");
//        }
//        
//        closeProj = () => proj.classList.toggle("transX");
//
//
//        setupEventListeners();
//        
//    })
//}
//traerExpo();
//fitty('h1');



let data = [];
let showProj;
let closeProj;
let wrapper = document.getElementById('wrapper');
let list = document.getElementById('wrapper-list');
let proj = document.getElementById('wrapper-proj');
let projList = document.getElementById('proj-ul');
let back = document.getElementById('bck-btn');
let pText = document.getElementById('proj-tit');
let pTitle = document.getElementById('proj-txt');

let traerExpo = function() {
    fetch('expo-postism.json')
    .then(res => res.json())
    .then(expoData => {
        for (let i = 0; i < expoData.length; i++) {
            data[i] = {
                alunos: expoData[i].Alunos,
                landTitulo: expoData[i].landTitulo,
                titulo: expoData[i].Titulo,
                subTitulo: expoData[i].subTitulo,
                texto: expoData[i].Texto,
                texture: expoData[i].textureImg
            }
        }

        let titles = expoData.map((project,i) => `<li id='proj-${i}'>post - ${project.Titulo} - ism</li>`);
        titles = titles.join();
        document.getElementById('proj-ul').innerHTML = titles;            
        console.log('dataCtrl: data successfully imported');                 
        console.log(data);                 
        new p5(cilinder);

        showProj = function() {  
            let rawID, splitID, ID;
        
            rawID = event.target.id;
            splitID = rawID.split('-');
            ID = Number(splitID[1]);
            // Reset Content
            pText.innerHTML = " ";
            pTitle.innerHTML = " ";
            console.log(ID);
            // Add Content
            pText.innerHtml = `<p>${data[ID].texto}</p>`
            pTitle.innerHtml = `<h2>${data[ID].titulo}</h2>`
        
            proj.classList.toggle("transX");
        }
        
        closeProj = () => proj.classList.toggle("transX");


        setupEventListeners();
        
        
        
    })
}
traerExpo();
fitty('h1');

console.log("Hello world!");






// DOM Strings






let cilinder = function(p) {
    let width = wrapper.offsetWidth;
    let height = wrapper.offsetHeight;
    let cnv;
    let img;    
    let imgs = [];
    
    p.preload = function() {
        for (let i = 0; i < data.length; i++){
            imgs[i] = data[i].texture;
        }
        console.log(imgs);
    }

    p.setup = function() {
        cnv = p.createCanvas(width, height, p.WEBGL);
        cnv.parent('wrapper');
        came = p.createCamera();
        projList.addEventListener('mouseover', function(){
            let originalID = event.target.id;
            let splitID = originalID.split('-');
            img = p.loadImage(imgs[splitID[1]]);
        });          
    }

    p.draw = function() {        
        p.background(255); 
        if(img){
            p.texture(img);
        } else {
            p.fill(250, 0, 0);
        }    
        
        let nw = wrapper.offsetWidth;
        let nh = wrapper.offsetHeight;
        let locX = p.mouseX - nh / 2;
        let locY = p.mouseY - nw / 2;
        
        p.ambientLight(200, 200, 200);
        p.pointLight(255, 255, 255, locX, locY, 100);    
        p.push()                    
        p.rotateZ(p.frameCount*0.003);
        p.rotateX(p.frameCount*0.003);
        p.rotateY(p.frameCount*0.003);            
        p.cylinder(nw/10, nh/1.2, 100);
        p.pop()
        
    }
    p.windowResized = function() {        
        let nw = wrapper.offsetWidth;
        let nh = wrapper.offsetHeight;
        p.resizeCanvas(nw, nh);
    }        
}



let setupEventListeners = function() {
    document.getElementById('wrapper-list').addEventListener('click', showProj);
    document.getElementById('bck-btn').addEventListener('click', closeProj);
}








