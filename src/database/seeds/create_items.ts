import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('items').insert([
        { title: 'Energia', image: 'lampadas.svg' },
        { title: 'Fontes Renovaveis', image: 'baterias.svg' },
        { title: 'Processos', image: 'papeis-papelao.svg' },
        { title: 'TI', image: 'eletronicos.svg' },
        { title: 'Meio Ambiente', image: 'organicos.svg' },
        { title: 'Cozinha', image: 'oleo.svg' },
    ])
}