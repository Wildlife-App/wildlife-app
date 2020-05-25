import {LinkModel} from "./link.model";

export class BaseResource {
  links?: LinkModel[];

  getSelfLink(): string {
    for (let link of this.links) {
      if (link.rel === 'self') {
        return link.href;
      }
    }
    return undefined;
  }

  fromLinks(fromLinks: LinkModel[]): LinkModel[] {
    if (!fromLinks) {
      return [];
    }
    const links: LinkModel[] = [];
    fromLinks.forEach(fromLink => links.push(LinkModel.fromLink(fromLink)));
    return links;
  }
}
