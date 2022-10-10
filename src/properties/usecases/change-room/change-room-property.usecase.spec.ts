import { Property } from "../../domain/entity/property";
import { prisma } from "../../../@shared/infra/db/prisma.client";
import { ChangeRoomPropertyUseCase } from "./change-room-property.usecase";
import { PropertyRepositoryInterface } from "properties/domain/repository/property.repository";
import { PropertyRepository } from "../../repository/prisma/property.repository";

describe("Change Room usecase test", () => {
  let usecase: ChangeRoomPropertyUseCase;
  let repository: PropertyRepositoryInterface;
  beforeEach(() => {
    usecase = new ChangeRoomPropertyUseCase();
    repository = new PropertyRepository();
  });
  it("should change room of property", async () => {
    const props = {
      description: "Description test",
      code: "234",
      room: "sala test",
      status: true,
      labeled: true,
      page: 13,
      line: 12,
    };
    const entity = new Property(props);
    await repository.add(entity);

    entity.room = "sala changed";

    await usecase.execute(entity.id, entity.room);

    let result = await prisma.properties.findFirst({
      where: { id: entity.id },
    });

    expect(result?.room).toEqual("sala changed");

    await prisma.properties.delete({
      where: { id: entity.id },
    });
  });
});
