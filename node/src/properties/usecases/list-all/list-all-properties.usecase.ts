import { outputSearchDTO } from "properties/domain/repository/property.repository";
import { PropertyRepository } from "../../repository/prisma/property.repository";

export class ListAllPropertiesUseCases {
  async execute(): Promise<outputSearchDTO> {
    const repository = new PropertyRepository();
    const properties = await repository.all();
    return {
      properties,
      page: 1,
      page_start: 1,
      page_end: 1,
      per_page: 100,
      sort_dir: "asc",
      filter: "description",
      term: "",
      total: properties.length,
    };
  }
}
