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




jarvis.FeaturedOption=function(){
   
   this.cssKey="board";
   this.reciveKey="jarvisViewerBoard";   
   this.apiPath="http://imbctc022.cafe24.com/radio/datas/vodlist.js";
   
   this.title="Featured";
   this.colorA=new Array();
   this.colorA[0]="#ffffff";//title
   this.colorA[1]="#b2cef4";//text
   this.colorA[2]="bg-black30"; //bg
   this.colorA[3]=false;  //grey
  
}

jarvis.Featured= function(pageID,option) 
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
	   this.option=new jarvis.FeaturedOption();
	}
	jarvis.lib.addAttribute(this.body,this.option.cssKey+" uicomponent");
    
	this.reciveKey=this.option.reciveKey;
	this.info=jarvis.jarvisInfo;
	jarvis[this.reciveKey+jarvis.config.RECIVE_KEY]=this;
    this.dataA=null;
   
    this.bgClass="";
	this.txtColor="";
	this.totalPage=-1;
    this.currentPage=-1;
	this.pageNum=3;
	this.dataA=null; 


	this.title = document.createElement('h2');
	jarvis.lib.addAttribute(this.title,'radio-title font-big');
	this.title.innerHTML=this.option.title;
	this.body.appendChild(this.title);
	


	this.grid= document.createElement('div');
	jarvis.lib.addAttribute(this.grid,'grid');
	this.body.appendChild(this.grid);
	
	this.pageList = document.createElement('div');
	jarvis.lib.addAttribute(this.pageList,'page-list');
	this.grid.appendChild(this.pageList);
	
	this.pageNavi= document.createElement('div');
	jarvis.lib.addAttribute(this.pageNavi,'page-navi pagecontrol-bottom align-center');
    this.grid.appendChild(this.pageNavi);
	
	this.loadingBar= document.createElement("div");
	jarvis.lib.addAttribute(this.loadingBar,"animated loading");
    this.grid.appendChild(this.loadingBar);		
	
	this.pageControl= null;
	this.slideBox=null;
    this.currentPageBox=null;
    this.changeColor(this.option.colorA);	
    
	this.pageControl=null;
	this.slideBox=null;
    this.currentPageBox=null;
    this.changeColor(this.option.colorA);	
    

    	
}

jarvis.Featured.prototype = 
{
    
	init :function()
	{
	    var that=this;
		var delegate=function(){}; 
		delegate.prototype = {
		                      pageChange : function(idx)
                              {
								  if(idx==that.currentPage){
										return;
								  }
								  that.pageChange(idx);
								   
							  }
						 }

		var option=new jarvis.UIPageControlOption();
		option.pageSize=6;
		option.cssKey="pagecontrol";
		option.usedNumber=false;
		this.pageControl=new jarvis.UIPageControl(this.pageNavi,new delegate(),option);
		

        var that=this;
        var delegate=function(){};
            delegate.prototype = {
                              initBox : function(div){//置段持失
							       that.currentPageBox=div; 
								   that.creatPage(div,0);
							  },   
							  moveStart : function(div,dr){
								  jarvis.config.isAnimation=true;
							      that.creatPage(div,dr);
								  
							  }, 
							  moveChanged : function(div,dr){
							      that.currentPageBox=div;
								  var idx=that.currentPage+dr;
								  that.setPageIndex(idx);
						          
							  },
							  moveEnd : function(div,dr){
								  jarvis.config.isAnimation=false;
							      that.currentPageBox=div; 
								  that.pageBoxComplete();
							  }
		    }
			 
		var slideOption=new jarvis.UISlideBoxOption();
		slideOption.divKey="ul";	
        this.slideBox=new jarvis.UISlideBox(this.pageList,new delegate(),slideOption);
	    this.slideBox.init();


		this.loadData();
		
    },
	remove : function()
	{
	},
	reset : function(option)
	{
	    jarvis[this.reciveKey+jarvis.config.RECIVE_KEY]=null;
		this.currentPage=-1;
		this.option=option;
		this.reciveKey=this.option.reciveKey;
		jarvis[this.reciveKey+jarvis.config.RECIVE_KEY]=this;
		this.title.innerHTML=this.option.title;
	    
		this.loadData()

	},
    loadData:function()
	{
        //if(this.dataA==null){
			this.loading(true);
			this.dataA=new Array();
			//alert(this.option.apiPath);
			this.info.loadIronMans(this.option.apiPath,"jarvis."+this.reciveKey+jarvis.config.RECIVE_KEY+".dataComplete",this.reciveKey);
		//}
	},
	dataComplete :function()
	{
	   	this.loading(false); 
		this.dataA=this.info.getIronMans(this.reciveKey);
		
		this.pageSetChange();
        this.pageBoxComplete();

	},
	
    pageSetChange :function()
	{
	    
        if(this.dataA==null){
		     return;
	    }
		if(this.currentPageBox==null){
		     return;
		}
		
	
		var totalNum=Math.ceil(this.dataA.length/this.pageNum);
		
		if(this.totalNum!=totalNum){
              if(this.currentPage>=totalNum){
			     this.currentPage=(totalNum-1);
			  }else if(this.currentPage<0){
			     this.currentPage=0;
			  }
			  this.pageControl.reset(totalNum);
              this.totalPage=totalNum;
			  this.setPageIndex(this.currentPage);
			  this.creatPage(this.currentPageBox,0);
			  
		
		}
		
		

	},
	setPageIndex :function(idx)
	{
        
		this.currentPage=idx;
		if(this.pageControl!=null){
			this.pageControl.setPageIdx(this.currentPage);
		}
		if(this.slideBox!=null){
			this.slideBox.limitedIndex=this.totalPage;
			this.slideBox.currentIndex=this.currentPage;
		}
	},
	pageChange :function(idx,isAni)
	{
        
		if(isAni===undefined){
		    isAni=true;
		}
		if(this.currentPageBox==null){
		     return;
		}
		if(this.slideBox!=null){
			if(this.slideBox.isMoveAble==true){
			    return;
			}
		}
		
		if(this.currentPage!=-1 && isAni==true){
			if(idx>this.currentPage){
				 this.currentPage=idx-1;
			     this.slideBox.moveSlide(1);
			}else{
				 this.currentPage=idx+1;
			     this.slideBox.moveSlide(-1);
			}
			this.setPageIndex(idx);
		}else{
		    this.setPageIndex(idx);
		}
		
		
		
	},
	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////   
	creatPage:function(div,dr)
	{
	    
        var idx=this.currentPage+dr;
		if(idx<0 || idx>=this.totalPage){
            return;
		}
        var cellA=new Array();
		div.innerHTML="";
        var si=idx*this.pageNum;
		var fi=si+this.pageNum;
        
		if(fi>this.dataA.length){
		    fi=this.dataA.length;
		}
      
		
    //update-s  
		var li;
		var btn;
	    var img;
        var data;
		
        var that=this;
		for(var i=si;i<fi;++i){
			data=this.dataA[i];
			li=document.createElement('li');
		    div.appendChild(li);
			jarvis.lib.addAttribute(li,'banner');
			
			if(data.isLink==true){
			    btn=document.createElement('a');
			    jarvis.lib.addAttribute(btn,'cell');
				btn.href=data.link;
			    btn.target=data.target;
			}else{
			    btn=document.createElement('button');
				jarvis.lib.addAttribute(btn,'btn cell');
				btn.idx=i;
				jarvis.lib.addEventListener(btn,"click",function (e){that.listSelect(e);})
			}
			
			li.appendChild(btn);
			if(data.subImgCash!=null){
			   btn.appendChild(data.subImgCash);
			}else{
			   img=document.createElement("img");
			   btn.appendChild(img);
			   img.src=data.subImgPath;
			   data.subImgCash=img;
			}
			li.info=data;
            li.imgBox=btn;
			
			cellA.push(li);
			

		}
    
        div.cellA=cellA;
		this.pageBoxResize(div);
	
	},
    listSelect:function(e)
	{
		var tg;
		if(e==null){
		    tg=select;
		}else{
		    tg=jarvis.lib.getEventTarget(e);
		}
		
		var idx=tg.idx;
		if(idx==null){
		   tg=tg.parentNode;
		   idx=tg.idx;
		}
		if(jarvis.uiSet===undefined || jarvis.uiSet==null){
		    alert("viewer : "+idx);
		}else{

			var data=this.dataA[idx];
			if(data.link!="" && data.target=="_app"){
			    jarvis.uiSet.changePage(data.link);
			
			}else{
				var bounce=jarvis.lib.getAbsoluteBounce(tg);
				jarvis.uiSet.openViewer(this.dataA,idx,bounce);
			
			}

            
			
			
		}


	},
	pageBoxResize:function(div)
	{
		if(div==null){
		     return;
		}
		var cellA=div.cellA;
		if(cellA==null){
		     return;
		}
		
		var cell;
		var bounce;
		for(var i=0;i<cellA.length;++i){
			cell=cellA[i];
			//update-s   
			bounce=jarvis.lib.getAbsoluteBounce(cell);
			cell.imgBox.style.height=Math.floor(bounce.width*jarvis.config.IMAGE_SCALE_BN2)+"px";
		    //update-e   
		}

	},
    pageBoxComplete:function()
	{
        /*
		if(this.currentPageBox==null){
		     return;
		}
		var cellA=this.currentPageBox.cellA;
		if(cellA==null){
		     return;
		}
		
		var cell;
		
		for(var i=0;i<cellA.length;++i){
			cell=cellA[i];
			if(cell.info.imgCash==null){
			    cell.img=document.createElement("img");
				cell.imgBox.appendChild(cell.img);
				cell.img.src=cell.info.subImgPath;
				cell.info.subImgCash=cell.img;
			}
		
		}
        */

	},
///////////////////////////////////////////////////////////////////////////////////////////////////////////////   
    pageBoxColorChange:function()
	{
        if(this.currentPageBox==null){
		     return;
		}
		/*
		var cellA=this.currentPageBox.cellA;
		if(cellA==null){
		     return;
		}
		
		var cell;
		
		for(var i=0;i<cellA.length;++i){
			cell=cellA[i];
			cell.a.style.color=this.txtColor;
	    }

        */
	},
	changeColor :function(colorA)
	{
	  
	   this.title.style.color=colorA[0];
	   this.txtColor=colorA[1];
	   
	    
       jarvis.lib.removeAttribute(this.grid,this.bgClass);	
	   this.bgClass=colorA[2];
       

	   jarvis.lib.addAttribute(this.grid,this.bgClass);	
         
	   if(colorA[3]==true){
	       jarvis.lib.addAttribute(this.pageNavi,'pagecontrol-gray');
	   }else{
	       jarvis.lib.removeAttribute(this.pageNavi,'pagecontrol-gray');
	   } 
	   this.pageBoxColorChange();

	},
	
    orientationChange : function(){

		this.resize();
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
	   	 if(browserHeight!==undefined){
		   this.body.style.height=browserHeight+"px";
		}
		
		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
	    if(bounce.width>=10000){
		    return;
		}
		var bounceG=jarvis.lib.getAbsoluteBounce(this.grid);
		var bounceT=jarvis.lib.getAbsoluteBounce(this.title);
		

        var bounceL=jarvis.lib.getRelativeBounce(this.pageList);
		var bounceP=jarvis.lib.getAbsoluteBounce(this.pageNavi);
        
		var gridHei=bounce.height-(bounceG.y-bounce.y);
        this.grid.style.height=gridHei+"px";

		var hei=gridHei-bounceL.y-bounceP.height;
		this.pageList.style.height=hei+"px";
        this.slideBox.resize();
	    this.pageBoxResize(this.currentPageBox);
	}


}