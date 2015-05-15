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
	document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"/css/radio.css'>");

}





jarvis.PageTopOption=function(){
   
   this.cssKey="page-top";
   
   this.useInfoBox=true;
   this.infoTime="방송 : FM4U 밤 12시";
   this.infoText="연출: 김철영, 작가: 박찬은, 김가영";
   this.title="정준영의<em>심심타파</em>";
   
   this.isFullMode=true;
   this.boxPosX=0;
   this.boxPosY=325;
    
   this.bgA=["radio-head.jpg"];
   this.bgMA=null;
   
   
   this.cssTitleColor="#ffffff";
   this.cssTitleSize=38;
   this.cssTxtColor="#ffffff";
   
   
}

jarvis.PageTop= function(pageID,option) 
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
	this.info=jarvis.jarvisInfo;
    this.option=option;
	if(this.option===undefined){
	   this.option=new jarvis.PageTopOption();
	}
	jarvis.lib.addAttribute(this.body,this.option.cssKey);
    this.moveValue=0;      
    this.isImgOnload=false;
    this.content = document.createElement('div');
   
	jarvis.lib.addAttribute(this.content,'content');
	this.body.appendChild(this.content);
    
	this.imgBox= document.createElement('div');
	this.content.appendChild(this.imgBox);
	this.img=null;

	this.logo = document.createElement('div');
	jarvis.lib.addAttribute(this.logo,'logo');
	this.content.appendChild(this.logo);
    
    

    this.logoInfo = document.createElement('div');
	jarvis.lib.addAttribute(this.logoInfo,'info font-middle');

	this.logo.appendChild(this.logoInfo);

	this.logoTime = document.createElement('div');
    jarvis.lib.addAttribute(this.logoTime,'time font-class');
    this.logoInfo.appendChild(this.logoTime);

	this.logoText = document.createElement('div');
    jarvis.lib.addAttribute(this.logoText,'text font-class');
    this.logoInfo.appendChild(this.logoText);

	
    this.logoTitle = document.createElement('div');
	jarvis.lib.addAttribute(this.logoTitle,'title font-class');
    
	this.logo.appendChild(this.logoTitle);
   	
	this.loadingBar= document.createElement("div");
	jarvis.lib.addAttribute(this.loadingBar,"animated loading");
    this.content.appendChild(this.loadingBar);


	
}

jarvis.PageTop.prototype = 
{
    
	init : function()
	{
		
		this.reset(this.option);
    },
	remove : function()
	{
	},
	reset : function(option)
	{
		
		this.option=option;
		//alert(this.option.bgA);
		//alert(this.option.bgMA);
		if(this.option.useInfoBox==false){
		   this.logo.style.display="none";
		}else{
		   this.logo.style.display="block";
		}
        

		this.loadImg();
		this.logoTime.innerHTML=this.option.infoTime;
		this.logoText.style.color=this.option.cssTxtColor;
		this.logoText.innerHTML=this.option.infoText;

		this.logoTitle.style.color=this.option.cssTitleColor;
		this.logoTitle.style.fontSize=this.option.cssTitleSize+"px";
		
		this.logoTitle.innerHTML=this.option.title;
        
        this.setLogoPos();
	},
	loadImg:function(){
	    this.isImgOnload=false;
        var that=this;
		var imgA;
		if(jarvis.lib.mobile==true && this.option.bgMA!=null){
		    if(this.option.bgMA.length<1){
			    imgA=this.option.bgA;
			}else{
			    imgA=this.option.bgMA;
			}
			
			
		
		}else{
		    imgA=this.option.bgA;
		}
		var r=jarvis.lib.getRandomInt(imgA.length);
		var bgImg=imgA[r];
		
		this.loading(true);
		
		if(this.img!=null && this.imgBox!=null){
		   this.imgBox.removeChild(this.img);
		   this.img=null;
		}
        this.img=document.createElement('img');
		this.img.style.position="absolute";
		
        jarvis.lib.addEventListener(this.img,"load",function (e){ that.imgLoadComplete(e);})
        this.img.src=bgImg;
	},
	imgLoadComplete:function(e){
	    this.isImgOnload=true;
		this.imgBox.appendChild(this.img);
		this.setImgPos();
		this.loading(false);
	},
	setImgPos:function(){
	    
		
		var w=this.img.width; 
		var h=this.img.height;
		
		
		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
        if(h==0|| w==0|| bounce.width==0 || bounce.height==0){
		    return;
		}
		
		var wid=w*bounce.height/h;
        var hei=bounce.height;
	    var tx=(bounce.width-wid)/2;
        
		this.img.width=wid;
        this.img.height=hei;
		
		this.img.style.top="0px";
		this.img.style.left=tx+"px";
		
	},
	moveUI:function(value,isAni){
	    this.moveValue=value;
		
		if(isAni==true){
		    var tx=this.getLogoPos()
			if(tx==-1){
			   tx=0;
			}else{
			   tx=tx+this.option.boxPosX;
			}	
			
			
            var aniDelegate=function(){};
		    aniDelegate.prototype = {
				 complete : function(e)
				 {
					jarvis.config.isAnimation=false;
					
				 }
		     }
			 var easev="ease out";
			 jarvis.animation.startAnimation(this.logo.style, {listener:this.logo, duration:0.3, left:tx, ease:easev ,isPx:true},new aniDelegate());
			


		}else{
		    this.setLogoPos();
	    }
	
	},
	getLogoPos :function()
	{
		var tx=0;
	    
       
        if(this.info.isPhone==true || this.option.isFullMode==false){
				this.logo.style.left="0px";
				this.logo.style.bottom="0px";

				
				return -1;
		}
		if(this.option.isFullMode==true){
			
			
			
			var parent = this.body.parentNode;
			if(parent!=null){
		       
			   tx=jarvis.lib.getAbsoluteBounce(parent).x;
			}

			tx=tx+jarvis.uiSet.uiStartPosX+this.moveValue;

		}
		return tx;
	},
	setLogoPos :function()
	{
		var tx=this.getLogoPos();
		if(tx!=-1){
			this.logo.style.bottom="";
			this.logo.style.left=(tx+this.option.boxPosX)+"px";
			this.logo.style.top=this.option.boxPosY+"px";
		}else{
		   tx=0;
		}

		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
		var w=bounce.width-((tx+this.option.boxPosX)*2);
	    var len=jarvis.lib.getCalculateStringWidth(this.option.title);
		var size=Math.floor(w/len)*1.25;
		if(size>this.option.cssTitleSize){
		   size=this.option.cssTitleSize;
		}
        if(size<0){
		     return;
		}
        this.logoTitle.style.fontSize=size+"px";
        if(this.info.isPhone==true || this.option.isFullMode==false){
			this.logo.style.width=bounce.width+"px";
		}else{
		    this.logo.style.width="";
		}
        
	},
	changeColor :function(colorA)
	{
	   
		
		
	},
	
    orientationChange : function(){
	},
    loading:function(ac)
	{
       if(ac==true){
		   jarvis.lib.addAttribute( this.loadingBar,"data-loading")
	   }else{
		   jarvis.lib.removeAttribute( this.loadingBar,"data-loading");
	   }
	},
	resize : function(browserHeight)
	{
	   var bounce=jarvis.lib.getAbsoluteBounce(this.body);
	    if(bounce.width>=10000){
		    return;
		}
	   
	   this.setLogoPos();
       if(this.isImgOnload==true){
	      this.setImgPos();
	      
	   }
	}
}