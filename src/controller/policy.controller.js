import mongoose from "mongoose";
import Policy from "../models/policy/policy.model.js";

//GET POLICY
export const getPolicy = async (req, res) => { 
    try {
      const appPolicy = await Policy.find() 
      res.json({
        data: appPolicy,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

//CREATE POLICY
export const createPolicy = async (req, res) => {
    const {dataPolicy} = req.body;
  
    const newPolicy = new Policy({
    dataPolicy
    });
  
    try {
      await newPolicy.save();
  
      res.status(201).json(newPolicy);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

  //UPDATE A POLICY
  export const updatePolicy = async (req, res) => {
    const { id } = req.params;
    const { dataPolicy} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Series with id: ${id}`);
  
    try {
      const updatedPolicy = await Policy.findByIdAndUpdate(id,
        { $set: { dataPolicy}}, 
        { new: true}
      );
  
      res.status(201).json({data: updatedPolicy, message:"Updated!"});
  
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
  };

  //DELETE A POLICY
  export const deletePolicy = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Policy with id: ${id}`);
    try {
     await Policy.findByIdAndRemove(id);

      res.status(200).json({ message: res.message});
    } catch (error) {
      res.status(409).json({ message: error.message });}   
};