const Closure = require("../models/Closure");


//@desc get all closoures
//@route GET /api/v1/closures
//@access Public

exports.getClosures = async (req, res, next) => {
    try {
        const closures = await Closure.find();

        return res.status(200).json({
            sucess: true,
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

exports.addClosure = async (req, res, next) => {
    try {
        const closure = await Closure.create(req.body);

        return res.status(200).json({
            sucess: true,
            data: closure
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Server Error'})
    };
};
