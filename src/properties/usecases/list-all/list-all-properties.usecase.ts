import { OutputProperty } from "../../dtos";
import { PropertyRepository } from "../../repository/prisma/property.repository";

export class ListAllPropertiesUseCases {
  async execute(): Promise<OutputProperty[]> {
    const repository = new PropertyRepository();
    const list = await repository.all();
    return list.map((property) => {
      const { id, description, code, status, room, page, line, labeled } =
        property;
      return {
        id,
        code,
        description,
        room,
        status: status ? "encontrado" : "não encontrado",
        page,
        line,
        labeled: labeled ? "etiquetado" : "não etiquetado",
      };
    });
  }
}
