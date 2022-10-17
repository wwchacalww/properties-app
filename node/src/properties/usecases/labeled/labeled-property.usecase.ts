import { PropertyRepository } from "../../repository/prisma/property.repository";

export class LabeledPropertyUseCase {
  async execute(id: string, labeled: boolean) {
    const repository = new PropertyRepository();

    await repository.labeled(id, labeled);
  }
}
