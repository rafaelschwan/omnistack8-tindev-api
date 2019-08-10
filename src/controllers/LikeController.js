const Dev = require("../models/Dev");

module.exports = {
  async store(req, res) {
    // Pega as informacoes adicionais
    const { user } = req.headers;
    const { devId } = req.params;

    // Faz a consulta no mongo colocando nas consts os dados dos usuarios
    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    // Verifica se o dev existe no banco
    if (!targetDev) {
      return res.status(400).json({ error: "Dev not exists" });
    }

    // Caso haja a reciprocidade de likes, avisa que deu match :D
    if (targetDev.likes.includes(loggedDev._id)) {
      console.log("Deu match");
    }

    // Atualiza o vetor de likes e salva/atualiza no banco
    loggedDev.likes.push(targetDev._id);
    await loggedDev.save();

    // Retorno da api com informacoes do usuario logado
    return res.json(loggedDev);
  }
};
