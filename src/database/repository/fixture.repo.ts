import { Fixture, FixtureModel } from "../model/fixture.model";

async function createFixture(fixture: any) {
    return FixtureModel.create(fixture);
}

async function getAllFixtures():Promise<Fixture[]> {
    return FixtureModel.find().populate("home").populate("away");
}

async function findFixturesByParam(param:object): Promise<Fixture[]> {
    return FixtureModel.find(param).populate("home").populate("away");
}


async function updateFixtureParams(userDetails: object, value: object) {
    return FixtureModel.updateOne(userDetails, value, {
      new: true,
    });
}


const findOneFixtureById = async (_id:string):Promise<Fixture | null> => {
    return FixtureModel.findById(_id).populate("home").populate("away");
}

const deleteFixture = async (_id:string):Promise<Fixture | null> => {
    return FixtureModel.findOneAndDelete({_id:_id})
}

const fixtureSearch = async (param:string): Promise<Fixture[] | null> => {
    return FixtureModel.find({$or:[{status:{'$regex':param}}]}).populate("home").populate("away")
 }

export {createFixture, getAllFixtures, updateFixtureParams, findOneFixtureById, deleteFixture, findFixturesByParam, fixtureSearch}