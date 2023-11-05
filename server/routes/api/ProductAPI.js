var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const productModel = require('../../components/products/ProductModel');
const authorModel = require('../../components/products/AuthorModel');
const categoryModel = require('../../components/products/CategoryModel');

const productController = require('../../components/products/ProductController');
const UploadFile = require('../../middle/UploadFile');
const AuthorModel = require('../../components/products/AuthorModel');
//api/product
router.get('/', async (req, res, next) => {
    try {
        const product = await productController.getAllProducts();
        res.status(200).json({product,result:true});
    } catch (error) {
        res.status(400).json({});
    }
});
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await productController.getProductById(id);
        res.status(200).json({product,result:true});
    } catch (error) {
        res.status(400).json({});
    }
});
// get author by id
router.get('/author/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        console.log(id);
        const author = await authorModel.findById(id);
        res.status(200).json({author,result:true});
    } catch (error) {
        res.status(400).json({result:false,error});
    }
});
// get category
router.get('/category/getAlls', async (req, res, next) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).json({category,result:true});
    } catch (error) {
        res.status(400).json({});
    }
});
// get category by id
router.get('/category/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const category = await categoryModel.findById(id);
        res.status(200).json({category,result:true});
    } catch (error) {
        res.status(400).json({});
    }
});
// get all product by category
router.get('/get-by-category/:categoryId', async (req, res) => {
    try {
      const { categoryId } = req.params;
      // Truy vấn cơ sở dữ liệu để lấy các sản phẩm có categoryId tương ứng
      const product = await productModel.find({ categoryId });
        if(product){
            res.status(200).json({result:true,product});
        }
        else {
            res.status(400).json({result:false});
        }
    } catch (err) {
      res.status(500).json({ error: 'Đã có lỗi xảy ra' });
    }
  });
// add sp
router.post('/', async (req, res, next) => {

    try {
        const { name, price, quantity, image, category } = req.body;
        await productController.addNewProduct(name, price, quantity, image, category);
        res.status(200).json({ result: true });
    } catch (error) {
        res.status(400).json({ result: false });
    }
});
//api/product/search/name?keyword=iphone
router.get('/search/name', async (req, res, next) => {
    try {
        const {keyword} = req.query;
        console.log(keyword);
        const product = await productController.search(keyword);
        return res.status(200).json({product,result:true});
    } catch (error) {
        console.log("api search error: "+error);
        res.status(400).json({result:false});
    }
});
router.get('/relate/:id', async (req, res, next) => {
    const id = req.params;
    try {
        console.log(id);
        //const product = await productModel.find({ categoryId: categoryIdObjectId  }).exec();
        return res.status(200).json({product,result:true});
    } catch (error) {
        console.log("api search error: "+error);
        res.status(400).json({result:false});
    }
});
//upload hinh len sever
//api/product/upload
router.post('/upload',[UploadFile.single('image')] ,async (req, res, next) => {
    try {
        const {file} =req;
        if(!file){
            return res.status(400).json({result:false});
        }
        else{
            const url=`http://172.16.87.39:3000/images/${file.filename}`;
            return res.status(200).json({result:true,url}); 
        }
    } catch (error) {
        console.log("upload error: "+error);
        res.status(500).json({});
    }
});
//api/product/get-all-products
router.get('/get-all-products',[UploadFile.single('image')] ,async (req, res, next) => {
    try {
        const {file} =req;
        if(!file){
            return res.status(400).json({result:false});
        }
        else{
            const url=`http://172.16.87.39:3000/images/${file.filename}`;
            return res.status(200).json({result:true,url}); 
        }
    } catch (error) {
        console.log("upload error: "+error);
        res.status(500).json({});
    }
});
module.exports = router;