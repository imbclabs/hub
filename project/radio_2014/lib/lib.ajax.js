/**
 * lib v1.0: jQueryUtil
 * by aeddang
 */
/*
interfaces


*/

if(typeof jarvis == "undefined") var jarvis = new Object();





jarvis.XmlDocument= function(dom) 
{
	this.dom=dom;
}
jarvis.XmlDocument.prototype =
{
    getElementsByTagName: function(tag)  ///XmlDocument
	{
		if(this.dom==null){
		    return new Array();
		}
		var elements=this.dom.getElementsByTagName(tag);
		if(elements.length>0){
		    return elements;
		}else{
		    return new Array();
		}
	},
	getElementByTagName: function(tag) ///jarvis.XmlDocument
	{
		if(this.dom==null){
		    return new jarvis.XmlDocument(null);
		}
		var elements=this.dom.getElementsByTagName(tag);
		if(elements.length>0){
		    return new jarvis.XmlDocument(elements[0]);
		}else{
		    return new jarvis.XmlDocument(null);
		}
	},
	nodeValue: function() 
	{
	    if(this.dom==null){
		    return "";
		}
		if(this.dom.childNodes.length>0){
		    return String(this.dom.childNodes[0].nodeValue);
		}else{
		    return "";
		}
		
	},
	getElementById: function(idName)
	{
	    if(this.dom==null){
		    return "";
		}
		return String(this.dom.getElementById(idName));
    }

}

jarvis.Ajax= function() 
{
	this.xhr=null;
    this.sel=null;
	this.returnType=null;
	this.returnData=null;
	this.jsonpLoader=null;

}

jarvis.Ajax.prototype =
{
	getXMLHttpRequest: function() 
	{
        if (window.ActiveXObject) {
            try {
                 return new ActiveXObject("Msxml2.XMLHTTP");//IE 상위 버젼
            }catch (e1) 
			{
                 try {
                     return new ActiveXObject("Microsoft.XMLHTTP");//IE 하위 버젼
                 } catch (e2) {
                     return null;
                 }
            }
        } else if (window.XMLHttpRequest) {
            return new XMLHttpRequest();//IE 이외의 브라우저(FireFox 등)
        } else {
            return null;//통신불가
        }
    }
	,
    request: function(url,param,sel,sendType,returnType,header) 
	{
         if(url=="" || url==null){
		     jarvis.debuger.log("no URL","Ajax error");
			 return;
		 }
		
		 //jarvis.debuger.log(url,"Ajax call");
		 this.sel=sel;
		 this.returnType=returnType;
		 if ( returnType === undefined ) {
            returnType="json";
         }

		 if ( sendType === undefined ) {
            sendType="POST";
         }
		 
		 
		 var that=this;
		 if(returnType=="jsonp"){
			  sendType="GET";
		    if(param==null){
			   param=new Object();
			}
			param.callback=this.sel;
		 }

         var pstr="";
         if (param != null)
		 {
			
			for (var key in param)
			{
				pstr=pstr+"&"+key+"="+param[key];
			}
            if(pstr!=""){
			   pstr=pstr.slice(1);
			   if(sendType=="GET"){
				   if(url.indexOf("?")==-1){
					   url=url+"?"+pstr;
				   }else{
                       url=url+"&"+pstr;
				   }
				   pstr="";
			   }
			}
			
           // param=null;
		 }

		 if(this.xhr!=null){
		     //xhr
		 }
         if(returnType=="jsonp"){
            var head= document.getElementsByTagName('head')[0];
			if(this.jsonpLoader==null){
			    this.jsonpLoader=document.createElement('script');
				this.jsonpLoader.type= 'text/javascript';
			}
			head.appendChild(this.jsonpLoader);
            this.jsonpLoader.src=url;


		 }else{
			this.xhr = this.getXMLHttpRequest();
          
            this.xhr.onreadystatechange = function(){that.response();};
            this.xhr.open(sendType, url, true);//연결
            this.xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			if(header!=undefined){
		        for (var h in header)
				{
				    this.xhr.setRequestHeader(h,header[h]);
			    }
			}
            if( pstr==""){
		      this.xhr.send(null);//GET전송
		    }else{
		      this.xhr.send(pstr);//POST전송
		    }
			
		 }
    },

	createXMLFromString: function(string) 
	{
        var xmlDocument=null;
        var xmlParser;
		
		
        if(window.ActiveXObject){   //IE일 경우
			xmlDocument = new ActiveXObject('Microsoft.XMLDOM');
			xmlDocument.async = false;
			try {
				xmlDocument.loadXML(string);
			}catch (e)//parseError 
			{
                jarvis.debuger.log(e.errorCode+" : "+e.reason,"Ajax parseError ");
			}
        }else if (window.XMLHttpRequest) {   //Firefox, Netscape일 경우
			xmlParser = new DOMParser();
			try {
				xmlDocument = xmlParser.parseFromString(string, 'text/xml');
			}catch (e)//parseError 
			{
                jarvis.debuger.log(e.errorCode+" : "+e.reason,"Ajax parseError ");
			}
			
        } else {
            jarvis.debuger.log(e.errorCode+" : "+e.reason,"Ajax parseError ");
        }
        return new jarvis.XmlDocument(xmlDocument);
    },

	response: function() 
	{
        if (this.xhr.readyState == 4) {//완료
            if (this.xhr.status == 200) {//오류없이 OK
                var str = this.xhr.responseText;//서버에서 보낸 내용 받기
                var yn="Y";
				switch(this.returnType){
					 case "jsonp":///사용안함
						 try {
                            eval(str);
						 } catch (e) {
							yn="N";
							jarvis.debuger.log("return function null !!","Ajax error");
						 }
					     
						return;
				    case "json":
						 try {
						
                            this.returnData= eval(str);
						 } catch (e) {
                            yn="N";
							jarvis.debuger.log("return type error !!","Ajax error");
						 }
						 
						break;
					case "json_parse":
						 try {
						
                            this.returnData= JSON.parse(eval(str));
						 } catch (e) {
                            yn="N";
							jarvis.debuger.log("return type error !!","Ajax error");
						 }
						 
						break;
					case "xml":
						 this.returnData=this.createXMLFromString(str);
					     if(this.returnData==null){
						     yn="N";
						 }
						break;
					case "text":
						 this.returnData=str;
						break;
				    
				
				}
                eval(this.sel+"('"+yn+"')");
            } else {
                eval(this.sel+"('N','"+this.xhr.status+"')");
            }
        }

	   
    }
   
	
}






/*

*/