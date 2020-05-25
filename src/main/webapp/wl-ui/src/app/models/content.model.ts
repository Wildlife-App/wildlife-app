export class ContentModel<T> {
  constructor(rel: string, value: T) {
    this.rel = rel;
    this.value = value;
  }

  rel: string;
  value: T;

  static fromData(data): ContentModel<any> {
    return new ContentModel(data.rel, data.value);
  }
}
