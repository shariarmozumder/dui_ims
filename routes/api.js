const express= require("express");
const router = express.Router();
const {singnup} = require("../controllers/userController")


router.post("/signup",singnup);
router.get("/",(req,res)=>{
    res.status(200).json({
        success:"Welcome to ostad lms"
    })
})
module.exports = router;