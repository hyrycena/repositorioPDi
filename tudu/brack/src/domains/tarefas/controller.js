import Tarefas from "./models";
import { preconditionFailedError } from "../../http/preconditionalFailedError";

async function get(req, res, next) {
  try {
    const tarefas = await Tarefas.query();
    
    if (!tarefas) {
      return ('tarefas nao encontradas', res);
    }

    res.json(tarefas);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const { params } = req;
    const taskId = params.id;

    const tasksById = await Tarefas.query().findById(taskId);
    if (!tasksById) {
      return ('tarefas nao encontradas', res);
    }

    res.json(tasksById);
  } catch (err) {
    next(err);
  }
}


async function post(req, res, next) {
  try {
    const { name, descricao } = req.body;

    if (!name || !descricao) {
      return res.status(400).json({ error: "Os campos 'name' e 'descricao' são obrigatórios." });
    }

    const newTask = await Tarefas.query().insertAndFetch({
      name,
      descricao,
    });

    res.json(newTask);
  } catch (err) {
    next(err);
  }
}

async function put(req, res, next) {
  try {
    const { params, body } = req;
    const taskId = params.id;

    if (!taskId) {
      return res.status(400).json({ error: "ID da tarefa não fornecido." });
    }

    const { name, descricao } = body;
    if (!name || !descricao) {
      return res.status(400).json({ error: "Os campos 'name' e 'descricao' são obrigatórios." });
    }

    const updatedTask = await Tarefas.query().updateAndFetchById(taskId, {
      name,
      descricao,
      ativo: body.ativo !== undefined ? body.ativo : 1
    });

    if (!updatedTask) {
      return res.status(404).json({ error: "Tarefa não encontrada." });
    }

  
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
}



async function deletar(req, res, next) {
  try {
    const { params } = req;
    const taskId = params.id;

    const taskbyid = await Tarefas.query().deleteById(taskId);

    res.json(taskbyid);
  } catch (err) {
    next(err);
  }
}



export {get, getById, post, put, deletar}