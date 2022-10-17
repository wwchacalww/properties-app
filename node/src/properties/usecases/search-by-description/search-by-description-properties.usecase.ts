import {
  inputSearchDTO,
  outputSearchDTO,
} from "../../domain/repository/property.repository";
import { PropertyRepository } from "../../repository/prisma/property.repository";

export class SearchByDescriptionPropertiesUseCase {
  async execute(input: inputSearchDTO): Promise<outputSearchDTO> {
    const repository = new PropertyRepository();

    const result = await repository.searchForDescription(input);

    if (!result) {
      throw new Error("Produto não encontrado");
    }

    return result;
  }
}
