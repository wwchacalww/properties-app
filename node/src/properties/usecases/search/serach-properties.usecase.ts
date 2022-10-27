import { PropertyRepository } from "../../repository/prisma/property.repository";

export class SearchPropertiesUsecase {
  async execute(term: string) {
    const repository = new PropertyRepository();
    return await repository.search(term);
  }
}
