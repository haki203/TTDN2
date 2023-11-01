const reportModel = require('./ReportModel');
const getAllServices = async (size, page) => {
    // lay toan bo sp trong database
    // size =20 , page =4 ==> 61-80
    try {
        const reports =await reportModel.find()
        .populate('admin', 'full_name').populate('userId', 'full_name');
        return  reports ;
    } catch (error) {
        console.log("getAllServices error: " + error);
        throw error;
        return [];
    }

}
// const getAllDetails = async (size, page) => {
//     // lay toan bo sp trong database
//     // size =20 , page =4 ==> 61-80
//     try {
//         return await detailModel.find()
//     } catch (error) {
//         console.log("getAllProducts error: " + error);
//     }
//     return [];
// }
// const deleteProductById = async (id) => {

//     try {
//         await productModel.findByIdAndDelete(id);
//         return true;
//     }
//     catch (error) {
//         console.log("Delete product by ID error: " + error);
//         throw error;
//     }
//     return false;

// }
// const addNewProduct = async (title,authorId,categoryId, description, image,createAt,updateAt ) => {
//     try {
//         const newProduct = {
//             title,authorId,categoryId, description, image,createAt,updateAt 
//         }
//         await productModel.create(newProduct);
//         return true;
//     }
//     catch (error) {
//         console.log("addNewProduct error: " + error);
//         throw error;
//     }
//     return false;

// }
// //update sp
// const updateProduct = async (id, name, author, content, price, image, category) => {
//     try {
//         let item = await productModel.findById(id);
//         if (item) {
//             item.name = name ? name : item.name;
//             item.author = author ? author : item.author;
//             item.content = content ? content : item.content;
//             item.image = image ? image : item.image;
//             item.category = category ? category : item.category;
//             item.detail = detail ? detail : item.detail;
//             await item.save();
//             return true;
//         }
//     } catch (error) {
//         console.log('Update product error', error);

//     }
//     return false;
// }
// // lay thong tin sp theo id
// //
// const getProductById = async (id) => {
//     try {
//         let product = await productModel.findById(id).populate('category').populate('detail') // lay category;;
//         return product;
//     } catch (error) {
//         console.log('getProductById error', error);
//     }
//     return null;
// }
// const search = async (keyword) => {
//     try {
//         let query = {
//             //price:{$gt:1000,$lt:2000}, // gt:greater than, lt: less than  1000<price<2000
//             //quantity:{$lte:334},
//             //$or:[{quantity:{$lte:500},quantity:{$gt:100},}],
//             name: { $regex: keyword, $options: 'i' }, // ten sp ko phan biet chu hoa, chi can co ky tu do la dc
//             //name:keyword,  // tim kiem theo dung ten moi ra
//         }
//         let product = await productModel.find(query);
//         return product;
//     } catch (error) {
//         console.log('search error', error);
//     }
// }
module.exports = { getAllServices };
