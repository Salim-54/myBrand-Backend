import { query } from 'express';
import Query from '../database/model/query.model';

exports.saveQuery  = async (req, res) => {

    try{
        const newQuery = await Query.create(req.body);
        res.status(201).json({
            status: 'Query was successfully created!',
            data: {
            query: newQuery
            }
        });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getAllQueries = async (req, res) => {
    const queries = await Query.find();
    res.status(200).json({
        status: 'success',
        results: queries.length, 
        data: {
            queries
        }
    });
};

exports.getQueryById = async (req, res) => {
    try{
        
        const query = await Query.findById(req.params.id);
        res.status(200).json({
            status: 'success', 
            data: {
                query
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
            });
        }
}




exports.deleteQueryById = async (req, res) => {
    try{
        
        const query = await Query.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success', 
            message : "Successfully deleted the query!!"
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
            });
        }
}

