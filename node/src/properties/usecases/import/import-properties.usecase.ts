import fs from "fs";
import events from "events";
import { Property } from "../../domain/entity/property";
import { inputCreateDTO } from "../../domain/repository/property.repository";
import { PropertyRepository } from "../../repository/prisma/property.repository";
import readline from "readline";

export class ImportPropertiesUseCase {
  async loadPropertiesFile(pathFile: string) {
    const allFileContents = fs.readFileSync(pathFile, "utf-8");
    const properties: inputCreateDTO[] = [];

    const lines = allFileContents.split(/\r?\n/);
    const last = lines.length - 1;
    console.log(last);
    lines.forEach((line, index) => {
      if (index > 0 && index < last) {
        const split = line.split(";");
        if (split.length !== 6) {
          throw new Error(`Error in line ${index}`);
        }
        properties.push(
          new Property({
            code: split[0],
            description: split[1],
            room: split[2],
            status: split[3] === "1" ? true : false,
            page: Number(split[4]),
            line: Number(split[5]),
          }).toJSON()
        );
      }
    });
    return properties;
  }

  async loadTest(pathFile: string): Promise<Property[]> {
    try {
      const rl = readline.createInterface({
        input: fs.createReadStream(pathFile),
        crlfDelay: Infinity,
      });

      const properties: Property[] = [];

      let index = 0;
      rl.on("line", (line) => {
        if (index > 0) {
          const split = line.split(";");
          if (split.length !== 6) {
            throw new Error(`Error in line ${index}`);
          }
          properties.push(
            new Property({
              code: split[0],
              description: split[1],
              room: split[2],
              status: split[3] === "1" ? true : false,
              page: Number(split[4]),
              line: Number(split[5]),
            })
          );
        }
        index++;
      });

      await events.once(rl, "close");
      return properties;
    } catch (err) {
      throw new Error("Não foi possível ler o arquivo");
    }
  }

  async execute(pathFile: string) {
    const repository = new PropertyRepository();

    const properties = await this.loadTest(pathFile);
    // const properties = await this.loadPropertiesFile(pathFile);
    // await repository.import(properties);
    await Promise.all(
      properties.map(async (property) => {
        await repository.add(property);
      })
    );

    return properties;
  }
}
