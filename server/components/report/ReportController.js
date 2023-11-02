const reportService = require('./ReportService');

const getAllServices = async ()=>{
    try{
        return await reportService.getAllServices();
    }catch(error){
        console.log("error reportService.getAllServices: "+error);
        throw error;
    }
}
const getAllDetails = async ()=>{
    try{
        return await productService.getAllDetails();
    }catch(error){
        console.log("error productController.getAllDetails: "+error);
        throw error;
    }
}
const deleteProductById =async(id)=>{
    try{
        return await productService.deleteProductById(id);
    }
    catch(error){
        console.log("error productController.deleteProductById: "+error);
        throw error;
    }
}
const addNewProduct =async(title,authorId,categoryId, description, image,createAt,updateAt )=>{
    try{
        return await productService.addNewProduct(title,authorId,categoryId, description, image,createAt,updateAt );
    }
    catch(error){
        console.log("error addNewProduct: "+error);
        throw error;
    }
}
const updateProduct = async (id,name,author,content,image,category,detail)=>{
    try {
        return await productService.updateProduct(id,name,author,content,image,category,detail);
    } catch (error) {
        console.log("updateProduct error: "+error);
        throw error;
    }
}
const getProductById = async(id)=>{
    try {
        return await productService.getProductById(id);
    } catch (error) {
        console.log("getProductById error: "+error);
        throw error;
    }
}


const search = async (keyword)=>{
    try {
        return await productService.search(keyword);
    } catch (error) {
        console.log("search error: "+error);
         
    }
}
module.exports={getAllServices, getAllDetails, getAllServices, getProductById, search, updateProduct, addNewProduct, deleteProductById};