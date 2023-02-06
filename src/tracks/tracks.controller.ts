import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Header,
} from '@nestjs/common';
import { Put } from '@nestjs/common/decorators';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './tracks.model';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}
  @Get()
  @Header('content-type', 'application/json')
  findAll() {
    return this.tracksService.getAll();
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  findOne(@Param('id', ParseUUIDPipe) id: string): Track {
    return this.tracksService.getOne(id);
  }

  @Post()
  @Header('content-type', 'application/json')
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.remove(id);
  }
}
