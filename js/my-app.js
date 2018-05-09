// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;


// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

       
  


 /*---------------------
 index page
--------------------- */ 
myApp.onPageInit('index', function (page) {
    myApp.showIndicator();
    var name =localStorage.name;
    var e =localStorage.email;
    var passions=localStorage.passions;
    $('.avatar').load('http://nigezie.tv/connect-360/app/avatar.php?e='+e)
    $('.profilename').html(name);
//    var temp = new Array();
//    temp = passions.split(",");
//    for (a in temp ) {
//        cat_id = parseInt(temp[a], 10);
//        
//    }
    var list='';
    $.ajax({
            url : 'http://nigezie.tv/connect-360/wp-json/wp/v2/posts',
            type: 'GET',
            dataType : "json",
            data:{catgories:passions}  
        })
        .done(function(data) {
            $.each(data,function(i,item){
                var featured_img_id='http://nigezie.tv/connect-360/wp-json/wp/v2/media/'+data[i].featured_media;
                $.getJSON(featured_img_id, function(result){
                   list='<div class="featured-item"><div class="thumb">\n\
                <img src="'+result.guid.rendered+'" alt=""></div><div class="overlay"></div><div class="caption">\n\
                <div class="issue"><span></span></div><h2><a href="single.html?post_id='+data[i].id+'" >'+data[i].title.rendered+'</a></h2></div>\n\
                </div>'; 
                $('.featured-slider').append(list);
                });
                
            }); 
            myApp.hideIndicator();
             
        })
        .error(function (data) {
        myapp.alert('Sorry, something is not working right. Kindly refresh');
                //alert(JSON.stringify(data));
                myApp.hideIndicator();
        });
});


/*---------------------
 post details
--------------------- */ 
myApp.onPageInit('single', function (page) {
    myApp.showIndicator();
    var post_id=page.query.post_id;
    $.ajax({
            url : 'http://nigezie.tv/connect-360/wp-json/wp/v2/posts/'+post_id,
            type: 'GET',
            dataType : "json",
            headers: {Authorization: 'Basic ...................'}   
        })
        .done(function(data) {
                $('.singletitle').text(data.title.rendered);
//                $('.date').text(data.date);
                $('.singlecontent').html(data.content.rendered)
                var featured_img_id='http://nigezie.tv/connect-360/wp-json/wp/v2/media/'+data.featured_media;
                $.getJSON(featured_img_id, function(result){
                    $('.singleimage').html('<img src="'+result.guid.rendered+'" width="100%"/>');
                });
                myApp.hideIndicator();
        })
        .error(function (data) {
               console.log(JSON.stringify(data));
                myApp.hideIndicator();
        });

});
 /*---------------------
 new
--------------------- */ 
myApp.onPageInit('new', function (page) {
    myApp.showIndicator();
    var name =localStorage.name;
    $('.profilename').html(name);
    getPosts(1,'#tab-1 .widget-box');
    getPosts(3,'#tab-2 .widget-box');
    getPosts(12,'#tab-3 .widget-box');
    getPosts(13,'#tab-4 .widget-box');
    getPosts(14,'#tab-5 .widget-box');
  
    
});
/*---------------------
 store
--------------------- */ 
myApp.onPageInit('store', function (page) {
    myApp.showIndicator();
    var name =localStorage.name;
    $('.profilename').html(name);
   getPosts(1,'#tab-1 .widget-box');
   getPosts(3,'#tab-2 .widget-box');
   getPosts(15,'#tab-3 .widget-box');
   getPosts(13,'#tab-4 .widget-box');
   getPosts(14,'#tab-5 .widget-box');
  
    
});
/*---------------------
 store
--------------------- */ 
myApp.onPageInit('gallery', function (page) {
    myApp.showIndicator();
    var name =localStorage.name;
    $('.profilename').html(name);
   getPosts(16,'#tab-1 .widget-box');
   getPosts(17,'#tab-2 .widget-box');
   getPosts(18,'#tab-3 .widget-box');

  
    
});

/*---------------------
 Chat Topic List
--------------------- */ 
myApp.onPageInit('chat', function (page) {
    
});
/*---------------------
 Chat Topic Comments
--------------------- */ 
myApp.onPageInit('chat-comments', function (page) {
  
});


 /*---------------------
passions
--------------------- */  
myApp.onPageInit('passions', function (page) {
    myApp.showIndicator();
    var list='';
    $.ajax({
    url : 'http://nigezie.tv/connect-360/wp-json/wp/v2/categories',
    type: 'GET',
    dataType : "json",
    data:{per_page:11,order_by:'id'},
    headers: {Authorization: 'Basic ..................................'}   
    })
    .done(function (data) {
        console.log(JSON.stringify(data));
        $.each(data,function(i,item){
            list+='<div class="inputbox no-border">\n\
                   <input type="checkbox" name="passions" value="'+data[i].id+'" class="passions"><label for="agree">'+data[i].name+'</label></div>'
        });
        $('.passion-list').html(list);
        $('.proceebtn').append('<a href="#" class="button active termbtn" onclick="getPassions()">Proceed</a>');
        myApp.hideIndicator();
    })
    .error(function (data) {
        myApp.alert(data.responseJSON.message);
        myApp.hideIndicator();
    });

});

(function ($) {
 "use strict";
  
})(jQuery);    

//Functions
function signIn(){}

function signUp(){}

//Terms Button
function checkBox(){
        $('.termbtn').show();
}

//Get Posts
function getPosts(cat_id,loc){
    myApp.showIndicator();
    $.ajax({
            url : 'http://nigezie.tv/connect-360/wp-json/wp/v2/posts',
            type: 'GET',
            dataType : "json",
            data:{catgories:cat_id},
            headers: {Authorization: 'Basic ..............................'}   
        })
        .done(function(data) {
            $.each(data,function(i,item){
                var featured_img_id='http://nigezie.tv/connect-360/wp-json/wp/v2/media/'+data[i].featured_media;
                $.getJSON(featured_img_id, function(result){
                   var list='<a href="single.html?post_id='+data[i].id+'" class="small-listing-item"><div class="entry-thumb"><img src="'+result.guid.rendered+'" alt=""></div>\n\
    <div class="entry-content"><h2>'+data[i].title.rendered+'</h2></div></a>';
                $(loc).append(list);
                });
                myApp.hideIndicator();
            }); 
            
             
        })
        .error(function (data) {
                //alert(JSON.stringify(data));
                myApp.hideIndicator();
        });
}
function addTopic(){
    
}
function addComment(){
    
}