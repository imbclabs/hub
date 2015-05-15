/**
 * lib v1.0: MiniMsgInfo
 * by aeddang
 */
/*
interfaces


*/

if(typeof jarvis == "undefined") var jarvis = new Object();
if(typeof jarvis.miniInfo == "undefined") jarvis.miniInfo = new Object();



jarvis.miniInfo.MiniMsgInfo= function() 
{
	
	this.msgListAPI ="http://miniunit.imbc.com/List/MiniMsgList";
 
    this.msgRegisterAPI ="http://mini.imbc.com/webappapi/miniMsgRegister.aspx";
                          
    this.msgListA=null; //Dictionary <PageDataInfo>
    this.pageSize=30;
    this.resetInfo();

}


jarvis.miniInfo.MsgObject= function() 
{
      this.seqID="";
      this.uno="";
      this.userID="";
      this.userNm="";
      this.comment="";
      this.regDate="";
      this.rank="";
	  this.isWriteAble=false;
	  this.isWriteOnly=false;
 }


jarvis.miniInfo.MsgObject.prototype =
{
    setData:function(data,modify)
	{
		this.seqID=data.SeqID;
        this.uno=data.Uno;
        this.userID=data.UserID;
        this.userNm=data.UserNm;
        this.comment=data.Comment;
        this.regDate=data.RegDate;
        this.rank=data.Rank;
        this.modify=modify;
	}

}


jarvis.miniInfo.MiniMsgInfo.prototype =
{

	resetInfo:function()
	{
		this.msgListA=new Dictionary();
		
	},
    deleteMsg : function (sel,seqID)
    {  
		eval(sel+"('Y')");
	},
    writeMsg : function (sel,broadCastID,programGroupID,msg)
    {    
		
		var param=new Object();
		var that=this;
		param.type="1";
		param.bid=broadCastID;
        param.gid=programGroupID;
        param.TEXT=msg;
        
        var ajax=new jarvis.Ajax();
        ajax.request( this.msgRegisterAPI,param, "jarvis.miniInfo.writeMsgComplete","POST","text") 

		jarvis.miniInfo.writeMsgComplete= function(yn){
			 
			 
			 if(yn=="N"){
			     eval(sel+"('N')");	
				 return;
			 }
			 var data=ajax.returnData;
			 switch(data){
			    case "FAIL":
					 eval(sel+"('F')");	
					break;
                case "LOGINFAIL":
					eval(sel+"('L')");	
					break;
				case "UnAuth":
					eval(sel+"('U')");	
					break;
				case "error":
					eval(sel+"('E')");	
					break;
				default:
					//alert(data);
					eval(sel+"('Y')");	
					break;

			 }
             jarvis.miniInfo.writeMsgComplete=null;
			 
		}
        

	},
	resetMsgList : function (broadCastID,programGroupID)
    {
		 var code=broadCastID+programGroupID;
		 jarvis.miniInfo["loadMsgListLoading"+code]=null;
	},
    reLoadMsgList : function (sel,broadCastID,programGroupID)
    {
         this.removeMsgList(broadCastID,programGroupID,false);
		 return this.loadMsgList(sel,broadCastID,programGroupID);
    },
	reFlashMsgList : function (sel,broadCastID,programGroupID)
    {
         this.removeMsgList(broadCastID,programGroupID,true);
		 return this.loadMsgList(sel,broadCastID,programGroupID);
    },
	loadMsgList : function (sel,broadCastID,programGroupID)
    {
        var code=broadCastID+programGroupID;
		
        if(jarvis.miniInfo["loadMsgListLoading"+code]!=null){
		   return;
		}

		var msgInfo=this.getMsgInfo(broadCastID,programGroupID);
		
		if(msgInfo!=null){
		    if(msgInfo.loadComplete==true){
		         return false;
		    }
		
		}else{
		    msgInfo=new jarvis.PageDataInfo(this.pageSize);
			msgInfo.isReflashCheck="seqID";
			this.msgListA.setValue(code,msgInfo);
		}
		msgInfo.isReflashCheckIndex=0;
		if(msgInfo.loadStart()==false){
		     return false;
		}
		
		var param=new Object();
		var that=this;
		param.rtype="jsonp";
		param.bid=broadCastID;
        param.gid=programGroupID;
        param.page=msgInfo.page+1;
        param.pagesize=this.pageSize;
		param.nocash=Math.random();
		

		var ajax=new jarvis.Ajax();
		jarvis.miniInfo["loadMsgListLoading"+code]=true;
        ajax.request(this.msgListAPI,param,"jarvis.miniInfo.loadMsgListComplete"+code,"POST","jsonp") 
        
        
        jarvis.miniInfo["loadMsgListComplete"+code]= function(data){
			    
			 if(data=="N"){
			     eval(sel+"('N','"+broadCastID+"','"+programGroupID+"')");
				 return;
			 }
			 
			 var result=data.msgViewInfo;
             
			 var modify=String(data.msgViewInfo);
		
			 if(modify=="Y" || modify=="N" ){
                if(modify=="N"){
				   that.isWriteOnly=true;
				   data=new Array();
				}else{
                   data=data.msgList;
				   that.isWriteOnly=false;
				}
			    that.isWriteAble=true;
				
			 }else{
				that.isWriteOnly=false;
			    that.isWriteAble=false;
				data=new Array();
			 }
			 
			 var msg=null;
			 var datas=new Array();
             for(var i=0;i<data.length;++i){
		         msg=new jarvis.miniInfo.MsgObject();
				 msg.setData(data[i],modify);
				 if(msg.rank=="1"){
                    msgInfo.isReflashCheckIndex=1;
				    datas.unshift(msg);
				 }else{
				    datas.push(msg);
				 }
			     
			 }
			 
			 if(msgInfo.insertDatas(datas)==true){
			     eval(sel+"('Y','"+broadCastID+"','"+programGroupID+"')");
				 
			 }else{
				 if(modify=="N" || modify=="X"){
					eval(sel+"('Y','"+broadCastID+"','"+programGroupID+"')");
				 }
			 }
			 jarvis.miniInfo["loadMsgListLoading"+code]=null;
			 if( jarvis.miniInfo["loadMsgListComplete"+code]==this){
                 jarvis.miniInfo["loadMsgListComplete"+code]=null;
			 }
		}
        return true;
	},
    getMsgInfo : function (broadCastID,programGroupID)
    {
         var code=broadCastID+programGroupID;
		 var mInfo=this.msgListA.getValue(code);
		 return mInfo;

	},
    getWriteAble : function ()
    {
		return this.isWriteAble;
	},
    getWriteOnly : function ()
    {
		return this.isWriteOnly;
	},
	removeMsgList : function (broadCastID,programGroupID,isReflash)
    {
         var code=broadCastID+programGroupID;
		 if(isReflash==true){
		    var datas=this.msgListA.getValue(code);
		    if(datas!=null){
				datas.reset();
		    }
		 }else{
		    this.msgListA.removeValue(code);
		 }
		 
    },
    removeAllMsgList : function ()
    {
         this.msgListA=new Dictionary();
    }
}







/*

*/