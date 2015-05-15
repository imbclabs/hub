/**
 * lib v1.0: UserInfo
 * by aeddang
 */
/*
interfaces


*/

if(typeof jarvis == "undefined") var jarvis = new Object();
if(typeof jarvis.miniInfo == "undefined") jarvis.miniInfo = new Object();



jarvis.miniInfo.UserInfo= function() 
{
	
	
    this.LOGOUT =0;
	this.LOGIN =1;
	this.SPON =2;

    this.resetInfo();

	//HttpUtility.UrlDecode(Request.Cookies["IMBCNAME"].Value 
    // unescape(getCookie("IMBCNAME"))  

}

jarvis.miniInfo.UserInfo.prototype =
{

	resetInfo:function()
	{
		 this.userName="";
	     this.userId="";
	     this.userData="";
	     this.userType= this.LOGOUT;
	     this.userAge=0;
	     this.isAdmin=false;
	     this.userNation="";
		 
	},
    loginCheck: function ()
	{
	   this.userName=unescape( jarvis.lib.getCookie("IMBCNAME"))  
       this.userId= jarvis.lib.getCookie("IMBCID")
	   
	   if(this.userId==""){
	       return false;
	   }else{
	       return true;
	   }
	},
	
	login : function ()
    {
       try {
              iMbc_Minilogin();
          } catch (e) {
              alert("LOGIN");                 
          }	 
	   
	  
	},
	logout : function (sel)
    {
       try {
             iMbc_logout();
          } catch (e) {
              alert("LOGOUT");                 
          }	 
	
	}
		
	
}







/*

*/