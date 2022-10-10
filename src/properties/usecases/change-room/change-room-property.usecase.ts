import { PropertyRepository } from "../../repository/prisma/property.repository";

export class ChangeRoomPropertyUseCase {
  async execute(id: string, room: string) {
    const repository = new PropertyRepository();

    await repository.changeRoom(id, room);
  }
}
