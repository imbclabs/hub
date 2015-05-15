/**
 * lib v1.0: jQueryUtil
 * by aeddang
 */
/*
interfaces


*/


var jarvisSrc="./lib/";

if(window.location.href.indexOf("http")==-1 || window.location.href.indexOf("imbctc")!=-1){
    jarvisSrc="./lib/";
}


document.write("<link rel='stylesheet' href='"+jarvisSrc+"jarvis.css'>");
document.write("<script type='text/javascript' src='"+jarvisSrc+"swfobject.js'></script>"); 
document.write("<script type='text/javascript' src='"+jarvisSrc+"lib.addclass.js'></script>"); 
document.write("<script type='text/javascript' src='"+jarvisSrc+"lib.ajax.js'></script>"); 
document.write("<script type='text/javascript' src='"+jarvisSrc+"lib.timer.js'></script>"); 
document.write("<script type='text/javascript' src='"+jarvisSrc+"lib.debuger.js'></script>"); 

document.write("<script type='text/javascript' src='"+jarvisSrc+"animation/animation.js'></script>"); 
document.write("<script type='text/javascript' src='"+jarvisSrc+"animation/animation.animationjs.js'></script>"); 
document.write("<script type='text/javascript' src='"+jarvisSrc+"animation/animation.animationcss.js'></script>");


if(typeof jarvis == "undefined") var jarvis = new Object();



//override






if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
   
}
 

//override

jarvis.Lib= function() 
{
	this.VS="1.0.0";
	this.className;
    this.mobile=false;
    
    
	this.mobilQurryClassA=new Array();
    this.mobilQurryClassA[0]="bg-black30";
	this.mobilQurryClassA[1]="body-size";
    this.mobilQurryClassA[2]="font-big";
	this.mobilQurryClassA[3]="font-middle";
	this.mobilQurryClassA[4]="font-small";
    this.mobilQurryClassA[5]="bg-black5";
	this.mobilQurryClassA[6]="dimed";
    

	this.mobilClassA=new Array();
    this.mobilClassA[0]="bg-black30-mobile";
    this.mobilClassA[1]="body-size-mobile";
	this.mobilClassA[2]="font-big-mobile";
	this.mobilClassA[3]="font-middle-mobile";
	this.mobilClassA[4]="font-small-mobile";
	this.mobilClassA[5]="bg-black5-mobile";
	this.mobilClassA[6]="dimed-mobile";

    var ievs=this.getIEDocVersion();

    if(ievs==-1 || ievs>7){
	   this.className="class";
	}else{
	   this.className="className";
	}
    
	
}

jarvis.Lib.prototype = 
{
	init: function() 
	{
		this.mobile=this.isMobile();
		
	},
	getTimeCode: function(dfCode) 
	{
         var d=dfCode+new Date().getTime();
		 return d;

	}
	,
	getRandomInt: function(value) 
	{
       var r=Math.random();
	   if(r==1){
	      return value-1;
	   }
	   
	   return Math.floor(r*value);
	   
    }
	,

	getCalculateStringWidth: function(str,amount) 
	{
       //return str;
	   if ( amount === undefined ) {
             amount=-1;
       }
	   len=0;
	   var minA = [" ",",",".","'","(",")","!",":",";","-","I"];
	   var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
	   var checkE = /[A-Z]/;
	   var checkS = /[a-z]/;
	   var s;
	   var returnStr="";
	   for(var i=0;i<str.length;++i){
	         s= str.charAt(i);
			 if(minA.indexOf(s)!=-1){
			    len+=0.4;
			 }else{
				if(check.test(s)==true){
					len+=1;
				}else if(checkE.test(s)==true){
					len+=0.8;
				}else if(checkS.test(s)==true){
					len+=0.5;
				}else{
					len+=0.4;
				}
			 }
			 if(len>amount && amount!=-1){
			
			    return i-1; //len
			 }
			 
	   }
	   if(amount!=-1){
	       len=-1;
	   }
       return len;
	   
    }
	,
    getCalculateStringByWidth: function(str,amount,added) 
	{
       //return str;
	   
	   if ( added === undefined ) {
              added="...";
       }
	   len=this.getCalculateStringWidth(str,amount);
       var returnStr="";

       if(len!=-1){
		    
			returnStr=str.slice(0,len-1)+added;
	   }else{
			returnStr=str;
	   }

	   return returnStr;
    }
	,
	getValueByUnit: function(value,unit) 
	{
       var idx=value.indexOf(unit)
	   if(idx==-1){
	      return 0
	   }else{
		  return value.slice(0,idx)
	   }
    }
	,
    getJsonPUrl : function(url)
	{
	    var scripts = document.getElementsByTagName('script');
		alert(scripts.length);
	    if(scripts.length>=1){
		    var script=scripts[scripts.length-3];
			return script.type;
		}else{
		    return "";
		}
		
	}
	,
     

    getUrlParam : function(urlStr)
	{
		
		var urlObject=new Object;
		var pA=urlStr.split("#");
        urlStr=pA[0];
		if(pA.length>1){
		    urlObject.hash=pA[1];
		}else{
		    urlObject.hash=null;
		}
		
		var uA=urlStr.split("?");
	    var paramStr;
		if(uA.length<2){
			urlObject.url=urlStr;
			return urlObject;
		}else{
			urlObject.url=uA[0];
			paramStr=uA[1];
            for(var x=2;x<uA.length;++x){
				paramStr+="?"+uA[x];
			}
			//alert(paramStr);
		}
		
		var param=new Object;
		var pA=paramStr.split("&");
		var sA;
		var value;
		for(var i=0;i<pA.length;++i){
			
			sA=pA[i].split("=");
			if(sA.length>=2){
                value=sA[1];

				for(var x=2;x<sA.length;++x){
					value+="="+sA[x];
				}
				param[sA[0]]=value;
			}
			
		}	
		
		urlObject.param=param;
		return urlObject;
	}
    , 

	getYMD : function(d,option)
    {
	   
	   if ( option === undefined ) {
              option="ymd";
       }
	   var yy=d.getFullYear();
	   if(option=="y"){
	      return String(yy);
	   }
	   var mm=Number(d.getMonth())+1;
	   if(option=="ym"){
	      return yy+jarvis.lib.intToText(mm,2);
	   }
       var dd=d.getDate();
       if(option=="ymd"){
	      return yy+jarvis.lib.intToText(mm,2)+jarvis.lib.intToText(dd,2);
	   }

	   var hh=d.getHours();
       if(option=="ymdh"){
	      return yy+jarvis.lib.intToText(mm,2)+jarvis.lib.intToText(dd,2)+jarvis.lib.intToText(hh,2);
	   }

	   var mn=d.getMinutes();
       if(option=="ymdhm"){
	      return yy+jarvis.lib.intToText(mm,2)+jarvis.lib.intToText(dd,2)+jarvis.lib.intToText(hh,2)+jarvis.lib.intToText(mn,2);
	   }

	   var ss=d.getSeconds();
       if(option=="ymdhms"){
	      return yy+jarvis.lib.intToText(mm,2)+jarvis.lib.intToText(dd,2)+jarvis.lib.intToText(hh,2)+jarvis.lib.intToText(mn,2)+jarvis.lib.intToText(ss,2);
	   }
	},
	
    getDay : function(idx)
    {
		var arr=new Array("일","월","화","수","목","금","토");
		return arr[idx];
	}
	,
	getDays : function(year,mon,day)
	{
        var someday = new Date(year,mon - 1,day);
		return someday.getDay();
	},

	getDaysInMonth  : function (year,mon)
	{
		var daysInMonth = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
		if (this.isLeapYear(year) == true)
		{
			daysInMonth[1] = 29;
		}
		return daysInMonth[mon - 1];
	},
		
	isLeapYear : function (year)
	{
		if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
		{
			return true;
		}
		else
		{
			return false;
		}
	},
	getDateByCode : function (yymmdd,key)
	{
		if ( key === undefined ) {
			key="-";
		}
		var ymdStr=String(yymmdd);
		
		if(ymdStr.length!=8){
			if(ymdStr.length>8){
			    ymdStr=ymdStr.slice(0,8);
			}else{
			    return "";
			}
			
		}
		
		var str=ymdStr.slice(0,4)+key+ymdStr.slice(4,6)+key+ymdStr.slice(6,8);
		return str;
	},

    getTimeStr : function(t,div)
    {
			
			if ( div === undefined ) {
              div=":";
            }
			t=Number(t);
			
			var m=t%3600;
			
			tim="";
			
			if(Math.floor(t/3600)>0){
				tim=jarvis.lib.intToText(Math.floor(t/3600),2)+div;
			}	
			tim=tim+jarvis.lib.intToText(Math.floor(m/60),2)+div+jarvis.lib.intToText((m%60),2);
			
			return tim;
	},
    textToNumber : function(str,div,len)
	{
		var nA=str.split(div);
		var returnStr="";
		for(var i=0;i<nA.length;++i){
		  returnStr=returnStr+ jarvis.lib.intToText(Number(nA[i]),len);
		}
        
        return returnStr;
	},
    intToText : function(n,len)
	{
			n=Number(n);
			len=Number(len);
			var str = String(n);
			var num = str.length;
			if (num >= len)
			{

			}
			else
			{
				for (var i = num; i < len; ++i)
				{
					str = "0" + str;
				}
			}
          
			return str;
	},

    
    
    
    overrideObject : function (defaultObj,updateObj)
	{
			if (updateObj == null)
			{
				return defaultObj;
			}
			for (var key in updateObj)
			{
				if (defaultObj[key] !== undefined)
				{
					defaultObj[key] = updateObj[key];
				}
			}
			return defaultObj;
	}
	,
    updateObject : function (defaultObj,updateObj)
	{
			if (updateObj == null)
			{
				return defaultObj;
			}
			for (var key in defaultObj)
			{
				if (updateObj[key] == undefined)
				{
					updateObj[key] = defaultObj[key];
				}
			}
			return updateObj;
	}
	,
   
	loadData: function(dataUrl,complete,err,param,returnType,sendType,callback) 
	{
		 
		 if ( returnType === undefined ) {
            returnType="xml";
         }
		 if ( sendType === undefined ) {
            sendType="POST";
         }
		 if ( param === undefined ) {
            param=null;
         }
		 
		 if ( callback === undefined ) {
            callback="";
         }
		 $.ajax({
	       url: dataUrl,
           crossDomain: true,
		   jsonpCallback : callback,
           cache: false, 
           type: sendType, 
           data: param, 
		   dataType: returnType,
           success: complete,
		   error: err
         });
	}
    ,
	stopDownloads : 	function () { 
           if (window.stop !== undefined) { 
                    window.stop(); 
            } 
            else if (document.execCommand !== undefined) { 
                    document.execCommand("Stop", false); 
             }    
    }
	,
	
    isMobile : function()
	{    
		var device= jarvis.lib.getDeviceInfoStr();
		
		if(device==''){
			 
		    return false;
		}else{
			if(device=='LG' &&  jarvis.lib.getOSInfoStr()=="Windows NT"){
			     return false;
			}
		    return true;
		}
		
	}
	,
    isPhone : function()
	{    
		
		var name = this.getDeviceInfoStr(); 
		if(name == "iPhone" || name == "iPad"  || name=="iPod")
        {
            if(name == "iPad"){
			   return false;
			}else{
			   return true;
			}
			
        }
       
		if(this.isMobile()==false){
		    return false;
		}else{
		    return true;
		}
		
		
	},

	isIE : function()
	{    
		var name = navigator.appName;
        if(name.indexOf("Microsoft Internet Explorer")!=-1)
		{
		    return true;
        }
        else
        {
            return false;
        }
	}
	,
    getIEVersion : function() {    
         var rv = -1; // Return value assumes failure.    
         if (navigator.appName == 'Microsoft Internet Explorer') {        
              var ua = navigator.userAgent;        
              var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");        
              if (re.exec(ua) != null)            
                  rv = parseFloat(RegExp.$1);    
             }    
         return Number(rv); 
    },

	getIEDocVersion : function() {    
         var rv = -1; // Return value assumes failure.    
         if (navigator.appName == 'Microsoft Internet Explorer') {        
              rv = document.documentMode;       
         }    
         return Number(rv); 
    },

    isSafari : function()
	{    
		var name = navigator.userAgent.toLowerCase();
		if(this.isChrome()==true){
		    return false;
		}
		if(name.indexOf("safari")!=-1){
		     return true;
		}else{
		     return false;
		}
       
	},

    isChrome : function()
	{    
		var name = this.getNavigatorInfoStr();
		
		if(name.indexOf("Chrome")!=-1){
		     return true;
		}else{
		     return false;
		}
        
	}
	,
    isFF : function()
	{    
		var name = this.getNavigatorInfoStr();
		
		if(name.indexOf("FF")!=-1){
		     return true;
		}else{
		     return false;
		}
      
	}
	,
	isIos : function()
	{    
		var name = this.getDeviceInfoStr(); 
		if(name == "iPhone" || name == "iPad"  || name=="iPod")
        {
            return true;
        }
        else
        {
            return false;
        }
	}
	,
	isAndroid : function()
	{    
		var name = this.getDeviceInfoStr(); 
        if(name == "iPhone" || name == "iPad" || name=="iPod")
        {
            return false;
        }else if(name == "'Windows CE")
        {
            return false;
        }else if(name == "")
        {
            return false;
        }
        else
        {
            return true;
        }
	}
	,
    getBrowserHeight : function()
	{
		var userAgent = navigator.userAgent.toLowerCase();
		var browser = {   
			               msie    : /msie/.test( userAgent ) && !/opera/.test( userAgent ),    
			               safari  : /webkit/.test( userAgent ),    
			               firefox : /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ),    
			               opera   : /opera/.test( userAgent )
		};  
		var totalHeight=0;  
		if( browser.msie ){ //IE     
			 var scrollHeight = document.documentElement.scrollHeight;     
			 var browserHeight = document.documentElement.clientHeight;       
			 totalHeight = scrollHeight < browserHeight ? browserHeight : scrollHeight;   
		} else if ( browser.safari ){ //Chrome || Safari     
			 totalHeight = document.body.scrollHeight;    
		} else if ( browser.firefox ){ // Firefox || NS     
			var bodyHeight = document.body.clientHeight;      
			totalHeight = window.innerHeight < bodyHeight ? bodyHeight : window.innerHeight;    } 
		else if ( browser.opera ){ // Opera     
			var bodyHeight = document.body.clientHeight;      
			totalHeight = window.innerHeight < bodyHeight ? bodyHeight : window.innerHeight;    
		} else {      
			   
		}
		return totalHeight;
    },
	getDeviceInfoStr : function()
	{    
		var mobileKeyWords = new Array('iPhone', 'iPad','iPod', 'BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson', 'BB10;');    
		var device_name = '';    
		for (var i=0;i<mobileKeyWords.length;++i){        
			if (navigator.userAgent.match(mobileKeyWords[i]) != null)
				{            
				    device_name = mobileKeyWords[i];            
					break;        
				}    
		}
		return device_name;
	}
	,
	getNavigatorInfoStr : function ()
    {
        var name = navigator.appName, ver = navigator.appVersion,
        ver_int = parseInt(navigator.appVersion), ua = navigator.userAgent, infostr;
        
		if(name == "Microsoft Internet Explorer")
        {
             if(ver.indexOf("MSIE 3.0") != -1) return "Internet Explorer 3.0x";
             if(ver_int != 4) return "Internet Explorer " + ver.substring(0, ver.indexOf(" "));
             var real_ver = parseInt(ua.substring(ua.indexOf("MSIE ") + 5));
             if(real_ver >= 7) infostr = "Windows Internet Explorer ";
             else infostr = "Microsoft Internet Explorer ";
             if(ua.indexOf("MSIE 5.5") != -1) return infostr + "5.5";
             else return infostr + real_ver + ".x";
             return "Internet Explorer";
        }
        else if(name == "Netscape")
        {
             if(parseInt(ua.substring(8, 8)) <= 4)
                return "Netscape " + ver.substring(0, ver.indexOf(" "));
             else if(ua.lastIndexOf(" ") < ua.lastIndexOf("/"))
                return ua.substring(ua.lastIndexOf(" "));
             else return "Netscape";
        }
        else return name;
    }
    ,
    getADVersion : function()
    {
		return  navigator.userAgent.match(/Android [\d+\.]{3,5}/)[0].replace('Android ','');
	},
    getADVersionNumber : function(vs)
    {
		
		var va = vs.split(".");
        var vn=0;
	    var d=1;
        for(var i=0;i<va.length;++i){
			vn+=(va[i]/d);
		    d=d*10;
	    }
		
		return vn;
	},
    getADSdkVersion : function(vs)
	{
               if(vs=="" || vs==null){
			       return -1;
			   }
			   
			 
               var vn=this.getADVersionNumber(vs);
			  
			  
			   var sdk=0;
			   if(vn>=4.3){
			        sdk=18;  //JELLY_BEAN_MR1
			   }else if(vn>=4.2){
			        sdk=17;  //JELLY_BEAN_MR1
			   }else if(vn>=4.1){
			        sdk=16;   // JELLY_BEAN 
			   }else if(vn>=4.03){
			        sdk=15;  //ICE_CREAM_SANDWICH MR1
			   }else if(vn>=4.0){
			        sdk=14;   //ICE_CREAM_SANDWICH
			   }else if(vn>=3.2){
			        sdk=13;  //HONEYCOMB_MR2 
			   }else if(vn>=3.1){
			        sdk=12;
			   }else if(vn>=3.0){
			        sdk=11;
			   }else if(vn>=2.33){
			        sdk=10;
			   }else if(vn>=2.3){
			        sdk=9;
			   }else if(vn>=2.2){
			        sdk=8;
			   }else if(vn>=2.1){
			        sdk=7;
			   }else if(vn>=2.01){
			        sdk=6;
			   }else if(vn>=2.0){
			        sdk=5;
			   }else if(vn>=1.6){
			        sdk=4;
			   }else if(vn>=1.5){
			        sdk=3;
			   }else if(vn>=1.1){
			        sdk=2;
			   }else if(vn>=1.0){
			        sdk=1;
			   }else{
			        sdk=0;
			   }
               return sdk;
                       
             
    },

    getOSInfoStr : function()
    {
       var ua = navigator.userAgent;
   
       if(ua.indexOf("NT 6.0") != -1) return "Windows Vista/Server 2008";
       else if(ua.indexOf("NT 5.2") != -1) return "Windows Server 2003";
       else if(ua.indexOf("NT 5.1") != -1) return "Windows XP";
       else if(ua.indexOf("NT 5.0") != -1) return "Windows 2000";
       else if(ua.indexOf("NT") != -1) return "Windows NT";
       else if(ua.indexOf("9x 4.90") != -1) return "Windows Me";
       else if(ua.indexOf("98") != -1) return "Windows 98";
       else if(ua.indexOf("95") != -1) return "Windows 95";
       else if(ua.indexOf("Win16") != -1) return "Windows 3.x";
       else if(ua.indexOf("Windows") != -1) return "Windows";
       else if(ua.indexOf("Linux") != -1) return "Linux";
       else if(ua.indexOf("Macintosh") != -1) return "Macintosh";
	   else if(ua.indexOf("iPad") != -1) return "iPad";
	   else if(ua.indexOf("iPhone") != -1) return "iPhone";
	   else if(ua.indexOf("iPod") != -1) return "iPod";
       else return ua;
    },


    addStyle: function(element,prop,value){
        if(element.style[prop]!= undefined || element.style[prop]!= null){
		     element.style[prop]= value;
		}else{
		     this.addAttribute(element,prop+":"+value+";","style");
		}
	},

    addAttribute: function(element,value,prop){
        if(element==null){
          jarvis.debuger.log("lib.addAttribute : "+element+" value : "+value+" prop : "+prop,"e");
	      return;
	    }
        if (prop=== undefined) { 
			prop=this.className;
			
		}
		


        try {
			var getProp=new Array();
			var att=element.getAttribute(prop);
			
			if(att.indexOf(" ")!=-1){
			    getProp = att.split(' ');
			}else{
			    getProp.push(att);
			}

	    }catch (e) {
            getProp=new Array();                 
        }
        
        if(prop==this.className && this.mobile==true)
		{
			
			var valueA;
			if(value.indexOf(" ")!=-1)
			{
				valueA = value.split(' ');
			}else{
				valueA=new Array();         
			    valueA.push(value);
			}
			var v;
			var idx;
			var newValue="";
			for(var i = 0; i < valueA.length; i++) 
			{
				v=valueA[i];
				idx=this.mobilQurryClassA.indexOf(v);
				if(idx!=-1){
					v=this.mobilClassA[idx];
				}
				newValue=newValue+" "+v;
			}
			value=newValue;
		
		}
        
		

        if(prop=="style"){
			
			try {
				var ap=value.split(':')[0];
                var av=value.split(':')[1];
				var p;
				for(var i = 0; i < getProp.length; i++) 
				{
					p=getProp[i].split(':')[0];
					if(ap==p){
					   getProp[i]=value;
					   break;
					}
				}
			}
			catch(e) 
			{
            }
		}

		var setProp = '';
		for(var i = 0; i < getProp.length; i++) {
			setProp += getProp[i] + ' ';
		}
		
        setProp=setProp+value;
        
		try {
			//jarvis.debuger.log("lib.addAttribute setAttribute prop: "+element+" value : "+value+" prop : "+prop,"e");
			element.setAttribute(prop, setProp); 
        }catch(e) 
		{
			jarvis.debuger.log("lib.addAttribute setAttribute err: "+element+" value : "+value+" prop : "+prop,"e");
        }
		
    },
    removeAttribute: function(element,value,prop){
        if(element==null){
			jarvis.debuger.log("lib.removeAttribute : "+element+" value : "+value+" prop : "+prop,"e");
			return;
	    }
        if (prop=== undefined) { 
			prop=this.className;
			
		}
        try {
			var getProp=new Array();
			var att=element.getAttribute(prop);
			if(att.indexOf(" ")!=-1){
			    getProp = att.split(' ');
			}else{
			    getProp.push(att);
			}
	    }catch (e) {
            getProp=new Array();                 
        }
		
		if(prop==this.className && this.mobile==true)
		{
			var v;
			var idx;			
			for(var i = 0; i < getProp.length; i++) 
			{
				v=getProp[i];
				idx=this.mobilClassA.indexOf(v);
				if(idx!=-1){
					getProp[i]=this.mobilQurryClassA[idx];
				}
				
			}
		}

	    var setProp = '';
		for(var i = 0; i < getProp.length; i++) {
			if(value!=getProp[i]){
			   setProp += getProp[i] + ' ';
			}
		}
		//jarvis.debuger.log("lib.addAttribute removeAttribute prop: "+element+" value : "+value+" prop : "+prop,"e");
		element.setAttribute(prop, setProp);
    },

    addEventListener: function(element,event,fn){
       var wheel=null;
	   
	   if(element==null){
		   jarvis.debuger.log("lib.addEventListener : "+element+" event : "+event+" fn : "+fn,"e");
		   return wheel;
	   }
	   
	   if(event=="mousewheel"){
	      try {
              wheel=new jarvis.MouseWheel(element,fn);
          } catch (e) {
                             
          }	 
	   
	   }else{
	      if (document.createEventObject){
             element.attachEvent("on"+event,fn);
          }
          else{
             if(event=="resize"){
		         element=window;
			 }
             element.addEventListener(event,fn);
          }
	   }
	   return wheel;
	},
	removeEventListener: function(element,event,fn){
       if(element==null){
		   jarvis.debuger.log("lib.removeEventListener : "+element+" event : "+event+" fn : "+fn,"e");
	      return;
	   }
	   
	   if(event=="mousewheel"){
	       
	   
	   }else{
	      if (document.createEventObject){
             element.detachEvent("on"+event,fn);
          }
          else{
			 if(event=="resize"){
		         element=window;
			 }
             element.removeEventListener(event,fn);
          }
	   }
	   
	   
	   
    },
    getEventTarget: function(e){
       var event = e ? e : window.event;
	   return event.target ? event.target : event.srcElement;

    },

    dispatchEvent : function(element,event){
       if (document.createEventObject){
          var evt = document.createEventObject();
          return element.fireEvent("on"+event,evt);
       }
       else{
          var evt = document.createEvent("HTMLEvents");
          evt.initEvent(event, true, true ); 
          return !element.dispatchEvent(evt);
       }
    },
    
	setCenterPosition : function(element,parentBounce,isVertical){
		if (isVertical=== undefined) { 
			isVertical=false;
			
		}
		
		var elementBounce=jarvis.lib.getAbsoluteBounce(element);
		if(isVertical==true){
			element.style.top=Math.floor((parentBounce.height-elementBounce.height)/2)+"px";
		}else{
			element.style.left=Math.floor((parentBounce.width-elementBounce.width)/2)+"px";
		}
		
    },

    getCookie : function(strName){
        
	    var strArg = new String(strName + "=");	
		var nArgLen, nCookieLen, nEnd;
		var i = 0, j;
	
		nArgLen    = strArg.length;
		nCookieLen = document.cookie.length;
	
		if(nCookieLen > 0) {
			while(i < nCookieLen) {
				j = i + nArgLen;
				if(document.cookie.substring(i, j) == strArg) {
					nEnd = document.cookie.indexOf (";", j);
					if(nEnd == -1) nEnd = document.cookie.length;
					return unescape(document.cookie.substring(j, nEnd));
				}
				i = document.cookie.indexOf(" ", i) + 1;
				if (i == 0) break;
			}
		}
		return("");
   },
  
   setCookie : function(name, value, option)  
   {
      
	   var expires = null;
       var path = null;
       var domain = null;
       var secure= false;
	   if (option!== undefined) { 
           
			var expires = (option.expires!== undefined)? option.expires : null;
            if (String(typeof expires) == 'number') {
				var days =  new Date();
				days.setDate(days.getDate() + expires);
				expires=days;
				
			}
            var path = (option.path!== undefined)? option.path : null;
            var domain = (option.domain!== undefined)? option.domain : null;
            var secure = (option.secure!== undefined)? option.secure : false;
       }
	  
       document.cookie = name + "=" + escape (String(value)) +
                         ((expires == null) ? "" : 
                         ("; expires=" + expires.toGMTString())) +
                         ((path == null) ? "" : ("; path=" + path)) +
                         ((domain == null) ? "" : ("; domain=" + domain)) +
                         ((secure == true) ? "; secure" : "");
						 
   },

   sleep :function(ms){
       var now=new Date();
	   var exitTime=now.getTime()+ms;
	   while(true){
	        now=new Date();
			if(now.getTime()>exitTime){
			    return;
			}
	   
	   }
     
   },
   copyClipBoard : function (str,msg) {

       if (msg=== undefined)
	   {
	       msg="Ctrl+C를 눌러 클립보드로 복사하세요";
	   }
	   var ie=this.isIE();
	   if (ie==true) {
			window.clipboardData.setData("Text", str);
			alert(msg);
	   } else {
			var temp = prompt(msg, str);
       }
   },
//////////////////////////////////////////////////////////////////////////// VIEW UTIL
   
   getEqualRatioFillRect : function(w,h,tw,th)
    {
	    var wid=w*th/h;
		var hei=th;
	    var tx=0;
		var ty=0;
		if(wid<tw){
		   
           wid=tw;
           hei=tw*(h/w);
		   tx=0;
           ty=(th-hei)/2;
		}else{
		   hei=th;
		   tx=(tw-wid)/2;
		   ty=0;
		}
		return new Rectangle(tx,ty,wid,hei);
			return rectangle;
		
	}
	,
   
   getEqualRatioRect : function(w,h,tw,th,smallResize)
    {
	        if ( smallResize === undefined ) {
               smallResize=false;
            }
			
			
			w=Number(w);
			h=Number(h);
			tw=Number(tw);
			th=Number(th);
			
			var sc;
			if (w > tw || h > th)
			{
				if (w > tw)
				{
					sc = tw / w;
					w = tw;
					h = h * sc;
				}
				if (h > th)
				{
					sc = th / h;
					h = th;
					w = w * sc;
				}
			}else{
				if(smallResize==true){
					if (w < tw)
					{
						sc = tw / w;
						w = tw;
						h = h * sc;
					}
					if (h > th)
					{
						sc = th / h;
						h = th;
						w = w * sc;
					}
				}
			}
            
			var rectangle=new jarvis.Rectangle(Math.round((tw - w) / 2),Math.round((th - h) / 2),w,h);
			return rectangle;
		
	}
	,
   
	
	getDocumentScrollBounce : function()
	{
        var bounce=new jarvis.Rectangle(f_scrollLeft(),f_scrollTop(),f_clientWidth(),f_clientHeight());
        
        
		function f_clientWidth() {
				return f_filterResults (
					window.innerWidth ? window.innerWidth : 0,
					document.documentElement ? document.documentElement.clientWidth : 0,
					document.body ? document.body.clientWidth : 0
		        );
		}
		function f_clientHeight() {
				return f_filterResults (
					window.innerHeight ? window.innerHeight : 0,
					document.documentElement ? document.documentElement.clientHeight : 0,
					document.body ? document.body.clientHeight : 0
				);
		}
		function f_scrollLeft() {
				return f_filterResults (
					window.pageXOffset ? window.pageXOffset : 0,
					document.documentElement ? document.documentElement.scrollLeft : 0,
					document.body ? document.body.scrollLeft : 0
				);
		}
		function f_scrollTop() {
				return f_filterResults (
					window.pageYOffset ? window.pageYOffset : 0,
					document.documentElement ? document.documentElement.scrollTop : 0,
					document.body ? document.body.scrollTop : 0
				);
		}
		function f_filterResults(n_win, n_docel, n_body) {
				var n_result = n_win ? n_win : 0;
				if (n_docel && (!n_result || (n_result > n_docel)))
				n_result = n_docel;
				return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
		}

        var name = this.getDeviceInfoStr(); 
		if(name == "iPhone")
        {
            bounce.height=bounce.height+70;
        }
        return bounce;


	},
		
	getAbsoluteBounce : function(ele)
	{
        var bounce;
        var x;
		var y;
        var w;
		var h;
        try{

        if(ele.getBoundingClientRect){
           bounce=ele.getBoundingClientRect();	
		   x=bounce.left+(document.documentElement.scrollLeft || document.body.scrollLeft)
		   y=bounce.top+(document.documentElement.scrollTop || document.body.scrollTop)
		   w=bounce.right-bounce.left;
		   h=bounce.bottom-bounce.top;
		}else{
		   
		   bounce=document.getBoxObjectFor(ele);
           x=bounce.x;
		   y=bounce.y;
		   w=bounce.width;
		   h=bounce.height;
          
		}
		}catch(e)
		{
		    return new jarvis.Rectangle();
		
		}
		return new jarvis.Rectangle(x,y,w,h);
        

        

	},
	getRelativeBounce : function(ele)
	{
        if(ele.parentNode==null){
			jarvis.debuger.log("lib.getRelativeBounce : "+ele+" parent none");
			return new jarvis.Rectangle(0,0,0,0);
		}
		var bounceP=this.getAbsoluteBounce(ele.parentNode);
		var bounce=this.getAbsoluteBounce(ele);
       
		return new jarvis.Rectangle(bounce.x-bounceP.x,bounce.y-bounceP.y,bounce.width,bounce.height);   

	},
	getNumber : function(value,unit){
        if ( unit === undefined ) {
            unit="px";
        }
		if ( unit == "" ) {
            return Number(String(value));
        }	
		
		return Number(String(value).replace(unit,""));
	},
	
	getPx : function(value){
        if(String(value)=="NaN"){
		   value=0;
		}
		return value+"px";
	},
    hitTestPoint : function(point,rect)
    {
        
		if(point.x>=rect.x && point.x<=rect.x+rect.width){
		     if(point.y>=rect.y && point.y<=rect.y+rect.height){
		         return true;
		     }else{
			     return false;
			 }
		}else{
		   return false;
		}

	},
	hitTestRect : function(object,rect)
    {
       
		 if( jarvis.lib.hitTestPoint(new jarvis.Point(object.x,object.y),rect)){return true;};
	     if( jarvis.lib.hitTestPoint(new jarvis.Point(object.x+object.width,object.y),rect)){return true;};
         if( jarvis.lib.hitTestPoint(new jarvis.Point(object.x+object.width+object.y+object.height),rect)){return true;};
	     if( jarvis.lib.hitTestPoint(new jarvis.Point(object.x,object.y+object.height),rect)){return true;};
		 
		 return false;
	},
	hitTestObject : function(object,rect)
    {
         var objectBounce=object.getBoundingClientRect();
		 var objectRect=new jarvis.Rectangle(objectBounce.left,objectBounce.top,objectBounce.width,objectBounce.height);
		 return jarvis.lib.hitTestRect(objectRect,rect);
	
	},
    excuteDelegate: function(delegate,commend,args)
    {	
        if(delegate==null){
		   return false;
		}
		if(delegate[commend]===undefined){
		   return false;
		}
		if ( args === undefined ) {
           delegate[commend].apply(delegate);
        }else{
		   delegate[commend].apply(delegate,args);
		}
        
		return true;
	},
	removeChild: function(ele)
    {
		if(ele.parentNode!=null){
		   ele.parentNode.removeChild(ele);
		}
	},
	removeAllChild: function(parent)
    {
		var children=parent.childNodes;
		
		for(var i=0;i<children.length;++i){
		    parent.removeChild(children[i]);
		}
		
	},


	executeApp: function(command,installUrl,div,msg) {
        
		this.installApp(installUrl,msg);
       
        if (div==undefined || div==null) 
		{
             window.location.href = command;    
        } else 
		{
                
			    div.innerHTML = '<iframe src="' + command + '" width="0" height="0" frameborder="0"></iframe>';
                setTimeout(function(){
                        var b = div;
                        var c = b.getElementsByTagName('iframe');
                        if (c.length > 0) { b.removeChild(c[0]); }
                }, 1000);
        }
	},
    installApp : function(installUrl,msg) 
	{
        if(msg===undefined){
		   msg="";
		}
		//alert(installUrl);
		
		var b = new Date();
        setTimeout(function(){
                if (new Date() - b < 1500) {
					     if(msg==""){
						     window.location.href = installUrl;
						 }else{
							 if(jarvis.lib.isIos()==true){
								 window.location.href = installUrl;
							 }else{
								 if (confirm(msg)) { 
									 window.location.href = installUrl;
								 }
							 }
						 }
						
                         
                }
        }, 500);
	}

 
}


jarvis.Rectangle= function(_x,_y,_width,_height) 
{
	this.x=Number(_x);
    this.y=Number(_y);
	this.width=Number(_width);
	this.height=Number(_height);
	this.toString ="x : "+this.x+" y : "+this.y+" w : "+this.width+" h : "+this.height;
}
jarvis.Point= function(_x,_y) 
{
	this.x=Number(_x);
    this.y=Number(_y);
    
    this.toString="x : "+this.x+" y : "+this.y;

}



var Rectangle = jarvis.Rectangle;
var Point = jarvis.Point;

jarvis.lib = new jarvis.Lib();
jarvis.lib.init();


/*

*/