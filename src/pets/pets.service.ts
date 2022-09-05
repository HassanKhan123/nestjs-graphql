import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find();
  }

  async createPet(createPetData: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetData);
    return this.petsRepository.save(newPet);
  }

  async findOne(id: number): Promise<Pet> {
    return this.petsRepository.findOneOrFail({ where: { id } });
  }
}
