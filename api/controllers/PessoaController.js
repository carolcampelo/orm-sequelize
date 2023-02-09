const { DatabaseError } = require('sequelize');
const db = require('../models');

class PessoaController {
    static async pegaTodasAsPessoas(req, res){
        try {
            const todasAsPessoas = await db.Pessoas.findAll();
            return res.status(200).json(todasAsPessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaPessoa(req,res){
        const { id } = req.params;
        try {
            const umaPessoa = await db.Pessoas.findOne({
                where: {
                    id: Number(id) 
                }
            });
            return res.status(200).json(umaPessoa);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body;
        try {
            const novaPessoaCriada = await db.Pessoas.create(novaPessoa);
            return res.status(200).json(novaPessoaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaPessoa(req,res) {
        const { id } = req.params;
        const novasInfos = req.body;
        try {
            await db.Pessoas.update(novasInfos, {where: {id: Number(id)}})
            const pessoaAtualizada = await db.Pessoas.findOne({where: {id: Number(id)}});
            return res.status(200).json(pessoaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async apagaPessoa(req, res) {
        const { id } = req.params;

        try {
            await db.Pessoas.destroy({where: {id: Number(id)}});
            return res.status(200).json({message: `O registro de ID ${id} foi deletado.`})
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController;