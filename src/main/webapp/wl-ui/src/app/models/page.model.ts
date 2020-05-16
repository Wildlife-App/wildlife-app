export class PageModel {
  constructor(private _size: number, private _totalElements: number,
              private _totalPages: number, private _current: number) {
  }

  get size(): number {
    return this._size;
  }

  get totalElements(): number {
    return this._totalElements;
  }

  get totalPages(): number {
    return this._totalPages;
  }

  get current(): number {
    return this._current;
  }

  static fromPageObject(pageObject: any): PageModel {
    return new PageModel(+pageObject['size'], +pageObject['totalElements'], +pageObject['totalPages'], +pageObject['number']);
  }
}
