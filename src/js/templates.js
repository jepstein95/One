exports['alert']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="header">'+
((__t=( header ))==null?'':_.escape(__t))+
'</div> <div class="content"> <p>'+
((__t=( body ))==null?'':_.escape(__t))+
'</p> </div> <div class="actions"> <div class="ui cancel red button"> <i class="remove icon"></i> No </div> <div class="ui ok green button"> <i class="checkmark icon"></i> Yes </div> </div>';
}
return __p;
};
exports['app']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="ui fixed inverted menu" id="menu"></div> <div class="ui container" id="app"> ';
 _.each(ids, function(id, i) { 
__p+=' <div class="page';
 if (page < i) { 
__p+=' page-right';
 } if (page > i) { 
__p+=' page-left';
 } 
__p+='" id="'+
((__t=( id ))==null?'':_.escape(__t))+
'"></div> ';
 }); 
__p+=' </div> <div class="ui long modal" id="modal"></div> <div class="ui small modal" id="modal-alert"></div>';
}
return __p;
};
exports['edit']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="header"> ';
 if (model) { 
__p+=' Edit Thread <button class="ui mini red right floated button delete-button">Delete</button> ';
 } else { 
__p+=' New Thread ';
 } 
__p+=' </div> <div class="content"> <div class="ui form" id="edit-form"> <div class="field"> <label>Name</label> <input type="text" name="name" placeholder="Name" ';
 if (model) { 
__p+=' value="'+
((__t=( model.name ))==null?'':_.escape(__t))+
'" ';
 } 
__p+='> </div> <div class="field"> <label>Description</label> <textarea name="description">';
 if (model) { 
__p+=''+
((__t=( model.description ))==null?'':_.escape(__t))+
'';
 } 
__p+='</textarea> </div> <div class="ui error message"></div> </div> </div> <div class="actions"> <div class="ui black deny button">Cancel</div> ';
 if (model) { 
__p+=' <div class="ui blue ok submit button edit-button">Edit</div> ';
 } else { 
__p+=' <div class="ui blue ok submit button create-button">Create</div> ';
 } 
__p+=' </div>';
}
return __p;
};
exports['graph']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="ui main text container"> <h2 class="ui dividing header"> Threads </h2> </div> ';
 if (loading === true) { 
__p+=' <div class="ui main container"> <div class="ui active centered inline loader"></div> </div> ';
 } else { 
__p+=' ';
 if (threads.length) { 
__p+=' <div class="ui main graph container"> <div id="line-chart"></div> </div> <div class="ui container"> <div class="ui form"> <div class="ui grouped fields"> ';
 _.each(threads, function(thread) { 
__p+=' <div class="field"> <div class="ui checkbox"> <input type="checkbox" name="'+
((__t=( thread._id ))==null?'':_.escape(__t))+
'" ';
 if (_.contains(checked, thread._id)) { 
__p+=' checked="checked" ';
 } 
__p+='> <label style="color: '+
((__t=( thread.color ))==null?'':_.escape(__t))+
'">'+
((__t=( thread.name ))==null?'':_.escape(__t))+
'</label> </div> </div> ';
 }); 
__p+=' </div> </div> </div> ';
 } else { 
__p+=' <div class="ui main text container"> <p>You have no active Threads</p> </div> ';
 } 
__p+=' ';
 } 
__p+='';
}
return __p;
};
exports['help']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="ui main text container"> <h2 class="ui dividing header"> What is One? </h2> <p>Ethical shoreditch pitchfork, etsy cardigan sriracha tumblr roof party. Tofu intelligentsia distillery gochujang, synth man braid try-hard thundercats swag beard wolf cliche hammock twee salvia. Photo booth chambray gentrify lumbersexual cray kickstarter. Cold-pressed deep v meditation, blog occupy heirloom cliche retro humblebrag chillwave yr slow-carb. Tousled umami gochujang +1, kale chips pinterest brooklyn cardigan etsy salvia craft beer mlkshk. Pour-over tofu blue bottle bicycle rights tousled flexitarian. Irony ethical raw denim, fixie portland humblebrag vice swag offal wayfarers mumblecore. Ethical shoreditch pitchfork, etsy cardigan sriracha tumblr roof party. Tofu intelligentsia distillery gochujang, synth man braid try-hard thundercats swag beard wolf cliche hammock twee salvia. Photo booth chambray gentrify lumbersexual cray kickstarter. Cold-pressed deep v meditation, blog occupy heirloom cliche retro humblebrag chillwave yr slow-carb. Tousled umami gochujang +1, kale chips pinterest brooklyn cardigan etsy salvia craft beer mlkshk. Pour-over tofu blue bottle bicycle rights tousled flexitarian. Irony ethical raw denim, fixie portland humblebrag vice swag offal wayfarers mumblecore.</p> </div>';
}
return __p;
};
exports['home']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="ui main container"> <h1 class="ui center aligned icon header"> <i class="circular users icon"></i> Welcome to One </h1> <h3 class="ui grey header"> <div class="quote">"'+
((__t=( quote ))==null?'':__t)+
'"</div> <div class="source">&#8212 '+
((__t=( source ))==null?'':__t)+
'</div> </h3> <div class="ui hidden divider"></div> <div class="ui hidden divider"></div> <div class="ui two column center aligned very relaxed stackable grid" style="position: relative"> <div class="center aligned column"> <div class="ui green labeled icon button" rel="show-signup"> <i class="signup icon"></i> Sign Up </div> <div class="ui blue labeled icon button" rel="show-login"> <i class="user icon"></i> Login </div> </div> <div class="ui vertical divider"> Or </div> <div class="center aligned column"> <a rel="learn-more" href="#">Learn more</a> </div> </div> </div>';
}
return __p;
};
exports['list']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='';
 if (loading === true) { 
__p+=' <div class="ui main container"> <div class="ui active centered inline loader"></div> </div> ';
 } else { 
__p+=' <div class="ui main container"> ';
 if (threads.length) { 
__p+=' <div class="ui cards"> ';
 _.each(threads, function(thread) { 
__p+=' <div class="card" id="'+
((__t=( thread._id ))==null?'':_.escape(__t))+
'"> <div class="content"> <div class="right floated meta"> '+
((__t=( thread.curr_score ))==null?'':_.escape(__t))+
' <i class="yellow star icon"></i> </div> <div class="header"> <h3 class="ui header"> ';
 if (thread.mark) { 
__p+='<i class="blue check circle icon" rel="mark-'+
((__t=( thread._id ))==null?'':_.escape(__t))+
'"></i> ';
 } else { 
__p+='<i class="grey inverted radio icon" rel="mark-'+
((__t=(thread._id ))==null?'':_.escape(__t))+
'"></i>';
 } 
__p+=' '+
((__t=( thread.name ))==null?'':_.escape(__t))+
' </h3> </div> <div class="description">'+
((__t=( thread.description ))==null?'':_.escape(__t))+
'</div> </div> <div class="content"> <div class="ui three mini statistics"> <div class="ui statistic"> <div class="value"><i class="yellow lightning icon"></i> '+
((__t=( thread.curr_streak ))==null?'':_.escape(__t))+
'</div> <div class="label">Current<br>Streak</div> </div> <div class="ui statistic"> <div class="value"><i class="yellow lightning icon"></i> '+
((__t=( thread.best_streak ))==null?'':_.escape(__t))+
'</div> <div class="label">Best<br>Streak</div> </div> <div class="ui statistic"> <div class="value"><i class="yellow star icon"></i> '+
((__t=( thread.best_score ))==null?'':_.escape(__t))+
'</div> <div class="label">High<br>Score</div> </div> </div> </div> <div class="content"> <div class="left floated"> <a href="#" rel="delete-'+
((__t=( thread._id ))==null?'':_.escape(__t))+
'">Delete</a> </div> <div class="right floated"> <a href="#" rel="edit-'+
((__t=( thread._id ))==null?'':_.escape(__t))+
'">Edit</a> </div> </div> </div> ';
 }); 
__p+=' </div> ';
 } else { 
__p+=' <p> Click <button class="ui mini circular icon button" style="margin: 0 2px"> <i class="add icon"></i> </button> to add a new Thread. </p> <p>Or, <a href="#" rel="learn-more">learn more</a>.</p> ';
 } 
__p+=' </div> <div class="add-button page-fixed"> <button class="ui massive circular icon button"> <i class="add icon"></i> <div class="shadow"></div> </button> </div> ';
 } 
__p+='';
}
return __p;
};
exports['login']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="header">Login</div> <div class="content"> <div class="ui form" id="login-form" action="/users/login" method="post"> <div class="field"> <label>Username</label> <div class="ui left icon input"> <input type="text" name="username" placeholder="Username"> <i class="user icon"></i> </div> </div> <div class="field"> <label>Password</label> <div class="ui left icon input"> <input type="password" name="password" placeholder="Password"> <i class="lock icon"></i> </div> </div> <div class="ui error message"></div> </div> </div> <div class="actions"> <div class="ui black deny button">Cancel</div> <div class="ui blue submit button">Login</div> </div>';
}
return __p;
};
exports['menu']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="ui container"> <a class="header item"> One </a> <div class="right menu"> ';
 if (user) { 
__p+=' <a rel="logout" class="ui item">Logout</a> ';
 } else { 
__p+=' <a rel="show-login" class="ui item">Login</a> ';
 } 
__p+=' </div> </div>';
}
return __p;
};
exports['signup']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="header">Sign Up</div> <div class="content"> <div class="ui form" id="signup-form" action="/users/signup" method="post"> <div class="field"> <label>Email</label> <div class="ui left icon input"> <input type="text" name="email" placeholder="Email"> <i class="mail icon"></i> </div> </div> <div class="field"> <label>Username</label> <div class="ui left icon input"> <input type="text" name="username" placeholder="Username"> <i class="user icon"></i> </div> </div> <div class="field"> <label>Password</label> <div class="ui left icon input"> <input type="password" name="password" placeholder="Password"> <i class="lock icon"></i> </div> </div> <div class="field"> <label>Confirm</label> <div class="ui left icon input"> <input type="password" name="confirm" placeholder="Password"> <i class="lock icon"></i> </div> </div> <div class="ui error message"></div> </div> </div> <div class="actions"> <div class="ui black deny button">Cancel</div> <div class="ui blue submit button">Sign Up</div> </div>';
}
return __p;
};