/**
 * miniInfo v1.0: AudioPlayer 
 * by aeddang
 */
/*
interfaces

*/

if(typeof jarvis == "undefined") var jarvis = new Object();


if(jarvis.dirPath===undefined){
	jarvis.dirPath="./";
	if(window.location.href.indexOf("http")==-1 || window.location.href.indexOf("imbctc")!=-1){
		jarvis.dirPath="./";
	}else{
    }
	document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"/css/global.css'>");
	document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"/css/base.css'>");
	document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"/css/ui.css'>");

}


document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"/css/sample.css'>");


jarvis.SampleOption=function(){
   
   this.cssKey="sample";
   this.sampleOption=true;
}


jarvis.Sample= function(pageID,option) 
{
	
	
	this.body;
	if(pageID===undefined){
		this.body=document.body;
	}else{
		if(typeof pageID=="String"){
			this.body=document.getElementById(pageID);
		}else{
			this.body=pageID;
		}
	   
	}	
    this.option=option;
	if(this.option===undefined){
	   this.option=new jarvis.SampleOption();
	}
	jarvis.lib.addAttribute(this.body,this.option.cssKey);
    
    this.body.innerHTML="<div id='sample' class='sample-div'>inner html test div<div>";
    
	this.sampleDIV=document.getElementById("sample");
	this.defaultBtn=document.createElement("button");
    
    this.defaultBtn.innerHTML="test dom button";
    this.body.appendChild( this.defaultBtn);
	jarvis.lib.addAttribute(this.defaultBtn,'default-btn');

	if(this.option.sampleOption==true){
	   this.sampleBtn=document.createElement("button");
	   this.sampleBtn.innerHTML="test sampleBtn button";
	   this.body.appendChild( this.sampleBtn);
	}else{
	   
	}
	var that=this

	
    
	
	
}

jarvis.Sample.prototype = 
{
    
	init : function()
	{
		var that=this;
	 
    },
		
    orientationChange : function(){
	},

	resize : function(browserHeight)
	{
	   

	},

	sampleFn : function(){
	    alert("sample")
	}  
}



