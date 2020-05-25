export class LinkModel {
  constructor(rel: string, href: string) {
    this.rel = rel;
    this.href = href;
  }

  rel: string;
  href: string;

  equals(anotherLink: LinkModel): boolean {
    return anotherLink && anotherLink.rel === this.rel && anotherLink.href === this.href;
  }

  static fromLink(anotherLink: LinkModel): LinkModel {
    const anotherHref: string = anotherLink.href;

    return new LinkModel(anotherLink.rel,
      (anotherHref && anotherHref.indexOf('{?projection}') > -1) ?
        anotherHref.replace('{?projection}', '') :
        anotherHref);
  }
}
