import {Injectable} from '@angular/core';
import {Subject}    from 'rxjs/Subject';

@Injectable()
export class NodeDisplayService {
  public node = new Subject<any>();
  public node$ = this.node.asObservable();
  // constructor() { }
  // private node:Subject<Node> = new BehaviorSubject<Node>();
  public addNode(data: any) {
    this.node.next(data);
  }

  public getNode() {
    return this.node$;
  }

}
