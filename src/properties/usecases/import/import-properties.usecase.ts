import fs from "fs";
import { Property } from "../../domain/entity/property";
import { inputCreateDTO } from "../../domain/repository/property.repository";
import { PropertyRepository } from "../../repository/prisma/property.repository";
import readline from "readline";

export class ImportPropertiesUseCase {
  async execute(pathFile: string) {
    const repository = new PropertyRepository();
    const readStream = fs.createReadStream(pathFile);

    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });

    const lines: string[] = [];
    for await (const line of rl) {
      lines.push(line);
    }

    const properties: inputCreateDTO[] = [];

    lines.forEach((line, index) => {
      if (index > 0) {
        const split = line.split(";");
        if (split.length !== 7) {
          throw Error(`Error in line ${index}`);
        }
        properties.push(
          new Property({
            code: split[0],
            description: split[1],
            room: split[2],
            status: split[3] === "true" ? true : false,
            page: Number(split[4]),
            line: Number(split[5]),
            labeled: split[6] === "true" ? true : false,
          }).toJSON()
        );
      }
    });

    await repository.import(properties);

    return properties;
  }
}
