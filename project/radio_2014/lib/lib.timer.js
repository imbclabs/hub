/**
 * lib v1.0: jarvis util
 * by aeddang
 */
/*
interfaces


*/

if(typeof jarvis == "undefined") var jarvis = new Object();




jarvis.Timer= function() 
{
	if(jarvis.lib.isAndroid()==true){
	   this.timeUnit=100;
	}else{
	   this.timeUnit=100;
	}
	
	this.t=9999;
	this.loofCount=0;
	this.loofTimer=null;
	this.timerA=new Array();
	this.removeA=new Array();

}
jarvis.TimerObject= function() 
{
	this.id="";
	this.t=0.1;
	
	this.isPlay=true;
	this.count=0;
	this.startCount=0;
	this.repeatCount=0;
	this.delegate=null;//excute/complete

}
jarvis.Timer.prototype =
{
	addTimer: function(delegate,tObj) 
	{
       var idx=this.removeA.indexOf(tObj.id)
	   if(idx!=-1){
	       delete this.removeA[idx];
	   }
	   var obj;
	   var str="";
	   var remainA=new Array();
	   if(tObj.id!=""){
			for(var i=0;i<this.timerA.length;++i){
				obj=this.timerA[i];
				if(tObj.id!=obj.id){
					remainA.push(obj);
					str=str+" "+obj.id;
				} 
			}
			this.timerA=remainA;
	   }
	   //jarvis.debuger.log("addTimer : "+str);
	   
	  
	   tObj.t=Math.round(tObj.t*10);
	   //jarvis.debuger.log(tObj.t+" "+tObj.id);
	   
	   tObj.delegate=delegate;
	   tObj.startCount= this.loofCount;
	   this.timerA.push(tObj);
	   jarvis.debuger.log("addTimer : "+this.timerA.length+" "+this.t+" "+tObj.t);
	   jarvis.debuger.log("addTimer : "+this.loofTimer);
	   if(this.t>tObj.t || this.loofTimer==null){
		   this.t=tObj.t;
		   this.addLoofTimer();
	   }
	  
	   
 

    }
	,
    resetTimer: function(id) 
	{
      
	   for(var i=0;i<this.timerA.length;++i){
	      var tObj=this.timerA[i];
          if(tObj.id!=id){
		     tObj.count=0;
			 tObj.startCount=this.loofCount;
		  }
	   }
    }
	,
    resetAllTimer: function() 
	{
       for(var i=0;i<this.timerA.length;++i){
	      var tObj=this.timerA[i];
          tObj.count=0;
		  tObj.startCount=this.loofCount;
		  
	   }
    }
	,
	stopTimer: function(id) 
	{
      
	   for(var i=0;i<this.timerA.length;++i){
	      var tObj=this.timerA[i];
          if(tObj.id!=id){
		     tObj.isPlay=false;
		  }
	   }
    }
	,
    stopAllTimer: function() 
	{
       for(var i=0;i<this.timerA.length;++i){
	      var tObj=this.timerA[i];
          tObj.isPlay=false;
		  
	   }
    }
	,
	playTimer: function(id) 
	{
      
	   for(var i=0;i<this.timerA.length;++i){
	      var tObj=this.timerA[i];
          if(tObj.id!=id){
		     tObj.isPlay=true;
		  }
	   }
    }
	,
    playAllTimer: function() 
	{
      
	   for(var i=0;i<this.timerA.length;++i){
	      var tObj=this.timerA[i];
          tObj.isPlay=true;
	   }
    }
	,
	removeAllTimer: function() 
	{
        this.timerA=new Array();
	    this.removeLoofTimer();
		this.loofCount=0;
    }
	,
    removeTimer: function(id) 
	{
       jarvis.debuger.log("removeTimer  : "+id);
	   var idx=this.removeA.indexOf(id)
	   if(idx==-1){
	       this.removeA.push(id);
	   }
	   
	   
	   
    }    
	,
    loof: function() 
	{
       
	   var remainA=new Array();
	   var deleteA=this.removeA;
	   this.removeA=new Array();
	   var tObj=null;
       var c=0;
       var tc=0;
	  
	   var rt=9999;
	   var idx;
	   //jarvis.debuger.trace("loof : "+Math.random());
	   for(var i=0;i<this.timerA.length;++i){
	      tObj=this.timerA[i];
          idx=deleteA.indexOf(tObj.id)
		  //jarvis.debuger.log("loof : "+tObj.id+":"+idx);
		  if(idx==-1){
		  
			c=this.loofCount-tObj.startCount;
			tc=(tObj.t/this.t)
            //jarvis.debuger.log("c : "+c+"  tc : "+tc+" c%tc  : "+c%tc);
			if((c%tc)==0 && tObj.isPlay==true && c!=0){
		        
				 // jarvis.debuger.log("loof excute: "+tObj.id);
			      jarvis.lib.excuteDelegate(tObj.delegate,"excute",[tObj.id]);
			      tObj.count++;
				 
			      if(tObj.repeatCount==0 || tObj.count<tObj.repeatCount){
			          if(rt>tObj.t){
					     rt=tObj.t;
					  }
					  remainA.push(tObj);
			      }else{
					  jarvis.lib.excuteDelegate(tObj.delegate,"complete",[tObj.id]);
				  }
		     
			}else{
				if(rt>tObj.t){
					rt=tObj.t;
				}
				remainA.push(tObj); 
			}
		  }else{
			 //jarvis.debuger.log("loof remove: "+tObj.id);
		   
		  }
	   }
	   // jarvis.debuger.log("loof remainA: "+remainA.length);
        if(remainA.length>0){
		    this.loofCount++;
			this.timerA=remainA;
			this.t=rt;
			this.addLoofTimer();
		}else{//remove all
		    this.removeAllTimer();
		}
        //jarvis.debuger.log("loof : "+str);
	   
    }
	,
    addLoofTimer: function() 
	{
        
		if(this.removeLoofTimer()==true){
			var tu=this.t*this.timeUnit;
			//var date=new Date();
			jarvis.debuger.log("tm : "+tu);
			this.loofTimer=setTimeout("jarvis.timer.loof()",tu);
		}
    }
	,
	removeLoofTimer: function() 
	{
        
		
		if( this.loofTimer!=null){
          // jarvis.debuger.log("removeLoofTimer");
		   clearTimeout( this.loofTimer );
           this.loofTimer=null;
		   return true;
		}else{
		   return true;
		}
		
    }
	
}
if(jarvis.timer===undefined){
	jarvis.timer=new jarvis.Timer();
}





/*

*/