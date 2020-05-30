import {LinkModel} from "./link.model";
import {AnimalModel} from "./animal.model";

export class BaseResource {
  links?: LinkModel[];

  getSelfLink(): string {
    return this.getLinkRel('self');
  }

  getLinkRel(rel: string): string {
    for (let link of this.links) {
      if (link.rel === rel) {
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

