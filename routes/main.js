// The main.js file of your application
module.exports = function(app) {
    
    app.get("/",function(req, res) {
        //Use this if else statement to check if user is still logged in 
        if (req.session.userid)
            res.render("index.html");
        else
            res.render("login.html");
    }); 

    app.post('/login', (req, res) => {
        //Check if there is staff with same username and password in database
        let sqlquery = "SELECT * FROM staff WHERE username = ? AND password = ?";
        let record = [req.body.E_id, req.body.password];
        db.query(sqlquery, record, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect("/");               
            }
            else {
                //Check if there is anything in result
                if (result.length != 0) {
                    session = req.session;
                    session.userid = req.body.E_id;
                    res.render("index.html");
                }
                else {
                    res.render("login.html"/*, {error: "Incorrect username or password"}*/);
                }
            }
        });
    })

    app.get("/login",function(req, res) {
        if (req.session.userid)
            res.render("index.html");
        else
            res.render("login.html");
    });

    //Remove session when logging out
    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/');
    });

    app.get("/homepage",function(req, res) {
        if (req.session.userid)
            res.render("homepage.html");
        else
            res.render("login.html");
        
    });

    app.get("/allLeaves", function (req, res) {
        if (req.session.userid) {
            let sqlquery = "SELECT Staff.Staff_name, Department.Department_name, Leave_Reason.reason, Leave_.date_requested, Leave_.start_date, Leave_.end_date, Leave_.status" +
                            " FROM Leave_" +
                            " JOIN Staff ON Leave_.Staff_id = Staff.Staff_id" +
                            " JOIN Department ON Staff.Dept_id = Department.Dept_id" +
                            " JOIN Leave_Reason ON Leave_.LR_id = Leave_Reason.LR_id" +
                            " WHERE Staff_name = 'John Tan'";

            db.query(sqlquery, (err, result) => {
                if (err) res.redirect("/");
                else {
                    res.render("allLeaves.html", { availableLeaves: result });
                }
            });
        }
        else
            res.render("login.html");
    });

    app.get("/addLeave",function(req, res) {
        if (req.session.userid)
            res.render("addLeave.html");
        else
            res.render("login.html");
    });

    app.post("/addLeave", function (req, res) {
        // leave_id (auto), Staff_id, LR_id, date_requested, start_date, end_date, status (pending by default)
        let sqlquery = "INSERT INTO Leave_ (Staff_id, LR_id, date_requested, start_date, end_date, status)" +
                        " VALUES (2,?,?,?,?,'Pending')";
        let temprecord = [req.body.requestreason, req.body.requestdate, req.body.startdate, req.body.enddate]
        // let newrecord = [req.body.name, req.body.department, req.body.requestdate, req.body.requestreason, req.body.startdate, req.body.enddate];

        // execute sql query
        db.query(sqlquery, temprecord, (err, result) => {
            if (err) {
            console.log(err);
            res.redirect("/addLeave");
            } 
            else {
            res.redirect("/allLeaves");
            }
        });
    })
}