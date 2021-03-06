/*
 ,-.                         
(   `     o            o     
 `-.  ;-. . ,-. ,-.    , ,-. 
.   ) | | | |   |-'    | `-. 
 `-'  |-' ' `-' `-' o  | `-' 
      '               -'     
	  Created By: Ryan Spice
	  

*/



var Scripts = window.scripts = [],_Main = Object.create(null),Type=Object.create(null,{prototype:{value:{value:null,writable:{value:!1},configurable:{value:!1},enumerable:{value:!1},set:function(a){this.value=a;return this}}}}),Secure=Object.create(Type.prototype),Private=Object.create(Type.prototype,{enumerable:{value:!0}}),Protected=Object.create(Type.prototype,{writable:{value:!0}}),Public=Object.create(Type.prototype,{writable:{value:!0},configurable:{value:!0},enumerable:{value:!0}}),DefaultFunction=function(){return !0;},DefaultFalse=function(){return !1;},DefaultObject = Object.create(null),App = {
	prototype:{
		user:{
			name		:"",
			id			:"",
			locale		:"",
			gender		:"",
			updated_time:"",
			timezone	:"",
			quotes		:"",
			info:Object.create({
				response:{},
				facebook:function(response){
					this.response = response;
					App.user.name = this.response.name;
					App.user.id = this.response.id;
					App.user.locale = this.response.locale;
					App.user.gender = this.response.gender;
					App.user.updated_time = this.response.updated_time;
					App.user.timezone = this.response.timezone;
					App.user.quotes = this.response.quotes;
				},
				connect:function con(appid){
					window.fbAsyncInit = function() {
					FB.init({
					appId      : appid,
					status     : true, // check login status
					cookie     : true, // enable cookies to allow the server to access the session
					xfbml      : true  // parse XFBML
					});
					FB.login(function(){
						FB.api('/me/feed', 'post', {message: 'Hello, world!'});}, {scope: 'publish_actions'});
					};

				  // Load the SDK asynchronously
				  (function(d){
				   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
				   if (d.getElementById(id)) {return;}
				   js = d.createElement('script'); js.id = id; js.async = true;
				   js.src = "//connect.facebook.net/en_US/all.js";
				   ref.parentNode.insertBefore(js, ref);
				  }(document));

				  // Here we run a very simple Flappy of the Graph API after login is successful. 
				  // This testAPI() function is only called in those cases. 
				  function testAPI() {
					console.log('Welcome!  Fetching your information.... ');
					
					FB.api('/me', function(response) {
						App.user.info.facebook(response);
					console.log(App.user);
					  console.log('Good to see you, ' + response.name + '.');
					});
				  }
				}
			})
		},
		ext:{
			prototype:{
				fps:0,
				ping:0,
				offline:false,
				delta_speed:0,
				connectionAttempts:0,
				connectDate:new Date(),
				connectDatere:new Date(),
				
				top:function(){
					App.client.update.fullscale = !App.client.update.fullscale;
				},
				debug:{
					prototype:{
						delay:0,
						text:String,
						strength:"Normal",
						log:function(txt,n)
							{
							this.text = txt;
							this.delay.value--;
							if ((this.delay.value==0)&&(typeof n!=="undefined"))
								this.delay.value=n;
							if ((this.delay.value==0)||(this.delay.value==1)||(typeof n ==="undefined"))
								if (this.app.debug)
									if (App.debug==true)
									//console.log("SJS:"+txt);
							return true;
						},
						toggle:function(txt) {
							if ((txt=="lite")||(txt=="Lite")||(txt==1))
								this.strength = "Lite";
							if ((txt=="off")||(txt=="none")||(txt==0))
								this.strength = "none";
							if ((txt=="normal")||(txt=="Normal")||(txt==2))
								this.strength = "Normal";
							return this.app.debug = !this.app.debug;
						}
					},
					constructor:function(a){return {
						app:{value:a},
						init:{value:function(){
									this.log('Debug:     '+this.strength);
									Debug = this;
								}
							}
						}
					}
				},
				useragent:{
					prototype:{
						agent:String,
						mouse:false,
						touch:false,
						keyboard:false,
						windows:false,
						chrome:false,
						safari:false,
						Chrome: function(){
							return this.chrome = navigator.userAgent.match(/Chrome/i) ? true : false;
						},
						Safari: function(){
							return this.safari = navigator.userAgent.match(/Safari/i) ? true : false;
						},
						Android: function(){
							return navigator.userAgent.match(/Android/i) ? true : false;
						},
						BlackBerry:function(){
							return navigator.userAgent.match(/BlackBerry/i) ? true : false;
						},
						iOS:function(){
							return  navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
						},
						iemobile:false,
						IEMobile: function(){
							return  navigator.userAgent.match(/IEMobile/i) ? true : false;
						},
						ie:false,
						IE: function(){
							return  navigator.userAgent.match(/Trident/i) ? true : false;
						},
						any: function(){
							return (this.Android() || this.BlackBerry() || this.iOS());
						}
					},
					constructor:function(){return {
						init:{value:function(){
								this.agent = navigator.userAgent;
								this.chrome = this.Chrome();
								this.safari = this.Safari();
								this.mouse = this.any();
								
								this.iemobile = this.IEMobile();
								this.windows = this.IEMobile() || this.IE() || !this.any();
								
								this.ie = this.trident = this.IE();
								this.touch = this.any();
								this.mouse = !this.any() || this.BlackBerry();
								this.keyboard = this.windows ||  this.BlackBerry() || !this.any();
								Debug.log('UserAgent: '+this.agent);
								}
							}
						}
					}
				},
				metatag:{
					prototype:{
						count:0,
						metaLink: function(href,rel,type) {
							var link = document.createElement('link');
							link.href = href;
							link.rel = rel;		
							link.type = type;	
							return link;
						},
						metaTag: function(name,content) {
							var meta = document.createElement('meta');
							meta.content = content;
							meta.name = name;
							return meta;
						},
						metaStyle: function() {
							var style = document.createElement('style');
							style.innerHTML = style.innerText = '#Client, #Buffer, img[srcApp=".gif"],img[srcApp=".jpg"], img[srcApp=".png"] {image-rendering: -moz-crisp-edges;/* Firefox */image-rendering:-o-crisp-edges;/* Opera */image-rendering: crisp-edges;image-rendering: -webkit-optimize-contrast;/* Webkit (non-standard naming) */-ms-0erpolation-mode: nearest-neighbor;/*IE(non-standard property) */}';
							return style;
						},
						metaAppend: function(meta) {
							document.getElementsByTagName('head')[0].appendChild(meta);
							this.count++;
						},
						metatags: function(name) {
							document.title = this.name = name;
							document.body.style = "overflow: hidden;padding:0px;margin:0px auto;-ms-touch-action:none;";
							document.body.setAttribute("style","-ms-touch-action: none;background:transparent;");
							document.body.style.overflow = "hidden";
							document.body.style.padding = "0px";
							document.body.style.margin = "0px auto";
							this.metaAppend(this.metaLink("https://ryanspice.com/flappyfish/images/FlappyFish0.png","shortcut icon","image/png"));
							this.metaAppend(this.metaTag("msapplication-tap-highlight","no"));
							this.metaAppend(this.metaTag("apple-mobile-web-app-capable","yes"));
							this.metaAppend(this.metaTag("apple-mobile-web-app-status-bar-style","black"));
							this.metaAppend(this.metaTag("format-detection","telephone=no"));
							this.metaAppend(this.metaTag("cursor-event-mode","native"));
							this.metaAppend(this.metaTag("touch-event-mode","native"));
							this.metaAppend(this.metaTag("HandheldFriendly","True"));
							this.metaAppend(this.metaTag("viewport","width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"));
							//this.metaAppend(this.metaTag("viewport","target-densitydpi=device-dpi"));
							this.metaAppend(this.metaStyle());
						}
					},
					constructor:function(){return {
						init:{value:function(name){
								this.metatags(name);
								Debug.log('Debug:     MetaCount/'+this.count);
							return true;
							}
						}
					}
				}
				},
				colour:{
					prototype:{
						Teal		:["#008299",	"#00A0B1"],
						Blue		:["#2672EC",	"#2E8DEF"],
						Purple		:["#8C0095",	"#A700AE"],
						DarkPurple	:["#5133AB",	"#643EBF"],
						Red			:["#AC193D",	"#BF1E4B"],
						Orange		:["#D24726",	"#DC572E"],
						Green		:["#008A00",	"#00A600"],
						SkyBlue		:["#094AB2",	"#0A5BC4"],
						White		:["#AFAFAF",	"#F9FAF2"],
						Black		:["#0F0F0F",	"#A1A1A1"],
						Current		:["#0F0F0F",	"#AFAFAF"],
						shade		:0,
						getCurrent	:function(){return this.Current},
						get			:function(){var g = (this.shade)?this.Current[0]:this.Current[1];return g;},
						getAlt		:function(){var g = (this.shade)?this.Current[1]:this.Current[0];return g;},
						set			:function(set){console.log(set[0]);this.Current = set; var g = (this.shade)?this.Current[0]:this.Current[1];return this.Current;},
						setAlt		:function(set){this.shade = set;}
					},
					constructor:function(){return {
						init:{value:function(){
									this.set(this.Black);
									Debug.log("Colour:    "+this.Current[0]+"/"+this.Current[1]);
								}
							}
						}
					}
				},
				cursor:{
					prototype:{
						auto		: "auto",
						inherit		: "inherit",
						crosshair	: "crosshair",
						def			: "default",
						help		: "help",
						move		: "move",
						pointer		: "pointer", 
						progress	: "progress",
						text		: "text",
						wait		: "wait",
						eresize		: "e-resize",
						neresize	: "ne-resize",
						nwresize	: "nw-resize",
						nresize		: "n-resize",
						seresize	: "se-resize",
						swresize	: "sw-resize",
						sresize		: "s-resize",
						wresize		: "w-resize",
						current 	: "auto",
						last 		: "auto",
						delay 		: 2,
						changed		:false,
						count		:0,
						lock		:0,
						set:function(cursor,lock){
							//if (this.delay>0){
							//	this.delay--;this.count=0;this.changed=false;return;}
							//	else
							//	delay =1;
							if (this.lock >0)
								this.lock--;
							if (lock)
								this.lock += 1;
							//if (this.changed==true)
							//	return;
							if	((this.last==cursor)||(this.lock))
								return;
							//console.log(this.app.client._Visuals);
							this.last = this.current;
							this.current=this.app.client.visuals.canvas.style.cursor=this.app.client.visuals.buffer.style.cursor=cursor;
							document.body.style.cursor=cursor;
							this.changed = true;
							this.count++;
							Debug.log("Cursor:    "+this.current+" - "+this.last);
						}
					},
					constructor:function(a){return{
						app:{value:a},
						init:{value:function(){
									this.set(this.wait);
									setTimeout(function(){App.ext.cursor.set(App.ext.cursor.def)},2000);
								}
							}
						}
					}
				},
				input:{
					prototype:{
						init:false,
						parent:Private,
						x: 0,
						y: 0,
						keyup:false,keydown:false,
						start: 		{x:0,y:0},				
						control:false,
						window:{
							play:15,
							x:false,
							y:false,
							inside:false
						},
						listener:{
							down:function(mouse,input) {
								if (input.delay>0)
									return;
								input.start.x = mouse.x || input.x;
								input.start.y = mouse.y || input.y;
								input.pressed = true;
								input.press = true;
								//if ((input.pressed)||(input.delay))
								//	return;
								//input.pressed = true;
								//input.press = true;
								//
								//
								//
								//
								//
								//
								input.dist.x = 0;
								input.dist.y = 0;
							},
							move:function(move,touch,input){
								if (input.delay>0)
									return;
								//if ((input.delay))
								//	return;
								input.x = move.x || input.x;
								input.y = move.y || input.y;
								input.dist.x = (input.x-input.start.x)/App.client.scale;
								input.dist.y = (input.y-input.start.y)/App.client.scale;
								//((!touch) ? input.mouse_distance : input.touch_distance)(touch);
							},
							up:function(mouse,input) {
								input.end.x = mouse.x || input.x;
								input.end.y = mouse.y || input.y;
								input.pressed = false;
								input.released = true;
								
								input.dist.x = input.end.x-input.start.x;
								input.dist.y = input.end.y-input.start.y;
							},
							touch:function(touch,input){
								if (input.delay>0)
									return;
								input.x = touch.pageX;
								input.y = touch.pageY;
								input.pos.x = touch.pageX;
								input.pos.y = touch.pageY;
								input.start.x = touch.pageX;
								input.start.y = touch.pageY;
								input.released = false;
								input.duration = 0;
								//input.dist.x = 0;
								//input.dist.y = 0;
							},
							keydown:function(a,input) {
								if (input.delay>0)
									return;
								input.key = true;
								input.kpressed = true;
								input.keyPower = -a;
								input.keyPower 	= input.keyPower;
								Debug.log(input.key + " " + input.keyPower);
							},
							keyup:function(input) {
								input.key = false;
								input.keyPower = 0;
								input.kreleased = true;
								input.kpressed = false;
							}
							,
							ups:function(a,input){
								a==1?input.keyup=true:input.keyup=false;
								
							},
							downs:function(a,input){
								if (input.delay>0)
									return;
								a==1?input.keydown=true:input.keydown=false;
							}
						},
						pressed: 	false,
						released: false,
						press: 		false,
						delta: 0,
						wheelDelta: 0,
						duration: 0,
						dist: {x:0,y:0},
						pos: {x:0,y:0},
						last: {x:0,y:0},
						end: {x:0,y:0},
						delay:0,
						key:false,
						keyPower:0,
						menu:false,
						drag:false,
						confine:false,
						position:function(canvas,evt) {
							if ((!canvas)||(!evt))
									return false;
							return {x: evt.clientX,y: evt.clientY};
						},
						mouse:function() {
							if (!App.ext.input.pressed)
								App.ext.input.dist =  App.client.Math.Vector.Difference(App.ext.input,App.ext.input.start);
						},
						mouse_distance:function() {
							if (!App.ext.input.pressed)
								App.ext.input.dist =  App.client.Math.Vector.Difference(App.ext.input.start,App.ext.input.end);
						},
						touch_distance:function(touch) {
							if (!touch)
								return;
							App.ext.input.x = touch.pageX;
							App.ext.input.y = touch.pageY;
							//if (!App.ext.input.input.pressed)
								App.ext.input.dist =  App.client.Math.Vector.Difference(App.ext.input.start,App.ext.input.end);
						},
						get_angle: function(){
							return 57.2957795 * Math.atan2(this.end.y-this.start.y,this.end.x-this.start.x);
						},
						get_delta: function(){
							return this.dist.x*this.dist.x+this.dist.y*this.dist.y;
						},
						set: function(x,y){
							this.x=x;this.y=y;
						},
						update:function UPDATE() {
							this.last.x = this.x;
							this.last.y = this.y;
							this.press = false;
							this.window.inside = 0;
							this.wheelDelta = 0;
							this.pressed?this.duration++:this.duration=0;
							
							this.confine?(
								((this.y<this.app.client.visuals.fixY(0))?
									(this.window.y=0,this.window.inside -= 1):
										((this.y>this.app.client.visuals.fixY(this.app.client.setHeight))?
											(this.window.y=this.app.client.visuals.fixW(this.app.client.setHeight),this.window.inside += 1):
											(this.window.y=-this.app.client.visuals.fixY(0)+this.y)
										),
										((this.x<this.app.client.visuals.fixX(0))?
											(this.window.x = 0,this.window.inside -=1):
											((this.x>this.app.client.visuals.fixX(this.app.client.setWidth))?
												(this.window.x = this.app.client.visuals.fixW(this.app.client.setWidth),this.window.inside += 1):
												(this.window.x = -this.app.client.visuals.fixX(0)+this.x)
											)
										)
									)
								):((this.y<this.app.client.visuals.fixY(0))?
										(this.window.y=-this.app.client.visuals.fixY(0)+this.y):
										((this.y>this.app.client.visuals.fixY(this.app.client.setHeight))?
											(this.window.y=-this.app.client.visuals.fixY(0)+this.y):
											(this.window.y=-this.app.client.visuals.fixY(0)+this.y)
									),
									((this.x<this.app.client.visuals.fixX(0))?
										(this.window.x=-this.app.client.visuals.fixX(0)+this.x):
										((this.x>this.app.client.visuals.fixX(this.app.client.setWidth))?
											(this.window.x=-this.app.client.visuals.fixX(0)+this.x):
											(this.window.x=-this.app.client.visuals.fixX(0)+this.x)
										)
									));
							this.released?(this.released=false,this.dist.x=0,this.dist.y=0):null;
							//this.duration>0?(this.released=false);
							//(this.released==true)?(this.released=false,this.duration=0,this.dist.x=0,this.dist.y=0):null;
							(this.delay>0)?this.delay-=0.1:null;
						return true;
						},
					},
					constructor:function(a){return{
						app:{value:a},
						init:{value:function Initalize(a){
							if (!this.menu) {
									document.oncontextmenu = function(evt) {evt.preventDefault(); return false; };
									window.oncontextmenu = function(evt) {evt.preventDefault(); return false; };
								}
							if (!this.drag) {
									document.ondragstart   = function(evt) {evt.preventDefault(); return false; };
									window.ondragstart   = function(evt) {evt.preventDefault(); return false; };
								}
								
							if (App.ext.useragent.keyboard) {
									window.addEventListener('keydown', 	function(event) {
									
									if (event.ctrlKey)
										App.ext.input.control = true;
									
										switch(event.keyCode) 
										{
										case 37:App.ext.input.listener.keydown(-1,App.ext.input);break;
										case 65:App.ext.input.listener.keydown(-1,App.ext.input);break;
										case 39:App.ext.input.listener.keydown(1,App.ext.input);break;
										case 68:App.ext.input.listener.keydown(1,App.ext.input);break;
										case 40:App.ext.input.listener.downs(1,App.ext.input);break;
										case 83:App.ext.input.listener.downs(1,App.ext.input);break;
										case 38:App.ext.input.listener.ups(1,App.ext.input);break;
										case 87:App.ext.input.listener.ups(1,App.ext.input);break;
										}
									},true);
									window.addEventListener('keyup', 	function(event) {
									if (event.ctrlKey)
										App.ext.input.control = false;
										switch(event.keyCode) 
										{
										case 37:App.ext.input.listener.keyup(App.ext.input);break;
										case 65:App.ext.input.listener.keyup(App.ext.input);break;
										case 39:App.ext.input.listener.keyup(App.ext.input);break;
										case 68:App.ext.input.listener.keyup(App.ext.input);break;
										case 40:App.ext.input.listener.downs(2,App.ext.input);break;
										case 83:App.ext.input.listener.downs(2,App.ext.input);break;
										case 38:App.ext.input.listener.ups(2,App.ext.input);break;
										case 87:App.ext.input.listener.ups(2,App.ext.input);break;
										}
									},true);
								}
							if (App.ext.useragent.mouse) {
								window.addEventListener('mousewheel',function(evt,delta) {
									evt.preventDefault();
									if (App.ext.input.control)
										console.log('eh');
										App.ext.input.wheelDelta = delta;
									},true);
								window.addEventListener('mousedown',function(evt) {
										App.ext.input.listener.down(App.ext.input.position(App.client.visuals.canvas, evt),App.ext.input);
									},true);
								window.addEventListener('mousemove',function(evt) {
										App.ext.input.listener.move(App.ext.input.position(App.client.visuals.canvas, evt),null,App.ext.input);
									},true);
								window.addEventListener('mouseup',function(evt) {
										App.ext.input.listener.up(App.ext.input.position(App.client.visuals.canvas, evt),App.ext.input);
									},true);
								}
							if (!App.ext.useragent.touch) {
								window.addEventListener('touchstart',	function(evt) {
										evt.preventDefault();
										App.ext.input.listener.touch(evt.targetTouches[0],App.ext.input);
									},true);
								window.addEventListener('touchend',		function(evt) {
										evt.preventDefault();
										App.ext.input.listener.up(evt,App.ext.input);
									},true);
								window.addEventListener('touchmove',	function(evt) {
										evt.preventDefault();
										App.ext.input.listener.move(App.ext.input.position(App.client.visuals.canvas, evt), evt.targetTouches[0],App.ext.input);
									},true);
								}
							if (App.ext.useragent.windows) {
								window.addEventListener('MSPointerDown',function(evt) {
										App.ext.input.listener.down(App.ext.input.position(App.client.c, evt),App.ext.input);
									},true);
								window.addEventListener('MSPointerMove',function(evt) {
										App.ext.input.listener.move(App.ext.input.position(App.client.c, evt),null,App.ext.input);
									},true);
								window.addEventListener('MSPointerUp',	function(evt) {
										App.ext.input.listener.up(App.ext.input.position(App.client.c, evt),App.ext.input);
									},true);
								}
							}
						}
					}
				}
				},
				con:false,
				connection:null,
				connect:function(app){
				return;
					if ((this.offline)||(this.connectionAttempts>0))
						return this.offline = this.con;
					this.connectionAttempts++;
					Debug.log("Network:   Attempt: "+this.connectionAttempts);
					if (window.XMLHttpRequest)
						this.connection = new XMLHttpRequest();
						else
						this.connection = new ActiveXObject("Microsoft.XMLHTTP");
					this.connection.onreadystatechange = function()
						{
						if (this.connection.readyState==4 && connection.status==200)
							{
							this.offline = this.con = false;
							this.connectDatere = new Date;
							this.connectDatere = this.connectDatere.getTime();
							this.ping = this.connectDatere - this.connectDate;
							}
							else
							{
							this.offline = this.con = true;
							this.ping = 1;
							}
						}
						try {
							this.connection.open("GET","http://www.google.com",true);
							this.connection.send();
							} 
					catch(e){Debug.log('No0ernet');}
					return this.offline = this.con;
				}
			},
			constructor:function(a){return{
				app:{value:a},
				init:{value:function(name){
						(this.debug = Object.create(this.debug.prototype,this.debug.constructor(this.app))).init();
						(this.cursor = Object.create(this.cursor.prototype,this.cursor.constructor(this.app))).init();
						(this.useragent = Object.create(this.useragent.prototype,this.useragent.constructor())).init();
						(this.input = Object.create(this.input.prototype,this.input.constructor(this.app))).init();
						(this.colour = Object.create(this.colour.prototype,this.colour.constructor())).init();
						(this.metatag = Object.create(this.metatag.prototype,this.metatag.constructor())).init(name);
						Debug.log("Network:   Connection: "+!this.connect(this));
						}
					}
				}
			}
		},
		client:{
			name:"",discription:"",
			width:0,height:0,setWidth:0,setHeight:0,
			scale:1,delta:1,resized:false,targetfps:60,
			c:{},b:{},_Main:{},
			canvas:function(){
				(this._Canvas?(this.c=document.getElementById(this._Canvas),this.b=document.getElementById(this._Buffer),this._Scale=false):(this._Scale=true,this.c=document.createElement("canvas"),this.b=document.createElement("canvas"),this.c.id="Client",this.b.id="Buffer",document.body.appendChild(this.c),document.body.appendChild(this.b)));
				(this.visuals = this._Visuals = Object.create(this._Visuals.prototype,this._Visuals.constructor())).init(this);
				this._Canvas?(
						this.visuals.canvas.style.position = "relative",
						this.visuals.canvas.style.zIndex = "1",
						this.visuals.canvas.style.left = "0px",
						this.visuals.canvas.style.top = "0px",
						this.visuals.buffer.style.position = "relative",
						this.visuals.buffer.style.zIndex = "0",
						this.visuals.buffer.style.left = "0px",
						this.visuals.buffer.style.top = "0px"):(    
						this.visuals.canvas.style.position = "absolute",
						this.visuals.canvas.style.zIndex = "1",
						this.visuals.canvas.style.top = "0px",
						this.visuals.canvas.style.left = "0px",
						this.visuals.buffer.style.position = "absolute",
						this.visuals.buffer.style.zIndex = "0",
						this.visuals.buffer.style.left = "0px",
						this.visuals.buffer.style.top = "0px")
			},
			init:function(name,w,h){
				this.name = name;
				this.discription = "Eh";
				this.width = this.setWidth = w;
				this.height = this.setHeight = h;
				(this._Graphics = Object.create(this._Graphics.prototype,this._Graphics.constructor(this,this.c,this.b))).init();
				this._Room = Object.create(this._Room.prototype,this._Room.constructor()).init();

				(this.cookies = this._Cookies = Object.create(this._Cookies.prototype,this._Cookies.constructor())).init();
				(this.audio = this._Audio = Object.create(this._Audio.prototype,this._Audio.constructor())).init();

				(this.mainLoop = Object.create(this._Pace.prototype,this._Pace.constructor(this))).init(this.targetfps,this.targetfps);
				(this.second = Object.create(this._Pace.prototype,this._Pace.constructor(this))).init(1.0,this.targetfps);
				this._Main = Object.create(_Main.prototype);
				(this.update.state = Object.create(this.update.state.prototype,this.update.state.constructor())).init(this._Main);
				//console.log(this.update.state.current);
			},
			start:function(loop,scale){
				this.scale = scale;
				this.client_f = loop;
				requestNextAnimationFrame(this.client_f);
			},
			loop:function(a){
				this.mute = this._Audio.update();
				this.scale = this.update.scale(this);
				this.fps = this.update.step.tick(this.second,this.mainLoop,a);
				App.ext.cursor.set("auto");
				this.resized = this.update.size(this);
				this._Visuals.draw(this.scale);
				a.ext.input.update();
				requestNextAnimationFrame(this.client_f);
			},
			update:{
				last:{w:0,h:0},
				difference:{x:0,y:0},
				scaler:{s:1,x:1,y:1},
				scaling:true,
				scalediff:0,
				lastscale:1,
				fullscale:false,
				resized:false,
				pause:0,
				set:0,
				frames:0,
				pause:function(){
				
				},
				size:function(app){
					this.difference = app.Math.Vector.Difference(new app.Math.Vec(this.last.w,this.last.h),new app.Math.Vec(app.width,app.height));
					if ((this.difference.x + this.difference.y==0))
						return false;
					app._Visuals.canvas.width  = this.last.w = app.width;
					app._Visuals.canvas.height = this.last.h = app.height;
					app._Visuals.buffer.width  = this.last.w = app.width;
					app._Visuals.buffer.height = this.last.h = app.height;
					Debug.log(this.difference.x + this.difference.y);
					return true;
					},
				scale:function(app) {
					if (this==window) 
						return Debug.log('Warning: Scale: [this === window]');
						else
					if ((this.pause>0.5))
						return Debug.log('Warning: Paused',30); 
						else
					if (this.set==1)
						return Debug.log('Warning: Scale: Duplicate Run',30); 
						
					if (this.scaling)
						{
							if (window.innerHeight!==app.height)
								app.height = window.innerHeight;
							if (window.innerWidth!==app.innerWidth)
								app.width = window.innerWidth;
						}
						else
						{
							if (window.innerHeight!==app.height)
								app.height = app.setHeight;
							if (window.innerWidth!==app.innerWidth)
								app.width = app.setWidth;
						}
					this.set = 1;
					this.scaler.x = app.height/app.setHeight;
					this.scaler.y = app.width/app.setWidth;
					(this.fullscale)?this.scaler.s = this.scaler.x:this.scaler.s = (this.scaler.x<this.scaler.y)?this.scaler.x:this.scaler.y;
					if (isNaN(this.scaler.s)){this.set = 0;return;}
					this.scalediff = this.scaler.s-this.lastscale;
					(this.scalediff)?function() {
						window.scrollTo(0, 1);
						}:null;
					this.set = 0;
					this.lastscale = this.scaler.s;
					return this.scaler.s;
				},
				state:{
					prototype:{
						name:String,
						init:{},
						current:{},
						initalized:false,
						set:function(state,start){
							if((this.name=state.name)&&(this.initalized=!0)){
							if (!state.started)
								(this.current=Object.create(state,App.client._Room))
							//	else
							//	(this.current = state).init;
							if (start)
								{
								this.current.init()
								this.current.started = true;
								}
							//this.current.started = this.current.init();
							App.ext.input.delay = 1;
							};
							
						},
						update:function(){
							this.current.update();
						},
						draw:function(){
							this.current.draw();
						}
					},
					constructor:function(){
						return	{
							init:{value:function(state){
									this.set(state,true);
									this.initalized = true;
								}
							}
						}
					}
				},
				step:{
					adding:0,
					addings:0,
					frames:0,
					fps:1,
					delta_speed:1,
					delta:1,
					increment:0,
					clean:function(frames){
						this.frames = 0;
						return frames;
					},
					tick:function(a,b,app){
						this.first(a,app);
						this.second(b,app);
						return this.fps;
					},
					first:function(step,app){
						if (!step.Step(app))
							return;
							
							
							
						this.fps = 1 * (this.clean(this.frames)/step.delta * 1E3);
						
						this.delta = 1 * (step.targetfps / this.fps);
						
						if (this.delta!==this.delta+1)
							App.delta = App.client.delta = this.delta_speed = this.delta;
							else
							App.delta = App.client.delta = this.delta_speed = 1;
							
						if (this.fps==0)
							return;
						this.increment = -step.targetfps+ (step.targetfps*(step.targetfps / this.fps));
						this.adding+=this.increment;
						if (this.adding>step.targetfps)
							this.adding-=(this.adding/step.targetfps)*step.targetfps,this.addings++;
						return;
					},
					second:function(step,app){
						if (!step.Step(app))
							return false;
						this.frames++;
						for(var s =this.addings;s>=0;--s)
							if (app.client.update.state.initalized)
								(document.hasFocus())?app.client.update.state.current.update():null;
						this.addings = 0;
					}
				}
			},
			Math:{
				Difference:function(a,b){
					return a-b;
				},
					Pythageon:function(a,b){
						return Math.sqrt((a*a) + (b*b));
					},
				Vector:{
					x:0,y:0,
					Difference:function(a,b){
						return {x:a.x-b.x,y:a.y-b.y};
					},
					Sum:function(a,b){
						return {x:a.x+b.x,y:a.y+b.y};
					}
				},
				Vec: function(x,y){
					this.x = x;
					this.y = y;
				},
				Data:{
					selfCount:0,
					bytes:0,
					value:{},
					stack:[{}],
					objectList:[{}],
					total:0,
					update:0,
					Total:function(){
					return this.total = this.kilobyteCount($);
					},
					Update:function(){
					if (App.client.update.state.initalized)
						return this.update = this.byteCount(App.client.update.state.current.update);
						else
						return this.update = this.byteCount(Object.create(null,App.client._Room));
					},
					isFunction:function(functionToCheck) {
						 var getType = {};
						 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
						},
					byteCount:function (object) {
						if (this.isFunction(object))
							return this.byteCountF(object.toString().length*2);
						this.objectList = [];
						this.stack = [ object ];
						this.bytes = 0;
						while ( this.stack.length ) {
							this.value = this.stack.pop();
							if ( typeof this.value === 'trueean' ) {
								this.bytes += 4;
							}
							else if ( typeof this.value === 'string' ) {
								this.bytes += this.value.length * 2;
							}
							else if ( typeof this.value === 'number' ) {
								this.bytes += 8;
							}
							else if	(typeof this.value === 'object' && this.objectList.indexOf( this.value ) === -1) {
								this.objectList.push( this.value );
								for( i in this.value ) {
									if ((this.value[i]==object)||(this.value[i]==window)){
										if ((this.selfCount>0)||(this.value[i]==window))
											{
												this.selfCount = 0;
												break;
											}
										this.selfCount++;
									}
									this.stack.push( this.value[ i ] );
								}
							}
						}
						return this.bytes;
					},
					byteCountF:function(s){
						return encodeURI(s).split(/%..|./).length - 1;
					},
					kilobyteCount:function(object){
						return  Math.round((this.byteCount(object)*this.KB)*100)/100;
					},
					kb:0.0078125,
					KB:0.0009765625
				}
		},
		Particles:{
			p:0,
			draw:function(l){
			
				for (this.p=_Rain.size-1; this.p;--this.p)
					_RainParticles[this.p].draw(App.client.visuals,l);
			},
			update:function(){
				for (var _R=0; _R<_Rain.size;++_R)
					_RainParticles[_R].update();
			}
		},
		_Room:{
				prototype:{
				init:DefaultObject,
				app:DefaultObject,
				visuals:DefaultObject,
				graphics:DefaultObject,
				started:false,
				Started:{value:function(){return function() {var a = this.Started;App.set_scale();this.Started = true; return a};}}
				},
				constructor:function(){return {
					init:{value:function(){
							return {
							app : {value:App},
							visuals :   {value:App.client.visuals},
							graphics :  {value:App.client._Graphics}
							};
						}}
					}
				}
			},
		_Pace:{
			prototype:{
			timer:	0,
			rate:	0,
			offset:	0,
			delta:	1,
			Time:	function(app) 
				{
					this.timer = new Date().getTime();
					return this.timer - this.offset;
				},
			Step:	function(app)	
				{
					this.delta = this.Time(app);
					var step = this.rate*this.delta;
					if (step>1.0)
						this.offset+=Math.floor(step)/this.rate;
					return (step - 1.0)>0.0?true:false;
				},
			GetStepsPerSecond:	function()	
				{
					return 1000.0/this.delta;
				}
			},
			constructor:function(){return {
				init:{value:function(rate,fps){
						Debug.log('Pace: Init');
						this.targetfps = fps;
						this.timer = new Date().getTime();
						this.rate = rate/1000.0;
						this.offset = this.timer-1000.0/rate;
						this.delta = 0.0;
						return true;
					}}
				}
			}
		},
	_Audio:{
			prototype:{
				mute:false,
				quality:0,
				current:0,
				audio: new Audio(),
				sound: new Array(new Audio()),
				length: new Array(),
				MultiChannelSound:function(filename,channelQ,callback){	
					if (App.ext.useragent.ie)
						return;
					this.fname = filename;
					this.channel = new Array();
					for (var i = 0; i != channelQ; ++i)
					{
						this.channel[i] = new Audio(filename);
					}
					this.currentChannel = 0;
					this.play = function play()
					{
						try{
						this.channel[this.currentChannel].currentTime = 0;
						this.channel[this.currentChannel].play();
						++this.currentChannel;
						if (this.currentChannel == this.channel.length)
						{
							this.currentChannel = 0;
						}
						}catch(e){}
					}
					this.stop = function stop()
					{
						this.channel[this.currentChannel].pause();
						++this.currentChannel;
						if (this.currentChannel == this.channel.length)
						{
							this.currentChannel = 0;
						}
					}
				},
				toggle:function() {
					//(this.mute)?this.sound[this.current].play():this.sound.[this.current].pause();
					return this.mute = !this.mute;
				},
				set:function(index){
					if (App.ext.useragent.ie)
						return;
					if (!this.mute)
						{
						this.sound[this.current].pause();
						this.current = index;
						try{
						index.currentTime = 0;
						}catch(e){}
						index.play();
						}
				},
				update:function() {
					return;
					if (this.sound[this.current]==="undefined")
						return;
					if (this.sound[this.current].currentTime >= this.length)
					{
						if (++this.current == soundtrackQ)
						{
							this.current = 0;
						}
						
						this.sound[this.current].currentTime = 0;
						this.sound[this.current].play();
					}
				}
			},
			constructor:function(){return {
				init:{value:function(){
						Debug.log('Audio: Init');
						return true;
					}}
				}
			}
		},
		_Animation:function(aniArray,aniSpeed,ani,origAni){
			///Animation States
			///  -2 = set to idle.
			/// -1 = animate backwards and stop.
			///  0 = set to first frame.
			///  1 = animate forwards and stop.
			///  2 = animate forwards and return to 0 and animate again.
	
			this.aniImage = new Array();
			this.aniImage = aniArray;
			this.nextAni = new Array();
			this.nextAni = origAni;
			
			if (this.aniImage[0])
				this.aniMax = this.aniImage.length-1;
				else
				this.aniMax = 0;
			this.aniCurrent = 0;
			this.aniSpeed = aniSpeed*App.delta_speed;
			this.animate = ani;
			this.aniChanged = 0;
			this.aniPrev = aniArray;
			this.aniDir = 1;
			this.recreate = function recreate(aniArray,aniSpeed,ani)
			{
				this.aniCurrent = 0;
				this.aniImage = aniArray;
				this.aniSpeed = aniSpeed;
				this.animate = ani;
				this.aniDir = 1;
			}
			this.update = function update()
			{
				if (!this.aniImage==this.aniPrev)
					this.aniPrev = this.aniImage,this.changed();
				if (this.animate==-2)
				{
					//this.aniImage = snowboarding_loading.player_idle;
					if (this.aniCurrent>=this.aniMax)
						this.aniDir = -1;
					if (this.aniCurrent<=0)
						this.aniDir = 1;
					if (this.aniCurrent<=this.aniMax)
						this.aniCurrent+=this.aniSpeed * this.aniDir;
					
				}
				if (this.animate==-1)
				{
					if (this.aniCurrent>0)
						this.aniCurrent-=this.aniSpeed;
				}
				if (this.animate==0)
				{
					this.aniCurrent = 0;
				}
				if (this.animate==1)
				{
					if (this.aniCurrent<this.aniMax)
						this.aniCurrent+=this.aniSpeed;
					if (this.aniCurrent>this.aniMax)
						this.aniCurrent = this.aniMax;
				}
				if (this.animate==2)
				{
					this.aniCurrent+=this.aniSpeed;
					if (this.aniCurrent>=this.aniMax)
						this.aniCurrent=0;
				}
			}
			this.changed = function changed()
			{
				this.recreate(this.nextAni,this.aniSpeed,0);
			}
			this.reverse = function reverse()
			{
				if (this.animate==1)
					this.animate=-1;
					else
					this.animate=1;
			}
			this.get_img = function get_img()
			{
				if ( this.aniImage[Math.round(this.aniCurrent)])
					return this.aniImage[Math.round(this.aniCurrent)];
					else
					return this.aniImage;
			}
		},
		_Graphics:{
			prototype:{
				path:"",
				SpriteWebItems:new Array(0),
				SpriteLoadNumber:0,
				SpriteLoadErrors:0,
				SpriteLoadTime:0,
				Sources:{},
				load:function(name,file){
					this.Sources.append(this.SpriteAppend(name,file));
					return this.Sources.getByName(name);
				},
				SpriteCreate:function(file,src,name){		
					this.SpriteLoadNumber++;
					this.SpriteLoadTime += (10*App.delta_speed)*this.SpriteLoadNumber;
					return sprite = Object.create(Sprite,{file:{value:file},src:{value:src},name:{value:name}});
				},
				SpriteAppend:function(name,file){	
					return (img = this.SpriteCreate(file,this.path + file + ".png",name)).get();
				},
				SpriteUnload:function(name,file){
					delete this.Sources.getByName(name);
					//return this.SpriteLoad(name,file);
				},
				webLoad:function(name,address){
					this.SpriteWebItems[name] = new Image();
					this.SpriteWebItems[name].src = address;
					return this.SpriteWebItems[name];
				},
				graphicsLibrary:function(){
					Sprite = Object.create(null);
					this.Sources = Object.create(null);
					this.Sources.prototype = {	
						get:function get(){return this.index;},
						getByName:function getByName(name){return this.index[name];},
						getName:function getName(name){return this.index[name].name;},
					}
					Sprite = Object.create(this.Base,
					{
						constructor:function Sprite(path,filename){this.path=path;this.filename=filename;return path;},
						src:	{value:"S:undefined"},
						file:	{value:"S:undefined"},
						name:	{value:"S:undefined"}
					});
					this.Sources = Object.create(this.Sources.prototype,
					{
						count:{writable: true,  configurable:true,value:0},
						index:{value:new Array()},
						append:{value:function append(image)
						{
							if (this.index[image.name]==image)
								return;
							this.index[image.name]=image; 
							this.count++;
							Debug.log("GraphicsController: load: "+image.name + ":"+this.count);
						}},
						unload:{value:function unload(name)
						{
							this.index[name]=null; 
							delete this.index[name]; 
							Debug.log('GraphicsController: unload: '+name);
							return this.index[name];
						}},
					});
					return true;
				},
				Base:{
					get:function() {
							var img = new Image();
							img.src = this.src;
							img.file = this.file;
							img.name = this.name;
							img.number = 1+ App.client._Graphics.SpriteLoadErrors++;
							img.onload = function() {
									App.client._Graphics.SpriteLoadErrors--;
									Debug.log("GraphicsController: loaded: "+this.name+":"+(App.client._Graphics.SpriteLoadErrors));
								};
							return img;
						},
					unload:function() {
							this.Sources.unload(this.name);
							Debug.log("GraphicsController: unload: "+image.name + ":"+this.count);
						}
				},
				getErrors:function(){
					return this.SpriteLoadErrors; 
				},
				getImage:function(name){
					return this.Sources.getByName(name); 
				},
			},
			constructor:function(){return {
				init:{value:function(){
						this.graphicsLibrary();
						Debug.log('GraphicsController: Init');
						return true;
					}}
				}
			}
		},
		_Visuals:{
			prototype:{
				app:DefaultObject,
				stat:{
						x:0,
						y:0,
						w:0,
						h:0,
						s:0,
						a:0,
						c:0,
						colour:"",
						oldcol:"",
						init:function(col, colold){
						this.x = 0;
						this.y = 0;
						this.w = 0;
						this.h = 0;
						this.s = 0;
						this.a = 0;
						this.c = 0;
						this.colour = col || 0;
						this.oldcol = colold || 0;
						}
					},
				stat2:DefaultObject,
				canvas:DefaultObject,
				canvas_context:DefaultObject,
				buffer:DefaultObject,
				buffer_context:DefaultObject,
				alpha:0,
				free:false,
				point:14,
				scale:0,
				grd:DefaultObject,
				font:"",
				settings:[
							["Full Clear", true],
							["Wide Clear", true],
							["Window Clear",false],
							["optimized_resize",false],
							["bufferMax",false],
							["borders",true]
						],
				init:DefaultFunction,
				set:function(a,b){
					return this.settings[a][1] = b;
				},
				draw:function(){
					
					//!0==this.settings[1][1]?this.clear_wide():this.clear_fit());
					//this.cleans.window();
					if (this.app.update.state.initalized)
						this.app.update.state.draw();
					this.debug();
					this.clearing.buff(this);//this.settings[2][1]?(this.buffer_context.clearRect(0,0,window.innerWidth,window.innerHeight),this.canvas_context.drawImage(this.buffer,0,0)):this.canvas_context.drawImage(this.buffer,0,0);
					//this.settings[4][1]?this.Borders():this.clearBorders();
					this.scale = this.app.scale;
				},
				clearing:{
					settings:[
							["WideClear", false],
							["PreClear", true],
							["BufferMax",false],
							["Window Clear",false],
							["optimized_resize",true],
							["borders",true]
						],
					pre:function(){
						!0==this.settings[1][1]?this.all():this.none();
					},
					buff:function(t){
					
						this.pre();
						this.window();
						!this.settings[2][1]?(t.canvas_context.drawImage(t.buffer,0,0),t.buffer_context.clearRect(0,0,window.innerWidth,window.innerHeight)):t.canvas_context.drawImage(t.buffer,0,0);
					},
					window:function(){
						var a = App.client.width/App.client.scale;
						var b = (App.client.setWidth*1.777)*0.5;
						if (!this.settings[0][1]) {
							this.clear(0-(a),0,a,App.client.setHeight);
							this.clear(0+(App.client.setWidth),0,App.client.setWidth+a,App.client.setHeight);
						} else {
							this.clear(-b*0.5-(a),0,a,App.client.setHeight);
							this.clear(+b*0.5+(App.client.setWidth),0,App.client.setWidth+a,App.client.setHeight);
						}
						this.clear(-b,0,(App.client.setWidth*1.777)*2/App.client.scale,-App.client.height/App.client.scale);	
						this.clear(-b,App.client.setHeight,(App.client.setWidth*1.777)*2/App.client.scale,App.client.height/App.client.scale);
					},
					none:function(){
					
					},
					borders:function(){
						this.clear(0,0,-this.app.width,this.app.height/this.app.scale);
						this.clear(0+this.app.setWidth,0,this.app.width,this.app.height/this.app.scale);
						this.clear(0,0,this.app.setWidth,-this.app.height/this.app.scale);	
						this.clear(0,this.app.setHeight,this.app.setWidth,this.app.height/this.app.scale);
					},
					all:function(){
						//this.clear(-App.client.width,0,-App.client.width*2/App.client.scale,App.client.height);
						//this.clear(+App.client.width*2,0,App.client.width*2/App.client.scale,App.client.height);
						//this.clear(-App.client.width,-App.client.height,App.client.width*3,App.client.height*3);
					},
					clear: function(x,y,width,height) {
						App.client._Visuals.stat = App.client._Visuals.chk(x,y,width,height,1);
						App.client._Visuals.buffer_context.clearRect(App.client._Visuals.stat.x,App.client._Visuals.stat.y,App.client._Visuals.stat.w,App.client._Visuals.stat.h);
						App.client._Visuals.settings[3][1]||App.client._Visuals.canvas_context.clearRect(App.client._Visuals.stat.x,App.client._Visuals.stat.y,App.client._Visuals.stat.w,App.client._Visuals.stat.h);
					}
				},
				fixX:function(x){
					return ((x*this.scale)+(this.app.width/2)-(this.app.setWidth/2)*this.scale);
				},
				fixY:function(y){
					return ((y*this.scale)+(this.app.height/2)-(this.app.setHeight/2)*this.scale);
				},
				fixW:function(w){
					return (w*this.scale);
				},
				fixH:function(h){
					return (h*this.scale);
				},
				chkc:{},
				chk:function(x,y,w,h,s,a,c,colour,font){
					this.chkc = this.colour();
					this.opacity(a);
					this.colour(colour);
					if (!this.free)	return {
						x:this.fixX(x),
						y:this.fixY(y),
						w:this.fixW(w)*s,
						h:this.fixH(h)*s,
						s:s || 1,
						a:a || 0,
						c:c || false,
						colour:colour || this.colour(),
						oldcol:this.chkc,
						font:this.font || font,
						init:this.stat.init
					}
					else return {
						x:x,y:y,
						w:w || 0,
						h:h || 0,
						s:s || 1,
						a:a || 1,
						c:c || false,
						colour:colour || this.colour(),
						oldcol:this.chkc,
						font:font,
						init:this.stat.init
					}
				},
				debug:function(){
					if (!App.ext.debug.strength=="Normal")
						return;
					if ((App.ext.debug.strength=="off")||(App.ext.debug.strength=="none"))
						return;
					this.rect_ext(-this.app.setWidth,0,this.app.setWidth+this.app.setWidth+this.app.setWidth,this.point,1,0.1,0);
					this.rect_ext(0,0,this.app.setWidth,this.point,1,0.1,0);
					this.text_ext("0",	0,this.point*0.9,this.point*0.9);
					this.text_ext(this.app.setWidth,	this.app.setWidth-25,this.point*0.9,this.point*0.99);
					if (window.innerWidth>(this.app.setWidth*1.1)*this.scale)
						{
							this.text_free(0-this.fixX(0),	30,4+this.fixY(this.point),this.point*0.99);
							this.text_free(this.app.width,	window.innerWidth-15,4+this.fixY(this.point),this.point*0.99);
						}
					//this.text_ext("Debug",	this.app.setWidth/2.5,this.point*0.9,this.point*0.9);
					//this.text_ext(this.app.name,5,25,"#FFFFFF",4,1,0);
					//this.text_ext("app.ext.input",15,40,"#FFFFFF",1,1,0);
					//this.text_ext("x "+Math.round($.ext.input.x*100)/100		,25,55,"#FFFFFF",1,1,0);
					//this.text_ext("x: "+Math.round($.ext.input.window.x*100)/100,75,55,"#FFFFFF",1,1,0);
					//this.text_ext("y "+Math.round($.ext.input.y*100)/100		,25,70,"#FFFFFF",1,1,0);
					//this.text_ext("y: "+Math.round($.ext.input.window.y*100)/100,75,70,"#FFFFFF",1,1,0);
					if (this.app.fps<20)
						console.log(this.app.fps);
					
					var data = [
								[this.app.name],
								[$.code],
								[$.codefmk],
								[
								"app.ext.input",
								"x "+Math.round($.ext.input.x*100)/100		,
								"x "+Math.round($.ext.input.window.x*100)/100,
								"d "+$.ext.input.pressed+"   p "+$.ext.input.duration,
								
								
								"y "+Math.round($.ext.input.y*100)/100		,
								"y "+Math.round($.ext.input.window.y*100)/100,
								($.ext.useragent.trident)?"Input: "+"Touch":"Input: Mouse",
								],
								[
								"app.client",
								"discription","","",
								"width" ,this.app.setWidth,this.app.width,
								"height",this.app.setHeight,this.app.height,
								"fps",Math.round(this.app.fps)+"/"+this.app.targetfps+":"+Math.round(this.app.fps*1000)/1000,"",
								"scale",this.app.scale,"",
								"delta",this.app.delta,"",
								"buffer","double","",
								],
								[
								"app.client.state","",
								"[ "+this.app.update.state.name+" ] : "+this.app.Math.Data.Update()+"B",
								"",
								""
								],
								[
								"app.client.data","",
								"visuals ",($.ext.debug.strength!=="Lite"?this.app.Math.Data.kilobyteCount(this.app._Visuals):"?"),"",
								"graphics ",($.ext.debug.strength!=="Lite"?this.app.Math.Data.kilobyteCount(this.app._Graphics):"?"),"",
								"audio ",($.ext.debug.strength!=="Lite"?this.app.Math.Data.kilobyteCount(this.app._Audio):"?"),"",
								"state ",($.ext.debug.strength!=="Lite"?this.app.Math.Data.kilobyteCount(this.app.update.state.current):"?"),"",
								"ext ",($.ext.debug.strength!=="Lite"?this.app.Math.Data.kilobyteCount($.ext):"?"),"",
								"Total ",($.ext.debug.strength!=="Lite"?this.app.Math.Data.Total():"?"),""
								
								]
							];
							
							
for(var t=0,tt=0,p=65,tr=0,ii=0;ii<data.length&&(6!=ii||"Lite"!=App.ext.debug.strength);++ii)
	{
	for(var i=data[ii].length;0<i;--i)
		0==i%3&&(t=0,tr=15,tt++),
		this.text_ext(data[ii][data[ii].length-i],tr+15+p*t,25+1.1*this.point*tt,"#FFFFFF",4,1,0),
		tr=0,
		t++;
	t=0;
	tt++
	};

					//this.text_ext("D: "+$.ext.input.duration,210,55);
					//this.text_ext("P: "+$.ext.input.pressed,160,55);
					//($.ext.useragent.trident)?this.text_ext("Input: "+"Touch",160,70):this.text_ext("Input: "+"Mouse",160,70);
					//this.text_ext("I: "+$.ext.input.window.inside+" X: "+$.ext.input.window.x+" Y: "+$.ext.input.window.y,155,70);
					//this.text_ext("app.client",15,85,"#FFFFFF",1,1,0);
					//this.text_ext("Discription: "+this.app.discription,25,100,"#FFFFFF",1,1,0);
					//this.text_ext("Fps: "+Math.round(this.app.fps)+"/"+this.app.targetfps+":"+Math.round($.ext.fps*1000)/1000,25,115,"#FFFFFF",1,1,0);
					//this.text_ext("Width: "+this.app.width,25,130,"#FFFFFF",1,1,0);
					//this.text_ext("Height: "+$.client.height,25,145,"#FFFFFF",1,1,0);
					//this.text_ext("setWidth: "+this.app.setWidth,110,130,"#FFFFFF",1,1,0);
					//this.text_ext("setHeight: "+this.app.setHeight,110,145,"#FFFFFF",1,1,0);
					//this.text_ext("Scale: "+this.scale,25,160,"#FFFFFF",1,1,0);
					//this.text_ext("Delta: "+$.client.delta,25,175,"#FFFFFF",1,1,0);
					//this.text_ext("Buffering: "+"Double",25,190,"#FFFFFF",1,1,0);
					//this.text_ext("client.data",15,205,"#FFFFFF",1,1,0);
					//this.text_ext("[ "+this.app.update.state.name+" ] : "+this.app.Math.Data.Update()+"B",25,220,"#FFFFFF",1,1,0);
					this.text_ext("Log: "+$.ext.debug.text,35,this.app.setHeight-25,this.point);
					if (App.ext.debug.strength=="Lite")
						return;
						
						try {
					//this.text_ext("_Visuals: " 	+ this.app.Math.Data.kilobyteCount($.client._Visuals) 		+"kb",25,235,"#FFFFFF",1,1,0);
					}catch(e){}
					//this.text_ext("_Graphics: " + this.app.Math.Data.kilobyteCount($.client._Graphics) 		+"kb",25,250,"#FFFFFF",1,1,0);
					//this.text_ext("_Audio: " 	+ this.app.Math.Data.kilobyteCount($.client._Audio) 		+"kb",25,265,"#FFFFFF",1,1,0);
					//this.text_ext("_State: " 	+ this.app.Math.Data.kilobyteCount($.client.update.state) 	+"kb",25,280,"#FFFFFF",1,1,0);
					//this.text_ext("ext: " 		+ this.app.Math.Data.kilobyteCount($.ext) 					+"kb",25,295,"#FFFFFF",1,1,0);
					//this.text_ext("Total: "		+ this.app.Math.Data.Total()								+"kb",25,325,"#FFFFFF",1,1,0);
				},
				Borders: function() {
					this.clear(0,0,-this.app.width,this.app.height/this.app.scale);
					this.clear(0+this.app.setWidth,0,this.app.width,this.app.height/this.app.scale);
					this.clear(0,0,this.app.setWidth,-this.app.height/this.app.scale);	
					this.clear(0,this.app.setHeight,this.app.setWidth,this.app.height/this.app.scale);
				},
				clearBorders: function() {
				
					this.clear(-this.app.width,0,-this.app.width,this.app.height/this.app.scale);
					this.clear(0+this.app.setWidth,0,this.app.width,this.app.height/this.app.scale);
					this.clear(0,0,this.app.setWidth,-this.app.height/this.app.scale);	
					this.clear(0,this.app.setHeight,this.app.setWidth,this.app.height/this.app.scale);
				
					return;
					this.clear(-this.w,0,-this.w*2/this.scale,this.h);
					this.clear(+this.w*2+2,0,this.w*2/this.scale,this.h);
					this.clear(0,0,this.w,-this.h);	
					this.clear(0,this.h,this.w,this.h);
				},
				clear_fit: function() {
					this.clear(0,0,$.client.width,$.client.heighteight);
				},
				clear_wide: function() {
					this.clear(-$.client.width,0,$.client.width*3,$.client.height);
				},
				clear: function(x,y,width,height) {
					this.stat = this.chk(x,y,width,height,1);
					this.buffer_context.clearRect(this.stat.x,this.stat.y,this.stat.w,this.stat.h);
					this.settings[3][1]||this.canvas_context.clearRect(this.stat.x,this.stat.y,this.stat.w,this.stat.h);
				},
				background_set:function(value) {
					this.buffer.style.background = value;
					this.canvas.style.background = value;
				},
				background_get:function() {
					return this.buffer.style.background;
				},
				clean:function(){
					this.cleanAlpha?this.opacity(1):null;
					this.colour(this.stat.oldcol);
					this.stat.init(this.colour(),this.stat.oldcol);
				},
				colour:function(colour1,colour2) {
					if (colour1)
						{
							return colour1&&(this.buffer_context.fillStyle=colour1);colour2&&(this.buffer_context.strokeStyle=colour2);
						}
						else
						return this.buffer_context.fillStyle;
				},
				opacity:function(opacity) {
					return opacity!=this.alpha&&(this.alpha=opacity,this.canvas_context.globalAlpha=this.buffer_context.globalAlpha=opacity!=this.lastopacity?opacity:1);
				},
				fontT:"",
				fontL:"",
				font:function(font)	{ 
					return font!=this.fontT&&(this.canvas_context.font=this.buffer_context.font=this.fontT=font?font:this.fontL);
					//if (font)
					//	this.buffer_context.font = font;
					//return this.buffer_context.font;
				},			
				text_free:function(string, x, y,colour){
					this.colour(colour);
					this.font(Math.round(this.point*this.scale)+"px "+"sans-serif");
					this.buffer_context.fillText(string,x-this.text_width(string)/2-this.point,y-this.point/2);
					this.clean();
				},
				text_ext:function(string,x,y,colour,s,a,c,style){
					this.stat = this.chk(x,y,this.text_width(string),1,s,a,c,colour);
					var f = this.font();
					this.font(Math.round(this.stat.s*this.scale)+"em "+style);
					(this.stat.c)?this.buffer_context.fillText(string,this.stat.x-this.stat.w/2-this.stat.s,this.stat.y-this.stat.s/2):this.buffer_context.fillText(string,this.stat.x,this.stat.y);
					this.font(f);
					this.clean();
				},
				text:function(string, x, y,colour){
					this.text_ext(string,x,y,colour,1,1,0,"");
				},	
				text_shadow:function(blur,x,y,colour){
					this.buffer_context.shadowColor = colour;
					this.buffer_context.shadowBlur = blur;
					this.buffer_context.shadowOffsetX = x;
					this.buffer_context.shadowOffsetY = y;
				},
				rect_ext:function(x,y,w,h,s,a,c,colour){
					this.stat = this.chk(x,y,w,h,s,a,c,colour);
					this.buffer_context.beginPath();
					this.stat.c?this.buffer_context.rect(this.stat.x-this.stat.w/2, this.stat.y-this.stat.h/2, this.stat.w, this.stat.h):this.buffer_context.rect(this.stat.x, this.stat.y, this.stat.w, this.stat.h);
					this.buffer_context.fill();
					
					this.clean();
				},	
				rect:function (x,y,w,h,colour){
					this.rect_ext(x,y,w,h,1,1,1,colour);
				},
				rect_button:function(x,y,w,h,colour){
					this.stat = this.chk(x,y,w,h,1,1,1,colour);
					if (this.touch_within(this.stat.x,this.stat.y,this.stat.w,this.stat.h))
					{
					this.app.cursor.set(App.cursor.pointer);
					}
					this.rect_ext(x,y,w,h,1,1,1,colour);
				},
				rect_rotate:function(x,y,w,h,colour,s,a,angle){
					this.stat = this.chk(x,y,w,h,s,a,1,colour);
					this.buffer_context.translate(this.stat.x,this.stat.y);
					this.buffer_context.rotate(angle*0.0174532925);
					this.stat.c?this.buffer_context.rect(0-this.stat.w/2,0-this.stat.h/2, this.stat.w, this.stat.h):this.buffer_context.rect(0, 0, this.stat.w, this.stat.h);
					this.buffer_context.rotate(-angle*0.0174532925);
					this.buffer_context.translate(-this.stat.x,-this.stat.y);
					this.clean();
				},
				rect_gradient:function(x,y,w,h,s,a,c,colour,colour2,angle){
					this.stat = this.chk(x,y,w,h,s,a,c,colour);
					this.buffer_context.translate(this.stat.x,this.stat.y);
					this.buffer_context.rotate(angle*0.0174532925);
					this.stat.c?this.grd = this.buffer_context.createLinearGradient(this.stat.w/2,0, this.stat.w/2, this.stat.h/2):this.grd = this.buffer_context.createLinearGradient(0,0, this.stat.w, this.stat.h);
					this.buffer_context.beginPath();
					this.stat.c?this.buffer_context.rect(0-this.stat.w/2,0-this.stat.h/2, this.stat.w, this.stat.h):this.buffer_context.rect(0, 0, this.stat.w, this.stat.h);
					this.grd.addColorStop(0, colour);
					this.grd.addColorStop(1, colour2);
					this.buffer_context.fillStyle = this.grd;
					this.buffer_context.fill();
					this.buffer_context.rotate(-angle*0.0174532925);
					this.buffer_context.translate(-this.stat.x,-this.stat.y);
					this.clean();
				},	
				rect_free:function(x,y,w,h,s,a,c,colour){
					this.stat = this.chk(x,y,w,h,s,a,c,colour);
					this.buffer_context.beginPath();
					(c)?this.buffer_context.rect(x-w/2, y-h/2, w, h):this.buffer_context.rect(x, y, w, h);
					this.buffer_context.fill();
					this.clean();
				},	
				image_ext:function(image,x,y,s,a,c){		
					this.stat = this.chk(x,y,image.width,image.height,s,a,c);
					(this.stat.c)?this.buffer_context.drawImage(image,this.stat.x-this.stat.w/2,this.stat.y-this.stat.h/2,this.stat.w,this.stat.h):this.buffer_context.drawImage(image,this.stat.x,this.stat.y,this.stat.w,this.stat.h);
				},
				image_centered:function(image,x,y){		
					this.image_ext(image,x,y,1,1,true);
				},
				image:function(image,x,y){		
					this.image_ext(image,x,y,1,1,false);
				},
				image_part:function(image,x,y,s,a,c,xx,yy,w,h){
					this.stat = this.chk(x,y,w,h,s,a,c);
					this.buffer_context.drawImage(image,this.stat.x-this.stat.w/2,this.stat.y-this.stat.h/2,this.stat.w,this.stat.h,1,1,image.width,image.height);
				},
				image_rotate:function(image,x,y,s,angle,a,xoff,yoff){
					this.stat = this.chk(x,y,image.width,image.height,s,a,true);
					this.buffer_context.translate(this.stat.x,this.stat.y);
					this.buffer_context.rotate(angle*0.0174532925);
					(this.stat.c)?this.buffer_context.drawImage(image,0-this.stat.w/2,0-this.stat.h/2,this.stat.w,this.stat.h):this.buffer_context.drawImage(image,0,0,this.stat.w,this.stat.h);
					this.buffer_context.rotate(-angle*0.0174532925);
					this.buffer_context.translate(-this.stat.x,-this.stat.y);
				},

				image_button:function(image,x,y,s,loc,highlight,xscale,yscale,a,centered){
					this.stat = this.chk(x,y,image.width*xscale,image.height*xscale,s,a,centered);
					if (this.touch_within(this.stat.x,this.stat.y,this.stat.w,this.stat.h,this.stat.c))
					{
						App.ext.cursor.set(App.ext.cursor.pointer,true);
						if (App.ext.input.released)
							{
							
								loc();
							}
						if (App.ext.input.pressed)
							{
								this.opacity(this.stat.a*0.8);
								(this.stat.c)?this.buffer_context.drawImage(image,this.stat.x-this.stat.w/2,this.stat.y-this.stat.h/2,this.stat.w,this.stat.h):this.buffer_context.drawImage(image,this.stat.x,this.stat.y,this.stat.w,this.stat.h);
							}
						else
							{
								this.opacity(this.stat.a*0.85);
								(this.stat.c)?this.buffer_context.drawImage(image,this.stat.x-this.stat.w/2,this.stat.y-this.stat.h/2,this.stat.w,this.stat.h):this.buffer_context.drawImage(image,this.stat.x,this.stat.y,this.stat.w,this.stat.h);
							}
					}
					else
					{
					this.opacity(this.stat.a*0.75);
					(this.stat.c)?this.buffer_context.drawImage(image,this.stat.x-this.stat.w/2,this.stat.y-this.stat.h/2,this.stat.w,this.stat.h):this.buffer_context.drawImage(image,this.stat.x,this.stat.y,this.stat.w,this.stat.h);
					}			
					return;
				},
				touch_within:function(x, y, w, h,c) {
					return c?((App.ext.input.x>x-w/2&&App.ext.input.x<x+w/2&&App.ext.input.y>y-h/2&&App.ext.input.y<y+h/2)?true:false):((App.ext.input.x>x&&App.ext.input.x<x+w&&App.ext.input.y>y&&App.ext.input.y<y+h)?true:false);
				},
				text_button:function(){
				},
				line:function(x,y,x2,y2,col,a){
					this.stat = this.chk(x,y,x2,y2,1,a,true);
					this.stat2 = this.chk(x2,y2,x2,y2,1,a,true);
					this.buffer_context.beginPath();
					this.buffer_context.moveTo(this.stat.x,this.stat.y);
					this.buffer_context.lineTo(this.stat2.x,this.stat2.y);
					this.buffer_context.strokeStyle = col;
					this.buffer_context.stroke();
					this.clean();
				},
				lines:function(x,y,x2,y2,col,a,s){
					this.stat = this.chk(x,y,x2,y2,1,a,true);
					this.stat2 = this.chk(x2,y2,x2,y2,1,a,true);
					this.buffer_context.moveTo(this.stat.x*s,this.stat.y*s);
					this.opacity(a);
					this.buffer_context.strokeStyle = col;
					this.buffer_context.lineTo(this.stat2.x*s,this.stat2.y*s);			
				},
				lineend:function(){
					this.buffer_context.stroke();
				},	
				linestart:function(){
					this.buffer_context.beginPath();
				},
				circle:function(x,y,r,col,a){
					this.stat = this.chk(x,y,1,1,r,a,true,col);
					this.buffer_context.beginPath();
					this.buffer_context.arc(this.stat.x, this.stat.y, this.stat.s*this.scale, 0, 2 * Math.PI, false);
					this.buffer_context.fillStyle = this.stat.colour;
					this.buffer_context.fill();
				},
				circle_free:function(x,y,r,col,a){
					this.opacity(a);
					this.buffer_context.beginPath();
					this.buffer_context.arc(x, y, r*this.scale, 0, 2 * Math.PI, false);
					this.buffer_context.fillStyle = col;
					this.buffer_context.fill();
				},
				text_width:function(string) {
					return this.buffer_context.measureText(string).width; // Not WOrking
				}
			},
			constructor:function(){return {
				init:{value:function(app){
					this.app = app;
					this.scale = app.scale;
					this.canvas = app.c;
					this.buffer = app.b;
					this.canvas_context = this.canvas.getContext("2d");
					this.buffer_context = this.buffer.getContext("2d");
					this.background_set("transparent");
				}}}
			}
		},
		_Cookies:{
			prototype:{
				list:new Array(),
				expires:"",
				nameEQ:"=",
				ca:"",
				createCookie:function(name,value,days){
					if (days) {
						var date = new Date();
						date.setTime(date.getTime()+(days*24*60*60*1000));
						this.expires = "; expires="+date.toGMTString();
					}
					else this.expires = "";
					document.cookie = name+"="+value+";"+this.expires+"; path=/";
				return this.list.push(value);
				},
				readCookie:function(name){
					this.nameEQ = name + "=";
					this.ca = document.cookie.split(';');
					for(var i=0;i < this.ca.length;i++) {
						var c = this.ca[i];
						while (c.charAt(0)==' ') c = c.substring(1,c.length);
						if (c.indexOf(this.nameEQ) == 0) return c.substring(this.nameEQ.length,c.length);
					}
					//return null;
				},
				eraseCookie:function(name){
					this.createCookie(name,"",-1);
				}
			},
			constructor:function(){return {
					init:{value:function(){
								Debug.log('Cookies: Init');
							return true;
							}
						}
					}
				}
			}
		},
		animationFrame:	function()	{
			document.requestNextAnimationFrame = window.requestNextAnimationFrame =
		    (function () {
			var originalWebkitRequestAnimationFrame = undefined;
			var wrapper = undefined;
			var callback = undefined;
			var geckoVersion = 0;
			var userAgent = navigator.userAgent;
			var index = 0;
			var self = this;
			if (window.webkitRequestAnimationFrame) 
				{
					wrapper = function (time) {
					if (time === undefined) 
						{
							time = +new Date();
						}
					self.callback(time);
				 };
				 originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;
				 window.webkitRequestAnimationFrame = function (callback, element) 
				 {
					self.callback = callback;
					originalWebkitRequestAnimationFrame(wrapper, element);
				 }
				}
			if (window.mozRequestAnimationFrame) 
				{
				 index = userAgent.indexOf('rv:');
				 if (userAgent.indexOf('Gecko') != -1) 
					{
					geckoVersion = userAgent.substr(index + 3, 3);
					if (geckoVersion === '2.0') 
						{
					   window.mozRequestAnimationFrame = undefined;
						}
					}
			  }
			  return window.requestAnimationFrame   ||
				 window.webkitRequestAnimationFrame ||
				 window.mozRequestAnimationFrame    ||
				 window.oRequestAnimationFrame      ||
				 window.msRequestAnimationFrame     ||
				 function (callback, element) 
				 {
					var start;
					var finish;
					window.setTimeout( function () 
						{
							start = +new Date();
							callback(start);
							finish = +new Date();
							self.timeout = 1000 / 60 - (finish - start);
						}, self.timeout);
				 };
			  }
		   )
		();
		},
	},
	code:"",
	codefmk:"",
	scripts: new Array(),
	debug:false,
	fps:0,
	frames:0.0,
	framesT:0.0,
	second:{},
	mainLoop:{},
	delta:0.0,
	constructor:function(){return{
		code:{value:"0"},
		codefmk:{value:'0.6.50.14.22.01.min'},
		scripts:{value:window.scripts},
		init:{value:function(name,w,h){
				//this.scripts = window.scripts;		
				if ((!function(e,t,r){function n(){for(;d[0]&&"loaded"==d[0][f];)c=d.shift(),c[o]=!i.parentNode.insertBefore(c,i)}for(var s,a,c,d=[],i=e.scripts[0],o="onreadystatechange",f="readyState";s=r.shift();)a=e.createElement(t),"async"in i?(a.async=!1,e.head.appendChild(a)):i[f]?(d.push(a),a[o]=n):e.write("<"+t+' src="'+s+'" defer></'+t+">"),a.src=s}(document,"script",window.scripts))){}
				this.client.canvas();
				(this.ext = Object.create(this.ext.prototype,this.ext.constructor(this))).init(name);
				
				this.client.init(name,w,h);
				/////////////////////
				///////UserConfig////
				//this.user_Name = "Guest";
				/////////////////////
				this.animationFrame();
				setTimeout(
					function(A){
						function AppLoop(){$=A;A.client.loop(A);}
						A.client.start(AppLoop,A.scale);
					}(this),1600);
			}
		},
		}
	}
};
App = Object.create(App.prototype,App.constructor());



