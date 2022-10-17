import {
  inputSearchDTO,
  outputSearchDTO,
} from "../../domain/repository/property.repository";
import { PropertyRepository } from "../../repository/prisma/property.repository";

export class ListByRoomPropertiesUseCase {
  async execute(input: inputSearchDTO): Promise<outputSearchDTO> {
    const repository = new PropertyRepository();

    const result = await repository.listForRoom(input);

    if (!result) {
      throw new Error("Sala não encontrada");
    }

    return result;
  }
}
