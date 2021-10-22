const Closure = require("../models/Closure");


//@desc get all closoures
//@route GET /api/v1/closures
//@access Public

exports.getClosures_GET = async (req, res, next) => {
    try {
        const closures = await Closure.find();

        return res.status(200).json({
            success: true,
            count: closures.length,
            data: closures
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Server Error'})
    };
};

//@desc create a closoure
//@route POST /api/v1/closures
//@access Public

exports.addClosure_POST = async (req, res) => {
    try{
        const newClosure = await Closure.create(req.body);
       
        return res.status(200).json({
            success: true,
            data: newClosure
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Server Error'})
    };
};

//@desc delete all closure
//@route DELETE /api/v1/closures
//@access Public

exports.destroy_DELETE = (req, res, next)=> {
    Closure.remove({}, function (err){
        if (err) {
            console.log(err)
        } else {
            res.end('success')
        }
    });
};

// get closures by PIC
exports.filter_PIC_POST = (req, res, next) => {
    var PIC= req.body.ProjectOfficer;
    Taxiway.find({ProjectOfficer: PIC})
        .then((closure) => res.json (closure))
        .catch((err) => res.status(404).json({noClosure: "No Closure Found"}))
};

// get closures by start date
exports.filter_date_POST = (req, res, next)=> {
    var date= req.body.DateofClosure;
    Taxiway.find({DateofClosure: date})
        .then((closure) => res.json (closure))
        .catch((err) => res.status(404).json({noClosure: "No Closure Found"}));
};

// edit closures by title
exports.editClosure_POST = (req, res, next)=> {
    var newData = {
        ProjectOfficer: req.body.ProjectOfficer,
        Company: req.body.Company,
        Contacts: req.body.Contacts,
        Callsign: req.body.Callsign,
        Description: req.body.Description,
        StarteofClosure: req.body.StarteofClosure,
        EndofClosure: req.body.EndofClosure,
        Type: req.body.Type,
        Remarks: req.body.Remarks,
        location: req.body.location,
    };
    Taxiway.findOneAndUpdate(
        {Title: req.body.Title},
        {$set: newData},
        {new:true}
    )
        .then((closure) => res.json(closure))
        .catch((err) => console.log(err));
};