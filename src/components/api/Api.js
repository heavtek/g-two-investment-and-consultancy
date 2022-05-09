import React  from "react";
import axios from 'axios'
import {toast} from 'react-toastify';

export const getAllData = async (endpoint) =>{
 try {
  const response = await axios.get(`${process.env.REACT_APP_DB_SERVER_URL}${endpoint}`);
     return response.data;
 }catch(e){
     toast.error("Something Went Wrong!!")
     return e;
 }
}

export const postData = async (endpoint,data) =>{
    try {
        const response = await axios.post(`${process.env.REACT_APP_DB_SERVER_URL}${endpoint}`,data);
        toast.success("Recrd Added Successfully!!")
        return response.data;

    } catch (error) {
     toast.error("Something Went Wrong!!")
       
        return error;
    }
}

export const updateData = async (endpoint,data,id) =>{
    try {
     const response = await axios.put(`${process.env.REACT_APP_DB_SERVER_URL}${endpoint}/${id}`,data);
      toast.success("Record Updated Successfully");   
     return response.data;
    }catch(e){
     toast.error("Something Went Wrong!!")
       
        return e;
    }
   }
   
export const getSingleData = async (endpoint,id) =>{
    try {
     const response = await axios.get(`${process.env.REACT_APP_DB_SERVER_URL}${endpoint}/${id}`);
        return response.data;
    }catch(e){
     toast.error("Something Went Wrong!!")
     return e;
    }
   }
   


   
export const deleteData = async (endpoint,id) =>{
    try {
     const response = await axios.delete(`${process.env.REACT_APP_DB_SERVER_URL}${endpoint}/${id}`);
     toast.success("Record Deleted Successfully!!");
     return response.data;
    }catch(e){
        toast.error("Something Went Wrong!!")
        return e;
    }
   }