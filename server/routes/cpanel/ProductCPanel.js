var express = require('express');
var router = express.Router();
const productController = require('../../components/products/ProductController');
const reportModel = require('../../components/report/ReportModel');




async function uploadFiles(path, filename) {

    // Upload the File
    const storage = await storageRef.upload(path, {
        public: true,
        destination: `/uploads/hashnode/${filename}`,
        metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
        }
    });
    return storage[0].metadata.mediaLink;
}






//localhost:3000/cpanel/product
router.get('/', async (req, res, next) => {

    //hien thi trang danh sach sp
    const reports = await reportModel.find({}).populate('userId', 'full_name').populate('admin', 'full_name');
    let modifiedReports = [];

    for (let i = 0; i < reports.length; i++) {
        let report = reports[i];
        
        if (report.admin == null) {
            console.log("admin null roi ong gia",i);
            report.admin = { full_name: "Chưa có ai tiếp nhận" };
        }
        
        modifiedReports.push(report);
    }
    
    console.log("new mang ne: ",modifiedReports);
    res.render('product/list', { reports });

});

router.get('/:id/delete', async (req, res, next) => {
    // hien thi trang danh sach sp
    try {
        const { id } = req.params;
        await reportModel.findByIdAndDelete(id);
        return res.json({ status: true })
    }
    catch (error) {
        return res.json({ status: false })
    }

});
// // router.get('/new', async (req, res, next) => {
// //     // hien thi add sp
// //     const categories = await categoryController.getAllCategories();
// //     res.render('product/new', { categories });

// // });
// // xu ly add sp
// router.post('/new', [uploadFile.single('image'),], async (req, res, next) => {
//     try {
//         let { body, file } = req;
//         if (file) {
//             // up image and get link image
//             let image = `http://${CONFIG.CONSTANTS.IP}:3000/images/${file.filename}`;
//             body = { ...body, image: image }
//         }
//         let { name, price, quantity, image, category } = body;
//         await productController
//             .addNewProduct(name, price, quantity, image, category);
//         return res.redirect('/cpanel/product');
//     } catch (error) {
//         console.log('Add new product error: ', error)
//         next(error);
//     }
// })
// // router.get('/testUploadImage', async (req, res, next) => {
// //     // hien thi add sp
// //     const categories = await categoryController.getAllCategories();
// //     const authors = await authorModel.find();
// //     res.render('product/new', { categories,authors });

// // });
// router.post('/testUploadImage', [uploadFile.single('image'),], async (req, res, next) => {
//     try {
//         let { body, file } = req;
//         let { title,authorId,categoryId, description,image,createAt,updateAt } = body;
//         await productController.addNewProduct(title,authorId,categoryId, description, image,createAt,updateAt );
//         return res.redirect('/cpanel/product');
//     } catch (error) {
//         console.log('Add new product error: ', error)
//         next(error);
//     }
// })
// //xu ly cap nhat sp
// router.post('/:id/edit', [uploadFile.single('image'),], async (req, res, next) => {
//     try {
//         let { body, file } = req;
//         let { id } = req.params;
//         if (file) {
//             let image = `http://${CONFIG.CONSTANTS.IP}:3000/images/${file.filename}`;
//             body = { ...body, image: image }
//         }
//         let { name, price, quantity, image, category } = body;
//         console.log(body);
//         await productController
//             .updateProduct(id, name, price, quantity, image, category);
//         return res.redirect('/cpanel/product');
//     } catch (error) {
//         console.log('Add new product error: ', error)
//         next(error);
//     }
// })

// // hien thi trang cap nhat sp /cpanel/product/:id/edit
// // router.get('/:id/edit', async (req, res, next) => {
// //     try {
// //         const { id } = req.params;
// //         const product = await productController.getProductById(id);
// //         const categories = await categoryController.getAllCategories();
// //         console.log(product);
// //         console.log(categories);
// //         for (let index = 0; index < categories.length; index++) {
// //             const element = categories[index];
// //             categories[index].selected = false;
// //             if (element._id.toString() == product.category.toString()) {
// //                 categories[index].selected = true;
// //             }
// //         }
// //         res.render('product/edit', { product, categories });
// //     } catch (error) {
// //         next(error);
// //     }
// // });

module.exports = router;