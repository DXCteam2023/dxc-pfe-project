import { ObjectId } from 'mongodb';
import { ProductOffering } from './../../models/productOffering';
import { mongo } from 'mongoose';

export default async function getProductOfferingById(req, res) {
    
  res.setHeader('Content-Type', 'application/json')
    try{
    const {id} = req.params;
    // const mongodbId = new ObjectId(id);
    // console.log(mongodbId);
    const po = await ProductOffering.findOne({ id });
    res.status(200).send(JSON.stringify(po));
    }
    catch (error) {
        console.error(error);
        res.status(500).send(JSON.stringify({ ServerError: error }))
        throw new Error('Failed to fetch product offering by ID');
      }
}
