import {
  inputListAllDTO,
  outputListAllDTO,
} from "properties/domain/repository/property.repository";
import { PropertyRepository } from "../../repository/prisma/property.repository";

export class ListAllPropertiesUseCases {
  async execute(input: inputListAllDTO): Promise<outputListAllDTO> {
    const repository = new PropertyRepository();
    const result = await repository.all(input);
    if (!result) {
      throw new Error("Sala não encontrada");
    }
    return result;
  }
}
