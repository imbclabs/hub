/**
 * miniInfo v1.0: SongInfo
 * by aeddang
 */
/*
interfaces


*/

if(typeof jarvis == "undefined") var jarvis = new Object();
if(typeof jarvis.miniInfo == "undefined") jarvis.miniInfo = new Object();


jarvis.miniInfo.SongInfo= function() 
{
	this.currentSongAPI ="http://miniunit.imbc.com/list/somitem";
    this.currentSongListAPI ="http://miniunit.imbc.com/list/SomList";
	this.programSongListAPI ="http://miniunit.imbc.com/list/musicitemlist";
	//?bid=1000630100000100000&gid=9&bdate=2014-08-21&rtype=jsonp&callback=list 
    

	this.songA=null; //Array<SongObject>
	this.songListA=null; //Dictionary <Array<SelectSongObject>?
	this.programSongListA=null; //Dictionary <Array<SelectSongObject>?
         
	this.resetInfo();

}
jarvis.miniInfo.SongObject= function() 
{
      this.logCD="";
      this.channel="";
      this.broadcastID="";
      this.programGroupID="";
      this.regDate="";
      this.somItem="";
      this.progCode="";
    
}

jarvis.miniInfo.SongObject.prototype =
{
    setData:function(data)
	{
		this.channel=data.Channel;
        this.logCD=data.LogCD;
        this.broadcastID=data.BroadcastID;
        this.programGroupID=data.GroupID;
        this.regDate=data.RegDate;
        this.somItem=data.SomItem;
        this.progCode=data.ProgCode;
       
	}

}

jarvis.miniInfo.SelectSongObject= function() 
{
        this.rownum="";
        this.seq_no="";
        this.title="";
        this.broadDate="";
        this.artistName="";
        this.trackTitle="";
        this.albumImageUrl="";
		
		this.DAUM_PCUrl="";
		this.DAUM_MOBILEUrl="";
		this.DAUM_IOSUrl="";
		this.DAUM_ANDROIDUrl="";

		this.isLinkAble=false;

		this.link="";
    
}

jarvis.miniInfo.SelectSongObject.prototype =
{
    setData:function(data)
	{
		this.rownum=data.Rownum;
        this.seq_no=data.Seq_no;
        this.title=data.Title;
        this.broadDate=data.BroadDate;
        this.artistName=data.ArtistName;
        this.trackTitle=data.TrackTitle;
		this.albumImageUrl=String(data.AlbumImageUrl);
		
		this.DAUM_PCUrl=data.DAUM_PCUrl;
		this.DAUM_MOBILEUrl=data.DAUM_MOBILEUrl;
		this.DAUM_IOSUrl=data.DAUM_IOSUrl;
		this.DAUM_ANDROIDUrl=data.DAUM_ANDROIDUrl;
		
		var albumCheck=this.albumImageUrl.toLowerCase();
        if(albumCheck.indexOf(".jpg")==-1 && albumCheck.indexOf(".png")==-1  && albumCheck.indexOf("http")==-1){
		    this.albumImageUrl="./style/album_default.png";
		}
    

		if(String(data.DAUM_AODCheck)=="Y"){
		    this.isLinkAble=true;
            if(jarvis.lib.mobile==true){
                if(jarvis.miniInfo.isIos==true){
				    this.link=this.DAUM_IOSUrl;
				}else if(jarvis.miniInfo.isAndroid==true){
				    this.link=this.DAUM_ANDROIDUrl;
				}else{
				    this.link=this.DAUM_MOBILEUrl;
				}
               
			    
			}else if(this.DAUM_PCUrl!=""){
			    this.link=this.DAUM_PCUrl;
			}else{
			    this.isLinkAble=false;
			}
			
		}else{
		    this.isLinkAble=false;
		}
			
			

	
	}

}

jarvis.miniInfo.SongInfo.prototype =
{
    resetInfo:function()
	{
		 this.songA=new Array(); 
	     this.songListA=new Dictionary();
         this.programSongListA=new Dictionary();
	},


    loadCurrentSong : function (sel)
    {
        this.songA=new Array();
		var param=new Object();
		var that=this;
		param.rtype="jsonp";
		param.nocash=Math.random();
        

        jarvis.miniInfo.loadCurrentSongComplete= function(data){
			    
			 if(data=="N"){
			     eval(sel+"('N');");
				 return;
			 }
			 var song=null;
             for(var i=0;i<data.SomItemList.length;++i){
		         song=new jarvis.miniInfo.SongObject();
				 song.setData(data.SomItemList[i]);
			     that.songA.push(song);
			 }
             eval(sel+"('Y')");		
			 if(jarvis.miniInfo.loadCurrentSongComplete==this){
				jarvis.miniInfo.loadCurrentSongComplete=null;
			 }
		}
        
        var ajax=new jarvis.Ajax();
        ajax.request(this.currentSongAPI,param,"jarvis.miniInfo.loadCurrentSongComplete","POST","jsonp") 
        

		
	},

    getCurrentSong : function (channel)
    {
         var returnA=new Array();
		 var song=null;
		 for(var i=0;i<this.songA.length;++i){
		     song=this.songA[i];
		     if(song.channel==channel){
			    returnA.push(song);
			 }
	     }
         
		 return returnA;

	},

    removeCurrentSong : function ()
    {
        this.songA=new Array();
	},
	loadCurrentSongList : function (sel,broadCastID,programGroupID)
    {
        
		var param=new Object();
		var that=this;
		param.rtype="jsonp";
		param.bid=broadCastID;
        param.gid=programGroupID;
       
        
		var code=broadCastID+programGroupID;

        jarvis.miniInfo["loadCurrentSongListComplete"+code]= function(data){
			 if(data=="N"){
			      eval(sel+"('N','"+broadCastID+"','"+programGroupID+"')");
				 return;
			 }   
			 var arr=that.songListA.getValue(code);
             if(arr==null){
			    arr=new Array();
				that.songListA.setValue(code,arr);
			 }
             
			 var song=null;
             for(var i=0;i<data.length;++i){
		         song=new jarvis.miniInfo.SelectSongObject();
				 song.setData(data[i]);
			     arr.push(song);
			 }
             

             eval(sel+"('Y','"+broadCastID+"','"+programGroupID+"')");	
			 if(jarvis.miniInfo["loadCurrentSongListComplete"+code]==this){
				jarvis.miniInfo["loadCurrentSongListComplete"+code]=null;
			 }
		}
        var ajax=new jarvis.Ajax();
        ajax.request(this.currentSongListAPI,param,"jarvis.miniInfo.loadCurrentSongListComplete"+code,"POST","jsonp") 
        

	},
   
    getCurrentSongList : function (broadCastID,programGroupID)
    {
         var code=broadCastID+programGroupID;
		 var arr=this.songListA.getValue(code);
		 if(arr==null){
		     return new Array();
		 }else{
		     return arr;
		 }
		 

	},
    removeCurrentSongList : function (broadCastID,programGroupID)
    {
         var code=broadCastID+programGroupID;
		 this.songListA.removeValue(code);
    },
    removeAllCurrentSongList : function ()
    {
         this.songListA=new Dictionary();
    },

	loadProgramSongList : function (sel,broadCastID,programGroupID,ymd)
    {
        
		var param=new Object();
		var that=this;
		param.rtype="jsonp";
		param.bid=broadCastID;
        param.gid=programGroupID;
        param.bdate=jarvis.lib.getDateByCode(ymd);
       
		var code=broadCastID+programGroupID+ymd;
        
        jarvis.miniInfo["loadProgramSongListComplete"+code]= function(data){
			 if(data=="N"){
			      eval(sel+"('N','"+broadCastID+"','"+programGroupID+"','"+ymd+"')");
				 return;
			 }   
			 var arr=new Array();
			 that.programSongListA.setValue(code,arr);
                  
			 var song=null;
			 
             for(var i=0;i<data.length;++i){
		         song=new jarvis.miniInfo.SelectSongObject();
				 song.setData(data[i]);
			     arr.push(song);
			 }
             

             eval(sel+"('Y','"+broadCastID+"','"+programGroupID+"','"+ymd+"')");
			 if(jarvis.miniInfo["loadProgramSongListComplete"+code]==this){
				jarvis.miniInfo["loadProgramSongListComplete"+code]=null;
			 }
		}
        var ajax=new jarvis.Ajax();
        ajax.request(this.programSongListAPI,param,"jarvis.miniInfo.loadProgramSongListComplete"+code,"POST","jsonp") 
        

	},
   
    getProgramSongList : function (broadCastID,programGroupID,ymd)
    {
         var code=broadCastID+programGroupID+ymd;
		 
		 var arr=this.programSongListA.getValue(code);
		 if(arr==null){
		     return new Array();
		 }else{
		     return arr;
		 }
		 

	},
    removeProgramSongList : function (broadCastID,programGroupID,ymd)
    {
         var code=broadCastID+programGroupID+ymd;
		 this.programSongListA.removeValue(code);
    },
    removeAllProgramSongList : function ()
    {
         this.programSongListA=new Dictionary();
    }
   
}







/*

*/