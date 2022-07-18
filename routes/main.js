// The main.js file of your application
module.exports = function(app) {
  // GET Home page
  app.get("/",function(req, res){
    res.render("index.html")
  });

  app.get("/allLeaves", function (req, res) {
    let sqlquery = "SELECT Staff.Staff_name, Department.Department_name, Leave_Reason.reason, Leave_.date_requested, Leave_.start_date, Leave_.end_date, Leave_.status" +
                  " FROM Leave_" +
                  " JOIN Staff ON Leave_.Staff_id = Staff.Staff_id" +
                  " JOIN Department ON Staff.Dept_id = Department.Dept_id" +
                  " JOIN Leave_Reason ON Leave_.LR_id = Leave_Reason.LR_id";
                  // + " WHERE Staff_id = ?";

    db.query(sqlquery, (err, result) => {
      if (err) res.redirect("/");
      else {
        res.render("allLeaves.html", { availableLeaves: result });
      }
    });
  });

  app.get("/addLeave",function(req, res){
    res.render("addLeave.html")
  });
}