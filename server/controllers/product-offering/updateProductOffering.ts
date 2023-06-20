import { ObjectId } from 'mongodb';
import {ProductOffering } from './../../models/productOffering';

export default async function updateProductOffering(req, res) {
    try{
    const { id } = req.params;
    const mongodbId = new ObjectId(id);
  const po = req.body;
    console.log(mongodbId);
    const newProduct = await ProductOffering.findByIdAndUpdate(mongodbId, po, { new: true });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(newProduct));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error });
      }
};