import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../services/app.service';
import { ActivatedRoute } from '@angular/router';
import { IShow, ISeason, IEpisode, IGenre } from '../app.interface';
import { PipeTransform, Pipe } from '@angular/core';

import * as _ from 'lodash';


@Component({
    selector: 'tv-season',
    template: require('./tvseason.component.html'),
    styles: [require('./tvseason.component.css').toString()]
})

export class TvSeasonComponent implements OnInit {

    @Input() public seasonNumber: number;
    @Input() public show: IShow;
    @Input() public sortByKey: string;

    constructor(private appService: AppService) { }

    ngOnInit() {

    }

} 