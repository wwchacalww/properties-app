import { PropertyRepository } from "../../repository/prisma/property.repository";

export class DesactivePropertyUseCase {
  async execute(id: string) {
    const repository = new PropertyRepository();

    await repository.desactive(id);
  }
}
