var express = require('express');
var router = express.Router();
const moment = require('moment'); // Import thư viện moment
const mongoose = require('mongoose');
const productModel = require('../../components/products/ProductModel');
const authorModel = require('../../components/products/AuthorModel');
const commentModel = require('../../components/products/CommentModel');
const categoryModel = require('../../components/products/CategoryModel');
const productController = require('../../components/products/ProductController');
const UploadFile = require('../../middle/UploadFile');
const favouriteModel = require('../../components/products/FavouriteModel');
const userModel = require('../../components/users/UserModel');
//api/product
router.get('/', async (req, res, next) => {
    try {
        const product = await productController.getAllProducts();
        res.status(200).json({ product, result: true });
    } catch (error) {
        res.status(400).json({});
    }
});
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await productController.getProductById(id);
        res.status(200).json({ product, result: true });
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
        res.status(200).json({ author, result: true });
    } catch (error) {
        res.status(400).json({ result: false, error });
    }
});
//add favourite
router.post('/favourite/new', async (req, res, next) => {
    const { idUser, idBook } = req.body;
    try {
        if (!idUser || !idBook) {
            return res.status(400).json({ result: false, message: "Thieu thong tin" });
        }
        else {
            const allFavourites = await favouriteModel.find({});
            for (let i = 0; i < allFavourites.length; i++) {
                if (allFavourites[i].bookId == idBook && allFavourites[i].userId == idUser) {
                    const favouriteDelete = await favouriteModel.findByIdAndDelete(allFavourites[i]._id);
                    if (favouriteDelete) {
                        console.log(allFavourites[i]._id);
                        return res.status(200).json({ message: "huy yeu thich thanh cong", result: true });
                    }
                }
            }
            const fa = { bookId: idBook, userId: idUser }
            const favourite = await favouriteModel.create(fa);
            if (favourite) {
                return res.status(200).json({ result: true, message: "yeu thich thanh cong" });
            } else {
                return res.status(400).json({ result: false });
            }
        }
    } catch (error) {
        return res.status(400).json({ result: false, error });
    }
});
// get all favourite by id user
router.get('/favourite/get-book-by-user', async (req, res, next) => {
    const { idUser } = req.body;
    try {
        if (!idUser) {
            return res.status(400).json({ result: false, message: "Thieu thong tin" });
        }
        else {
            const userFavourites = await favouriteModel.find({ userId: idUser });
            if (userFavourites.length>0) {
                let books = [];
                for (let i = 0; i < userFavourites.length; i++) {
                    const booksNe = await productModel.findById(userFavourites[i].bookId);
                    books.push(booksNe);
                }
                return res.status(200).json({ result: true,books});
            } else {
                return res.status(400).json({ result: false });
            }
        }
    } catch (error) {
        return res.status(400).json({ result: false, error });
    }
});
// get category
router.get('/category/getAlls', async (req, res, next) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).json({ category, result: true });
    } catch (error) {
        res.status(400).json({});
    }
});
// get category by id
router.get('/category/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const category = await categoryModel.findById(id);
        res.status(200).json({ category, result: true });
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
        if (product) {
            res.status(200).json({ result: true, product });
        }
        else {
            res.status(400).json({ result: false });
        }
    } catch (err) {
        res.status(500).json({ error: 'Đã có lỗi xảy ra' });
    }
});
router.post('/comment/new', async (req, res) => {
    try {
        const { userId, bookId, title, content, rate } = req.body;
        const time = moment().format('hh:mm A');
        const date = moment().format('DD/MM/YYYY');
        if (!userId || !bookId || !title || !content || !rate) {
            res.status(444).json({ result: false, message: "Thiếu thông tin" });
        } else {
            const newCmt = {
                time: time,
                userId: userId,
                bookId: bookId,
                content: content,
                rate: rate,
                date: date,
                title: title,
            };

            const comment = await commentModel.create(newCmt);
            if (comment) {
                res.status(200).json({ result: true, comment });
            }
            else {
                res.status(400).json({ result: false });
            }
        }
    } catch (err) {
        res.status(500).json({ result: false, error: 'Đã có lỗi xảy ra' + err });
    }
});
router.get('/comment/get-by-id/:bookId', async (req, res, next) => {
    try {
        const { bookId } = req.params;
        const comment = await commentModel.find({});
        let comments = [];
        if (comment) {
            for (let i = 0; i < comment.length; i++) {
                if (comment[i].bookId.toString() == bookId) {
                    const book = await productModel.findById(comment[i].bookId);
                    const user = await userModel.findById(comment[i].userId);
                    let cmt = {
                        _id: comment[i]._id,
                        time: comment[i].time,
                        user: user,
                        book: book,
                        content: comment[i].content,
                        title: comment[i].title,
                        likeBy: comment[i].likeBy,
                        date: comment[i].date,
                        rate: comment[i].rate,
                    }
                    comments.push(cmt);
                }
                else {
                }
            }
            return res.status(200).json({ comments, result: true });
        } else {
            res.status(400).json({ result: false });
        }

    } catch (error) {
        console.log("api search error: " + error);
        res.status(400).json({ result: false });
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
        const { keyword } = req.query;
        console.log(keyword);
        const product = await productController.search(keyword);
        return res.status(200).json({ product, result: true });
    } catch (error) {
        console.log("api search error: " + error);
        res.status(400).json({ result: false });
    }
});
router.get('/relate/:id', async (req, res, next) => {
    const id = req.params;
    try {
        console.log(id);
        //const product = await productModel.find({ categoryId: categoryIdObjectId  }).exec();
        return res.status(200).json({ product, result: true });
    } catch (error) {
        console.log("api search error: " + error);
        res.status(400).json({ result: false });
    }
});
//upload hinh len sever
//api/product/upload
router.post('/upload', [UploadFile.single('image')], async (req, res, next) => {
    try {
        const { file } = req;
        if (!file) {
            return res.status(400).json({ result: false });
        }
        else {
            const url = `http://172.16.87.39:3000/images/${file.filename}`;
            return res.status(200).json({ result: true, url });
        }
    } catch (error) {
        console.log("upload error: " + error);
        res.status(500).json({});
    }
});
//api/product/get-all-products
router.get('/get-all-products', [UploadFile.single('image')], async (req, res, next) => {
    try {
        const { file } = req;
        if (!file) {
            return res.status(400).json({ result: false });
        }
        else {
            const url = `http://172.16.87.39:3000/images/${file.filename}`;
            return res.status(200).json({ result: true, url });
        }
    } catch (error) {
        console.log("upload error: " + error);
        res.status(500).json({});
    }
});
module.exports = router;