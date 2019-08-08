function ensaio(data) {
    let cyl = function(p) {
        
        let shapeH, shapeW, cnv, img;
        let nw = ensaio_wrapper.offsetWidth;
        let nh = ensaio_wrapper.offsetHeight;
        let ww = window.innerWidth;
        let imgs = [];      
                
        
        p.preload = function() {
            for (let i = 0; i < data.length; i++) {
                imgs[i] = p.loadImage(data[i].textureImg);                             
            }
        }

        p.setup = function() {
            cnv = p.createCanvas(nw, nh, p.WEBGL);                 
            cnv.parent('ensaio');        
            came = p.createCamera(); 
            
            // Prepare texture changes
            list_wrapper.addEventListener('mouseover', function(){
                let originalID = event.target.id;
                let splitID = originalID.split('-');
                img = imgs[splitID[1]];               
            });
        }
        
        p.draw = function() {   
            p.background(255); 

            // Set cylinder texture    
            img ? p.texture(img) : p.fill(0,255,0);            

            // Cylinder size  
            if (ww > 600) {
                shapeH = nh*.58;
                shapeW = nw*.07; 
            } else {
                shapeH = nh*.45;
                shapeW = nw*.18; 
            }            
                      
            // Light
            p.directionalLight(250, 250, 250, nh, nw/2, 0); 
            p.ambientLight(180);                                       
            p.push()                    
            
            // Motion
            p.rotateY(p.frameCount*0.005);
            p.rotateX(p.frameCount*0.005);
            p.rotateZ(p.frameCount*0.002);
            
            // Shape
            p.cylinder(shapeW, shapeH, 25, 0, 0, 0);
            p.pop()                                                     
        }                     
    }
    return new p5(cyl);
}