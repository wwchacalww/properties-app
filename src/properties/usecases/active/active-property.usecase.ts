import { PropertyRepository } from "../../repository/prisma/property.repository";

export class ActivePropertyUseCase {
  async execute(id: string) {
    const repository = new PropertyRepository();

    await repository.active(id);
  }
}
