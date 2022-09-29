import { v4 as uuidV4 } from "uuid";

type property_props = {
  id?: string;
  description: string;
  code: string;
  room: string;
  labeled?: boolean;
  status: boolean;
  page: number;
  line: number;
};

export class Property {
  private _id: string;
  private _description: string;
  private _code: string;
  private _room: string;
  private _status: boolean;
  private _labeled: boolean;
  private _page: number;
  private _line: number;

  constructor(props: property_props) {
    this._id = props.id || uuidV4();
    this._description = props.description;
    this._code = props.code;
    this._room = props.room;
    this._status = props.status;
    this._labeled = props.labeled || false;
    this._page = props.page;
    this._line = props.line;
  }

  get id() {
    return this._id;
  }

  get description() {
    return this._description;
  }

  get code() {
    return this._code;
  }

  get room() {
    return this._room;
  }
  set room(room: string) {
    this._room = room;
  }

  get status() {
    return this._status;
  }
  active() {
    this._status = true;
  }
  desactive() {
    this._status = false;
  }

  get labeled() {
    return this._labeled;
  }
  set labeled(label: boolean) {
    this._labeled = label;
  }

  get page() {
    return this._page;
  }

  get line() {
    return this._line;
  }

  toJSON() {
    return {
      id: this._id,
      description: this._description,
      code: this._code,
      room: this._room,
      status: this._status,
      labeled: this._labeled,
      page: this._page,
      line: this._line,
    };
  }
}
