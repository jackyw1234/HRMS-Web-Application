// The main.js file of your application
module.exports = function(app) {
    //GET Home page
    app.get("/",function(req, res){
    res.render("index.html")
    });
}