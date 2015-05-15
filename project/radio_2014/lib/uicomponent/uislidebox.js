/**
 * lib v1.0: jarvis component
 * by aeddang
 */
/*
interfaces
*/


if(typeof jarvis == "undefined") var jarvis = new Object();


/*
jarvis.delegate=function(){}
jarvis.delegate.prototype = 
{
    initBox : function(div){},   
	moveStart : function(divL,divR){},   
	moveChanged : function(div,dr){},
	moveEnd : function(div,dr){}
}
*/
jarvis.UISlideBoxOption=function()
{
   	this.cssKey="jarvis-uislidebox-panel";
    this.divKey="div";
	this.slideSpd=0.2;
	this.isScrollAble=true;
}



jarvis.UISlideBox= function(pageID,delegate,option) 
{
	
	if(option=== undefined || option=== null){
	    option=new jarvis.UISlideBoxOption();
	}
    if(delegate=== undefined){
	    delegate=null;
    }
	this.delegate=delegate;
	this.option=option;
	this.isMoveAble=false;
	this.isMoving=false;
	this.isSliding=false;
	this.selfStart=false;
	this.body;
	if(typeof pageID=="String" || typeof pageID=="string"){
	    this.body=document.getElementById(pageID);
	}else{
	    this.body=pageID;
	}
	
	this.body.style.overflow="hidden";
	this.body.style.position="relative";
    this.view=document.createElement("div");

   
    this.view.style.position="absolute";
	this.view.style.top="0px";
	//this.view.style.zIndex=300;
    this.body.appendChild(this.view);

    this.currentView=null;
    this.addView=null;
    this.isAniMode=false;
    this.currentDr=0;
    this.currentIndex=-1;
    this.limitedIndex=-1;
    this.finalGesture="";
     
    
	
	
}


jarvis.UISlideBox.prototype = 
{
	
    init: function() 
	{
		
		var that=this;
		var gestureDelegate=function(){}; 
		gestureDelegate.prototype = {
		                      
								stateChange :function(e,point)
								{
									if(e==jarvis.GestureElement.START)
									{
										that.touchStart();
									}
									else if(e==jarvis.GestureElement.MOVE_H)
									{
										that.touchMove(point.x);
									}
									else if(e==jarvis.GestureElement.END)
									{
										that.touchEnd(point);
									}
								},
								gestureComplete: function(e)
								{
									
									if(e==jarvis.GestureElement.PAN_RIGHT || e==jarvis.GestureElement.PAN_LEFT){
											that.finalGesture=e;
									}
								}
							  
		}

        var scr;
		if(this.option.isScrollAble==true){
		   scr=false;
		}else{
		   scr=true;
		}

		var gestureElement=new  jarvis.GestureElement(this.body,new gestureDelegate(),scr,true);
      
        this.resize();
		
	},
	setAni:function()
	{
		if(this.isAniMode==true){
		    return;
		}
		this.isAniMode=true;
		jarvis.animation.animationCSS.setAnimationProperty(this.view.style,"property","left");
		jarvis.animation.animationCSS.setAnimationProperty(this.view.style,"fill-mode","both");
		jarvis.animation.animationCSS.setAnimationProperty(this.view.style,"duration",this.option.slideSpd+"s");
		jarvis.animation.animationCSS.setAnimationProperty(this.view.style,"timing-function","ease in");
	},
    removeAni:function()
	{
		if(this.isAniMode==false){
		    return;
		}
		this.isAniMode=false;
		jarvis.animation.animationCSS.setAnimationProperty(this.view.style,"property","none");
		jarvis.animation.animationCSS.setAnimationProperty(this.view.style,"fill-mode","");
		jarvis.animation.animationCSS.setAnimationProperty(this.view.style,"duration","");
		jarvis.animation.animationCSS.setAnimationProperty(this.view.style,"timing-function","");
	},
    touchStart:function()
	{
	    if(this.isSliding==true){
		   return;
		}
		if(this.isMoving==true){
		   return;
		}
		this.selfStart=true;
		
		this.isMoving=true;
       // jarvis.debuger.log("touchStart");
		
		
    },
    touchMove:function(point)
	{
	    if(this.isSliding==true){
		   return;
		}
		if(point<0){
		    this.moveInit(1);
		}else if(point>0){
		    this.moveInit(-1);
		}
		
		if(this.isMoveAble==false){
		    return;
		}
		//jarvis.debuger.trace("pos:"+point);
		
		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
		var tx=-bounce.width+point;
        this.view.style.left=tx+"px"
        
		
	},
    touchEnd:function(point)
	{
		if(this.isSliding==true){
		   return;
		}
		if(this.isMoveAble==false){
		    return;
		}
        
        var dr;
        if(this.finalGesture==jarvis.GestureElement.PAN_RIGHT){
			dr=-1;							
		}else if(this.finalGesture==jarvis.GestureElement.PAN_LEFT){
			dr=1;							   
		}else{
			dr=0;
			
		}
        this.finalGesture="";
		
		this.isMoving=false;
		this.moveSlide(dr);

		//jarvis.debuger.log("touchEnd");
	},
    resize: function() 
	{
        var bounce=jarvis.lib.getAbsoluteBounce(this.body);
        
		if(bounce.width>10000){
		    return;
		}
		
		var w=Math.floor(bounce.width);
        var h=Math.floor(bounce.height);
        this.view.style.width=w*3;
        this.view.style.height=h;
        this.view.style.left=-w+"px"

        if(this.currentView==null){
			this.currentView=this.creatCell(0);
			jarvis.lib.excuteDelegate(this.delegate,"initBox",[this.currentView]);
		}else{
			this.currentView.style.width=w+"px";
			this.currentView.style.height=h+"px";
			this.currentView.style.left=w+"px";
		}
		

    },
	moveInit: function(dr) 
	{
        
		if(this.isMoveAble==true && this.currentDr==dr){
		    return;
		}
		this.currentDr=dr;
		this.isMoveAble=true;
		
        this.removeAddView();
        this.addView=this.creatCell(dr);
		
		jarvis.lib.excuteDelegate(this.delegate,"moveStart",[this.addView,dr]);
    },
	moveSlide: function(dr) 
	{
        //jarvis.debuger.log("moveSlide");
		if(this.isSliding==true){
		   return;
		}

		if(this.isMoveAble==false){
		    this.moveInit(dr);
		}
		
		if(this.isMoving==true){
		    return;
		}
       // jarvis.debuger.log("moveSlideStart");
		
        if(this.limitedIndex!=-1){
		
		    var idx=this.currentIndex+dr;
			if(idx<0 || idx>=this.limitedIndex){
			   dr=0;
			}
		}
        this.setAni();
		this.isMoving=true;
		this.isSliding=true;
		var bounce=jarvis.lib.getAbsoluteBounce(this.body);

		var that=this;
		var tx=-(dr+1)*bounce.width;
        

	    var aniDelegate=function(){};
		aniDelegate.prototype = {
				complete : function(e)
				{
					that.removeAni();
					if(dr==0){
					   that.removeAddView();
					}else{
					   
					   that.view.removeChild(that.currentView);
					   that.currentView=that.addView
					   
					   that.view.style.left=-bounce.width+"px";
					   that.currentView.style.left=bounce.width+"px";
                       if(that.selfStart==true && dr!=0){
					       jarvis.lib.excuteDelegate(that.delegate,"moveChanged",[that.currentView,dr]);
					   }
					   that.selfStart=false;
					   jarvis.lib.excuteDelegate(that.delegate,"moveEnd",[that.currentView,dr]);
					}
					that.addView=null;
					that.isMoving=false;
					that.isMoveAble=false;
					that.isSliding=false;
					that.currentDr=0;
					
				}
		}
		var easev="ease in";
		
        

		jarvis.animation.startAnimation(this.view.style, {listener:this.view,staticProp:true, 
			                                              duration:this.option.slideSpd, left:tx, ease:easev ,isPx:true},new aniDelegate());


    },
	removeAddView: function() 
	{
		if(this.addView!=null){
		   this.view.removeChild(this.addView);
		   this.addView=null;
		}
		
	},
	creatCell: function(dr) 
	{
        var bounce=jarvis.lib.getAbsoluteBounce(this.body);
        var w=Math.floor(bounce.width);
        var h=Math.floor(bounce.height);

		var cell=document.createElement(this.option.divKey);
		cell.style.position="absolute";
		cell.style.width=w+"px";
		cell.style.height=h+"px";
		var idx=dr+1;
		cell.style.top="0px";
		cell.style.left=(idx*w)+"px";
		this.view.appendChild(cell);
		
		return cell;

    }
	
	
	
	
	
		
}

/*

*/