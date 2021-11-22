import mongoose from "mongoose";
import Topic from "../models/faq/topic.model.js";
import QuesAndAns from "../models/faq/quesandans.model.js";

//TOPIC

//GET ALL TOPICS
export const getTopics = async (req, res) => { 
    try {
      const topics = await Topic.find() 
      res.json({
        data: topics,
        message: "OK"
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

//CREATE NEW TOPIC
export const createNewTopic = async (req, res) => {
    const {topicName} = req.body;
  
    const newTopic = new Topic({
        topicName
    });
  
    try {
      await newTopic.save();
  
      res.status(201).json(newTopic);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };


  //UPDATE A TOPIC
  export const updateTopic = async (req, res) => {
    const { id } = req.params;
    const { topicName} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Topic with id: ${id}`);
  
    try {
      const updatedTopic = await Topic.findByIdAndUpdate(id,
        { $set: { topicName}}, 
        { new: true}
      );
  
      res.status(201).json({data: updatedTopic, message:"Updated!"});
  
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
  };

  //DELETE A TOPIC
  export const deleteTopic = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Topic with id: ${id}`);
    try {
     await Topic.findByIdAndRemove(id);

      res.status(200).json({ message: `Deleted Topic with id: ${id}`});
    } catch (error) {
      res.status(409).json({ message: error.message });}   
};

//LIST QUESTION AND ANSWER

//CREATE A QUESTION AND ADD TO TOPIC BY TOPIC ID
export const addQuesAndAns = async (req, res) => {
  const {topicId} = req.params;
  const {question, answer} = req.body;
  if (!mongoose.Types.ObjectId.isValid(topicId))
    return res.status(404).send(`No Topic with id: ${topicId}`);

  const newQuesAndAns = new QuesAndAns({
    question, answer
  });

  try {
    const updatedTopic = await Topic.findByIdAndUpdate(topicId,
      { $push: { listQuestionAndAnswer: newQuesAndAns}}, 
        { new: true}
    );

    res.status(201).json({data: updatedTopic, message: `QuesAndAns added to Topic with id : ${topicId}`});
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


//REMOVE A QUESTION FROM lIST QUESTION OF A TOPIC
export const removeQuesAndAns = async (req, res) => {
  const {topicId, quesAndAnsId} = req.query;
  
  if (!mongoose.Types.ObjectId.isValid(topicId))
    return res.status(404).send(`No Topic with id: ${topicId}`);
  
  if (!mongoose.Types.ObjectId.isValid(quesAndAnsId))
    return res.status(404).send(`No Question with id: ${quesAndAnsId}`);

  try {
    const updatedTopic = await Topic.findByIdAndUpdate(topicId,
      { $pull: { listQuestionAndAnswer: {_id: quesAndAnsId} }},
      { new: true}
    );

    res.status(201).json({data: updatedTopic, message: "Question removed from Topic!"});
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//UPDATE A QUESTION IN lIST QUESTION OF A TOPIC

