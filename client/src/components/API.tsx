import axios from "axios";
import { parse } from "path";
import { string } from "yup";

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3003/api' : 'http://api.daytech.blog/api';

export const postCategory = async ( values : { category_name: string,category_image: any }) => {
    try
    {
        return await axios.post('/category',values);
    }
    catch
    {
        return {error: "There was a Problem Posting Category"}
    }
}

export const getposts = async () => { 
    try
    {
        return await axios.get('/product');
    }
    catch
    {
        return {"error":"There was a Problem Fetching Data"}
    }
}

export const getSinglePost = async (params: number) => { 
    try
    {
        return await axios.get(`/product/${params}`);
    }
    catch
    {
        return {"error":"There was a Problem Fetching Data"}
    }
}

export const getRelatedCategory = async (params: number) => { 
    try
    {
        return await axios.get(`/relatedCategory/${params}`);
    }
    catch
    {
        return {"error":"There was a Problem Fetching Data"}
    }
}

export const getTrendingPost = async () => {
    try
    {
        return await axios.get(`/getTrendingPost`);
    }
    catch
    {
        return {"error":"There was a Problem Fetching Data"}
    }
}


export const getDashboardCategory = async () => {
    try
    {
        return await axios.get(`/category`);
    }
    catch
    {
        return {"error":"There was a Problem Fetching Data"}
    }
}

export const deleteDashboardCategory = async (categoryId: number) => {
    try {
        const response = await axios.delete(`/category?categoryId=${categoryId}`);
        return response;
    } catch (error) {
        console.error('Error deleting category:', error);
        return { "error": "There was a Problem Deleting Data" };
    }
};


export const dashboardtrending = async () => {
    try {
        const response = await axios.get(`/dashboardtrending `);
        return response;
    } catch (error) {
        console.error('Error deleting category:', error);
        return { "error": "There was a Problem Deleting Data" };
    }
}

export const addTrending = async (post_id: any) => {
    try {
        const response = await axios.post(`/trending `,post_id);
        return response;
    } catch (error) {
        console.error('Error deleting category:', error);
        return { "error": "There was a Problem Deleting Data" };
    }
}

export const deletetrending = async (trendingId: number) => {
    try {
        const response = await axios.delete(`/trending?trendingId=${trendingId}`);
        return response;
    } catch (error) {
        console.error('Error deleting category:', error);
        return { "error": "There was a Problem Deleting Data" };
    }
};

export const getdashboardTrending = async () => {
    try
    {
        return await axios.get(`/getdashboardtrending`);
    }
    catch
    {
        return {"error":"There was a Problem Fetching Data"}
    }
}

export const getCategory = async () => {
    try
    {
        return await axios.get(`/category`);
    }
    catch
    {
        return {"error":"There was a Problem Fetching Data"}
    }
}

export const addPosts = async (values: any) => {
    try
    {
        return await axios.post(`/product`, values);
    }
    catch
    {
        return {"error":"There was a Problem Fetching Data"}
    }
}


export const getDashboardPosts = async () => {
    try
    {
        return await axios.get(`/getdashboardposts`);
    }
    catch
    {
        return {"error":"There was a Problem Fetching Data"}
    }
}


export const deleteSinglePost = async (postId: any) => {
     try
    {
        return await axios.delete(`/product?postId=${postId}`);
    }
    catch
    {
        return {"error":"There was a Problem Fetching Data"}
    }   
}

export const login = async (values: any) => {
    try {
        return await axios.post(`/login`, values, {
            withCredentials: true
        });
    } catch {
        return { "error": "There was a Problem Fetching Data" };
    }   
}


export const destroy = async () => {
    try {
        return await axios.post(`/destroy`, {
            withCredentials: true
        });
    } catch {
        return { "error": "There was a Problem Fetching Data" };
    }   
}

export const verify = async () => {
    try {
        return await axios.get(`/verify`, {
            withCredentials: true
        });
    } catch {
        return { "error": "There was a Problem Fetching Data" };
    }   
}