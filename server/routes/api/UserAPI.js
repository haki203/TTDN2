var express = require('express');
var router = express.Router();
const userController = require('../../components/users/UserController');
const validation = require('../../middle/Validation');
const jwt = require('jsonwebtoken');
const userModel = require('../../components/users/UserModel');
const adminModel = require('../../components/users/AdminModel');
const typeModel = require('../../components/report/TypeModel');
const { authenApp } = require('../../middle/Authen');
//api login
// r
// Kiểm tra email và trả về user hoặc tạo mới user
router.get('/login-google/:email', async (req, res) => {
    try {
      const { email } = req.params;
      // Kiểm tra xem email đã tồn tại trong MongoDB chưa
      let user = await userModel.findOne({ email });
      if (!user) {
        // Nếu email chưa tồn tại, tạo mới user với email và các trường khác là null
        user = await userModel.create({ email });
      }
      res.status(200).json({ result: true, user: user});
    } catch (error) {
      res.status(500).json({result:false, message: 'Internal Server Error'+error });
    }
  });
router.post('/login', async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userController.login(email);
        console.log(user);
        if (user) {
            // tao token
            const token = jwt.sign({ user }, 'secret', { expiresIn: '1h' });
            return res.status(200).json({ result: true, user: user, token: token });
        }
        else {
            return res.status(202).json({ result: false, message: "Email doesn't exist" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ result: false });
    }
});
router.get('/logout', async (req, res, next) => {
    try {
        req.session.destroy;
        let data = {
            logout: true,
            responeTimestamp: new Date(),
            statusCode: 200,

        }
        res.status(200).json({ result: true, data });

    } catch (error) {
        console.log(error);
        res.status(400).json({ result: false });
    }
});
//api register
// api/user/register
router.post('/register', [validation.checkRegister], async (req, res, next) => {
    try {

        const { email, password, name } = req.body;
        const result = await userController.register(email, password, name);
        let data = {
            error: false,
            responeTimestamp: new Date(),
            statusCode: 200,
            result,
        }
        if(result==true){
            return res.status(200).json({ result: true, data });
        }
        else{
            return res.status(401).json({ result: false, data });
        }
    } catch (error) {
        console.log(error);
        //next error; Chi chay web
        return res.status(4000).json({ result: false });
    }
});
router.post('/changepass/', async (req, res, next) => {
    try {
        const { _id, new_password } = req.body;
        console.log("API truoc: ", _id, new_password);
        const kq = await userController.changepass(_id, new_password);
        let data = {
            error: false,
            responeTimestamp: new Date(),
            statusCode: 200,
            kq,
        }
        if (kq == null) {
            return res.status(409).json({ result: false, messenger: "doi mat khau ko thanh cong" });
        }
        else {
            return res.status(200).json({ result: true, data, messenger: "doi mat khau thanh cong" });
        }



    } catch (error) {
        console.log(error);
        //next error; Chi chay web
        return res.status(400).json({ result: false, messenger: "Ko doi duoc mat khau" });
    }
});
router.get('/findUser/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (user == null) {
            return res.status(200).json({ result: false });
        }
        else {
            return res.status(200).json({ result: true, user });
        }
    } catch (error) {
        console.log(error);
        //next error; Chi chay web
        return res.status(400).json({ result: false});
    }
});
// get all admin
router.get('/admin', async (req, res, next) => {
    try {
        const admin = await adminModel.find({});
        if(admin){
            res.status(200).json({admin,result:true});
        }
        else{
            res.status(400).json({result:false});
        }
    } catch (error) {
        res.status(400).json({result:false});
    }
});
// get category
router.get('/category', async (req, res, next) => {
    try {
        const category = await typeModel.find({});
        if (category) {
            res.status(200).json({ category, result: true });
        }
        else {
            res.status(400).json({ result: false, message: "không có danh mục nào" });
        }
    } catch (error) {
        res.status(400).json({ result: false});
    }
});
// get user by id
router.get('/admin/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const admin = await adminModel.findById(id);
        if(admin){
            res.status(200).json({admin,result:true});
        }
        else{
            res.status(400).json({result:false});
        }
    } catch (error) {
        res.status(400).json({result:false});
    }
});

// api gui mail
// api/user/sendmail
router.post('/sendmail', async (req, res, next) => {
    try {
        let { email, subject } = req.body;
        let content = subject;
        subject = "Book App"
        const send = await userController.sendMail(email, subject, content);
        return res.status(200).json({ send, result: true });

    } catch (error) {
        console.log("sendmail error", error);
        return res.status(500).json({ result: false });
    }
})
module.exports = router;