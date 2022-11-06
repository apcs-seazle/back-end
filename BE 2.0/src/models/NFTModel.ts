import mongoose , {Document, Schema} from "mongoose";

export interface INFT
{
    name : string;
    image: string;
    description: string;
    network: string;
    id: number;
    price: string;
    ownAddress: string;
}

export interface INFTModel extends INFT, Document{
    id: number
};

const NFTSchema: Schema = new Schema(
    {
        name : {type : String, required: true},
        image : {type : String, required: true},
        descriptions : {type : String, required: false},
        network : {type : String, required: true},
        id : {type : Number, required: true},
        price : {type : String, required: true},
        ownAddress : {type : String, required: true}
    },
    {
        versionKey: false
    }
);

export default mongoose.model<INFTModel>('NFT', NFTSchema);