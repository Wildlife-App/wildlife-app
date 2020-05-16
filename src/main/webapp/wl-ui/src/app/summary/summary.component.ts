import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http.service";
import {Animal} from "../models/animal";
import {TourModel} from "../models/tour.model";
import {LinkModel} from "../models/link.model";
import {formatUrl} from "../app.component";
import {PageModel} from "../models/page.model";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(private httpService: HttpService) {
  }

  private tours: TourModel[] = [];
  private recordPerPage: number = 3;
  private prevLinkUrl: string = '#';
  private nextLinkUrl: string = '#';
  private currentPage: number = 0;
  private startRecordIndex: number = 0;
  private endRecordIndex: number = 0;
  private totalRecords: number = 0;

  ngOnInit() {
    const url: string = '/tours?page=' + this.currentPage + '&size=' + this.recordPerPage;

    setTimeout(() => {
        this.loadData(formatUrl(url));
      },
      3000);

  }

  next() {
    if (this.nextLinkUrl === '#') {
      return false;
    }
    this.loadData(this.nextLinkUrl);
  }

  prev() {
    if (this.prevLinkUrl === '#') {
      return false;
    }
    this.loadData(this.prevLinkUrl);
  }

  private loadData(url: string) {
    this.httpService.getResource(url).subscribe(data => {
      this.tours.length = 0;
      console.log('Tours fetched', data);
      for (let item of <TourModel[]>data.content) {
        if (item && item.resourceId && item.resourceId > 0) {
          this.tours.push(TourModel.fromDataForView(item));
        }
      }
      const links: LinkModel[] = <LinkModel[]>data.links;
      this.setLinks(links);

      console.log('data.page: ', data.page);
      const page: PageModel = PageModel.fromPageObject(data.page);
      console.log('parsed page: ', page);
      this.setPages(page);
      console.log('this.prevLinkUrl:', this.prevLinkUrl);
      console.log('this.nextLinkUrl:', this.nextLinkUrl);
      console.log('Printing tours: ', this.tours);
    }, error => {
      console.log('Error fetching tour records.', error);
    });
  }

  private setPages(page: PageModel): void {
    const startIndex: number = page.current * this.recordPerPage;
    this.startRecordIndex = startIndex + 1;
    this.endRecordIndex = (startIndex + this.recordPerPage) < page.totalElements
      ? (startIndex + this.recordPerPage) : page.totalElements;
    this.totalRecords = page.totalElements;
  }

  private setLinks(links: LinkModel[]): void {
    let prevFound: boolean = false;
    let nextFound: boolean = false;
    for (let link of links) {
      if (link.rel === 'prev') {
        this.prevLinkUrl = link.href;
        prevFound = true;
      }
      if (link.rel === 'next') {
        this.nextLinkUrl = link.href;
        nextFound = true;
      }
    }
    if (!prevFound) {
      this.prevLinkUrl = '#';
    }
    if (!nextFound) {
      this.nextLinkUrl = '#';
    }
    console.log('Previous: ', this.prevLinkUrl);
    console.log('Next: ', this.nextLinkUrl);
  }
}
