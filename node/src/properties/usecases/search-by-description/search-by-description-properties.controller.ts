import { Response, Request } from "express";
import { SearchByDescriptionPropertiesUseCase } from "./search-by-description-properties.usecase";

export class SearchByDescriptionPropertiesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { term, filter, sort_dir, page, per_page } = request.query;

    const usecase = new SearchByDescriptionPropertiesUseCase();
    try {
      const properties = await usecase.execute({
        term: term?.toString() as string,
        filter: filter !== "code" && filter !== "description" ? "code" : filter,
        sort_dir: sort_dir !== "asc" && sort_dir !== "desc" ? "asc" : sort_dir,
        page: !page ? 1 : +page,
        per_page: !per_page ? 100 : +per_page,
      });
      return response.status(200).json(properties);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
