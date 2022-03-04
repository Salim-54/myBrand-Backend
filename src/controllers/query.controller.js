import { query } from 'express';
import Query from '../database/model/query.model';

export const saveQuery  = async (req, res) => {
    const query = req.body;
    const newQuery = new Query(query);
    await newQuery.save();
    res.status(201).json({success: true, data: newQuery});
}

export const getAllQueries = async (req, res) => {
    const queries = await Query.find();
    res.status(200).json({success: true, data: queries})
}

