import { Model } from "objection";

class Tarefas extends Model {
  static get tableName() {
    return "tarefas";
  }

  static get idColumn() {
    return "id";
  }
}

export default Tarefas;
