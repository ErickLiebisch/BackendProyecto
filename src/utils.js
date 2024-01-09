import path from 'path';
import url from 'url';
const __filename= url.fileURLToPath(import.meta.url);
export const __dirname=path.dirname(__filename);
export const URL_BASE='http://localhost:8080'
export const URI= 'mongodb+srv://erickliebisch:roBR732GGbrXxw5J@cluster0.genvpqy.mongodb.net/'

export const buildResponsePaginated= (data) =>{
    return{
        status: 'success',
        payload: data.docs.map((doc)=>doc.toJSON()),
        totalPages: data.totalPages,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        page: data.page,
        hasPrevPage:data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevLink: data.hasPrevPage?`${URL_BASE}/api/products/?page=${data.prevPage}&limit=${data.limit}`: null,
        nextLink: data.hasNextPage?`${URL_BASE}/api/products/?page=${data.nextPage}&limit=${data.limit}`: null,
    }

    
}
export const buildResponsePaginatedV= (data) =>{
    return{
        status: 'success',
        payload: data.docs.map((doc)=>doc.toJSON()),
        totalPages: data.totalPages,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        page: data.page,
        hasPrevPage:data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevLink: data.hasPrevPage?`${URL_BASE}/products/?page=${data.prevPage}&limit=${data.limit}`: null,
        nextLink: data.hasNextPage?`${URL_BASE}/products/?page=${data.nextPage}&limit=${data.limit}`: null,
    }
}