import { Property } from "../../domain/entity/property";
import {
  inputCreateDTO,
  inputListAllDTO,
  inputSearchDTO,
  outputListAllDTO,
  outputSearchDTO,
  PropertyRepositoryInterface,
} from "../../domain/repository/property.repository";
import { prisma } from "../../../@shared/infra/db/prisma.client";

export class PropertyRepository implements PropertyRepositoryInterface {
  async add(property: Property): Promise<void> {
    await prisma.properties.create({
      data: property.toJSON(),
    });
  }

  async import(properties: inputCreateDTO[]): Promise<void> {
    properties.forEach(async (property) => {
      await prisma.properties.create({
        data: property,
      });
    });
  }

  async all(input: inputListAllDTO): Promise<void | outputListAllDTO> {
    const {
      filter = "code",
      page = 1,
      per_page = 100,
      sort_dir = "asc",
    } = input;

    const skip = page * per_page - per_page;
    const take = per_page;
    let orderBy = {};

    if (filter === "description") {
      orderBy = {
        description: sort_dir,
      };
    } else {
      orderBy = {
        code: sort_dir,
      };
    }

    const results = await prisma.$transaction([
      prisma.properties.count(),
      prisma.properties.findMany({
        skip,
        take,
        orderBy,
      }),
    ]);

    if (results[1].length > 0) {
      const properties = results[1].map((property) => {
        const { id, description, code, status, labeled, room, line, page } =
          property;
        return new Property({
          id,
          description,
          code,
          status,
          labeled,
          room,
          line,
          page,
        });
      });
      const total = results[0];
      return {
        properties,
        filter,
        page,
        per_page,
        page_start: 1,
        page_end: Math.ceil(total / per_page),
        sort_dir,
        total,
      };
    }
  }

  async changeRoom(id: string, room: string): Promise<void> {
    await prisma.properties.update({
      where: { id },
      data: {
        room,
      },
    });
  }

  async active(id: string): Promise<void> {
    await prisma.properties.update({
      where: { id: id },
      data: {
        status: true,
      },
    });
  }

  async desactive(id: string): Promise<void> {
    await prisma.properties.update({
      where: { id: id },
      data: {
        status: false,
      },
    });
  }

  async labeled(id: string, labeled: boolean): Promise<void> {
    await prisma.properties.update({
      where: { id },
      data: {
        labeled,
      },
    });
  }

  async listForRoom(input: inputSearchDTO): Promise<void | outputSearchDTO> {
    const {
      term,
      filter = "description",
      page = 1,
      per_page = 10,
      sort_dir = "asc",
    } = input;

    const skip = page * per_page - per_page;
    const take = per_page;
    let orderBy = {};

    if (filter === "description") {
      orderBy = {
        description: sort_dir,
      };
    } else {
      orderBy = {
        code: sort_dir,
      };
    }

    const results = await prisma.$transaction([
      prisma.properties.count({
        where: {
          room: {
            contains: term,
          },
        },
      }),
      prisma.properties.findMany({
        skip,
        take,
        where: {
          room: {
            contains: term,
          },
        },
        orderBy,
      }),
    ]);

    if (results[1].length > 0) {
      const properties = results[1].map((property) => {
        const { id, description, code, status, labeled, room, line, page } =
          property;
        return new Property({
          id,
          description,
          code,
          status,
          labeled,
          room,
          line,
          page,
        });
      });
      const total = results[0];
      return {
        properties,
        term,
        filter,
        page,
        per_page,
        page_start: 1,
        page_end: Math.ceil(total / per_page),
        sort_dir,
        total,
      };
    }
  }

  async searchForDescription(
    input: inputSearchDTO
  ): Promise<void | outputSearchDTO> {
    const {
      term,
      filter = "description",
      page = 1,
      per_page = 10,
      sort_dir = "asc",
    } = input;

    const skip = page * per_page - per_page;
    const take = per_page;
    let orderBy = {};

    if (filter === "description") {
      orderBy = {
        description: sort_dir,
      };
    } else {
      orderBy = {
        code: sort_dir,
      };
    }

    const results = await prisma.$transaction([
      prisma.properties.count({
        where: {
          description: {
            contains: term,
          },
        },
      }),
      prisma.properties.findMany({
        skip,
        take,
        where: {
          description: {
            contains: term,
          },
        },
        orderBy,
      }),
    ]);

    if (results[1].length > 0) {
      const properties = results[1].map((property) => {
        const { id, description, code, status, labeled, room, line, page } =
          property;
        return new Property({
          id,
          description,
          code,
          status,
          labeled,
          room,
          line,
          page,
        });
      });
      const total = results[0];
      return {
        properties,
        term,
        filter,
        page,
        per_page,
        page_start: 1,
        page_end: Math.ceil(total / per_page),
        sort_dir,
        total,
      };
    }
  }
}
