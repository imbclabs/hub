/**
 * lib v1.0: Animation
 * by aeddang
 */
/*
interfaces


*/

if(typeof jarvis == "undefined") var jarvis = new Object();




jarvis.AnimationCSS= function() 
{
	this.elementA=new Array();
	this.animationA=new Array();

}
jarvis.AnimationCSS.prototype =
{
	startAnimation: function(element,aniObj) 
	{
       
	   if(element==undefined){
		   return;
	   }
	  
	   var that=this;
	   
	   this.elementA.push(element);
	   this.animationA.push(aniObj);
	   if(aniObj.listener!=null){
            
			aniObj.listener.aniComplete=function(e){that.animationComlete(aniObj)};
			jarvis.lib.addEventListener(aniObj.listener,"webkitTransitionEnd",aniObj.listener.aniComplete);
			jarvis.lib.addEventListener(aniObj.listener,"transitionend",aniObj.listener.aniComplete);
			jarvis.lib.addEventListener(aniObj.listener,"msTransitionEnd",aniObj.listener.aniComplete);
			jarvis.lib.addEventListener(aniObj.listener,"oTransitionEnd",aniObj.listener.aniComplete);
			
            
       }
       switch(aniObj.ease){
			case "ease out": 
				aniObj.ease="ease-out";
				break;
			case "ease in": 
				aniObj.ease="ease-in";
				break;
			case "ease in out": 
				aniObj.ease="ease-in-out";
				break;
							 
	   }
	   var property;
	   var idx=0;
	   for (var key in aniObj.prop)
	   {
		    if(key!="id"){
			
				if(idx==0){
					property=key;
				}else{
					property=property+","+key; 

				}
				idx++;
			}
			
	   }
       
	   if(aniObj.staticProp==false){
		    
			
			this.setAnimationProperty(element,"property", property);
			this.setAnimationProperty(element,"fill-mode","both");
			this.setAnimationProperty(element,"duration",aniObj.duration+"s");
			this.setAnimationProperty(element,"delay",aniObj.delay+"s");
			this.setAnimationProperty(element,"timing-function",aniObj.ease);
			
			
			
	   }
	  
	   for (var key in aniObj.prop)
	   {
		    if(key!="id"){
                if(aniObj.unit=="auto"){
				    element[key]=jarvis.lib.getAutoUnitValue(aniObj.prop[key],key);
				}else{
					if(aniObj.isPx==true){
						
						element[key]=Math.floor(aniObj.prop[key])+aniObj.unit;
					}else{
					    element[key]=aniObj.prop[key]+aniObj.unit;
					}
				    
				}
				
				
			}
	   }
       

    }
	
	,
	setAnimationProperty: function(element,property,value) 
	{
        element["-webkit-transition-"+property]=value;
		element["-moz-transition-"+property]=value;
		element["-ms-transition-"+property]=value;
		element["-o-transition-"+property]=value;
		element["transition-"+property]=value;
       

	},
	animationComlete: function(aniObj) 
	{
        
		if(aniObj==null){
		    return;
		}
		var idx=this.animationA.indexOf(aniObj);
		if(idx==-1){
		    return;
		}
		var element= this.elementA[idx];
	    this.removeAnimationCss(aniObj,element);

		

		jarvis.lib.excuteDelegate(aniObj.delegate,"complete",[aniObj.id]);
		
		delete aniObj.listener.animationComlete;
		delete this.elementA[idx];
		delete this.animationA[idx];
    }
	,
	removeAnimationCss: function(aniObj,element) 
	{
		if(aniObj.staticProp==false){
			this.setAnimationProperty(element,"property","none");
			this.setAnimationProperty(element,"fill-mode","");
			this.setAnimationProperty(element,"duration","");
			this.setAnimationProperty(element,"delay","");
			this.setAnimationProperty(element,"timing-function","");
		}
        jarvis.lib.removeEventListener(aniObj.listener,"webkitTransitionEnd",aniObj.listener.animationComlete);
		jarvis.lib.removeEventListener(aniObj.listener,"transitionend",aniObj.listener.animationComlete);
		jarvis.lib.removeEventListener(aniObj.listener,"msTransitionEnd",aniObj.listener.animationComlete);
		jarvis.lib.removeEventListener(aniObj.listener,"oTransitionEnd",aniObj.listener.animationComlete);
	},
	stopAllAnimation: function() 
	{
        for(var i=0;i<this.animationA.length;++i){
	        if(this.animationA[i]!=null){
               this.elementA[i]["-webkit-animation-play-state"]="paused";
			   this.elementA[i]["animation-play-state"]="paused";
			   this.removeAnimationCss(this.animationA[i],this.elementA[i]);
			}
			  
	   
	    }
	    this.animationA=new Array();
	    this.elementA=new Array();
    }
	,
    stopAnimation: function(id) 
	{
       var idx=-1;
       for(var i=0;i<this.animationA.length;++i){
	        if(this.animationA[i]!=null){
				if(id==this.animationA[i].id){
				   idx=i;
				   
				   this.elementA[i]["-webkit-animation-play-state"]="paused";
				   this.elementA[i]["animation-play-state"]="paused";
				   this.removeAnimationCss(this.animationA[i],this.elementA[i]);
				   break;
				}
			}
	   
	   }
	   
	   if(idx!=-1){
	      delete this.elementA[idx]; 
	      delete this.animationA[idx];
	   }
	  
	  
    }
	
	
}






/*

*/