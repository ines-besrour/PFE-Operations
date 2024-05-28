import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PFE, PFEDocument } from '../Domains/pfe.schema';

@Injectable()
export class pfeService {
    constructor(@InjectModel(PFE.name) private pfeModel: Model<PFEDocument>) {}

    async create(createPFEDto: Partial<PFE>): Promise<PFE> {
    const createdPFE = new this.pfeModel(createPFEDto);
    return createdPFE.save();
    }

    async findAll(): Promise<PFE[]> {
    return this.pfeModel.find().populate('student').populate('entreprise').exec();
    }

    async findOne(id: string): Promise<PFE> {
    return this.pfeModel.findById(id).populate('student').populate('entreprise').exec();
    }

    async update(id: string, updatePFEDto: Partial<PFE>): Promise<PFE> {
    return this.pfeModel.findByIdAndUpdate(id, updatePFEDto, { new: true }).exec();
    }
    async remove(id: string): Promise<PFE> {
        return this.pfeModel.findByIdAndDelete(id).exec();
    }
}