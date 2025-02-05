import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Redirect,
  Render,
  Req,
  Request,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diarista } from './diarista.entity';

interface CreateDiarista {
  name: string;
  endereco: string;
  idade: number;
}

@Controller('diaristas')
export class DiaristaController {
  constructor(
    @InjectRepository(Diarista)
    private diaristaRepository: Repository<Diarista>,
  ) {}

  @Get('')
  @Render('listar_diaristas')
  async listarDiaristas() {
    return {
      diaristas: await this.diaristaRepository.find(),
      titulo: 'Lista de Diaristas',
    };
  }

  @Get(':id/edit')
  @Render('edit')
  async edit(@Param('id') id: number) {
    const diarista = await this.diaristaRepository.findOneBy({ id: id });

    return { diarista: diarista };
  }

  @Patch(':id')
  @Redirect('/diaristas')
  async update(@Param('id') id: number, @Req() request: Request) {
    const diarista = await this.diaristaRepository.findOneBy({ id: id });
    const body = request.body as unknown as CreateDiarista;

    if (diarista) {
      diarista.name = body.name;
      diarista.endereco = body.endereco;
      diarista.idade = body.idade;

      return await this.diaristaRepository.save(diarista);
    }
  }

  @Get('show/:id')
  @Render('detalhes')
  async exibirDiarista(@Param('id') id: number) {
    return {
      diarista: await this.diaristaRepository.findOneBy({ id: id }),
      titulo: 'Diarista',
    };
  }

  @Get('create')
  @Render('create')
  createView() {
    //
  }

  @Post()
  @Redirect('/diaristas')
  async create(@Req() request: Request) {
    const body = request.body as unknown as CreateDiarista;

    const diarista = new Diarista();
    diarista.name = body.name;
    diarista.endereco = body.endereco;
    diarista.idade = body.idade;

    return await this.diaristaRepository.save(diarista);
  }

  @Delete(':id')
  @Redirect('/diaristas')
  async delete(@Param('id') id: number) {
    return await this.diaristaRepository.delete(id);
  }
}
