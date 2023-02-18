import { Injectable } from '@nestjs/common';
import { api, shikimori_api } from 'src/constants';

const newTitlesUrl = '?season=2023&status=ongoing&order=ranked&limit=10';

@Injectable()
export class HomeService {
  getNewTitles() {
    // const animes = api<[any]>(shikimori_api + 'animes' + newTitlesUrl);

    return newTitlesUrl;
  }
}
