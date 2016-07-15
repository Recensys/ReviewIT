/**
 * Created by jbec on 08/06/2016.
 */

import {Injectable} from "@angular/core";
import {Phase} from "./model/phase.model";
import {Task} from "./model/task.model"
import {Field, Data} from "./model/field.model";
import {StringField} from "./fields/string.field";
import {NumberField} from "./fields/number.field";
import {ResourceField} from "./fields/resource.field";
import {BooleanField} from "./fields/boolean.field";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {APIService} from './services/api.service';


@Injectable()
export class TaskService {


  constructor(private _APIService : APIService){}

  private _fields: Field[] = [
    new StringField ({name: "author", input: false }),
    new StringField ({ name: "title", input: false }),
    new NumberField ({ name: "year", input: false, min: 0 }),
    new ResourceField ({ name: "pdf", input:false }),
    new StringField ({ name: "abstract", input: false }),
    new BooleanField ({ name: "isGsd?", input: true, trueval: "yes", falseval: "no" })
  ];

  private _data: Data[] = [
    { id: 1, field: this._fields[0], value: "Paulish, D.J. and Carleton, A.D." },
    { id: 2, field: this._fields[1], value: "Case studies of software-process-improvement measurement" },
    { id: 3, field: this._fields[2], value: 1994 },
    { id: 4, field: this._fields[3], value: "http://nexgsd.org/wp-content/uploads/2013/09/BjornEtal2014b.pdf" },
    { id: 5, field: this._fields[4], value: "Describes an ongoing research project conducted jointly by Siemens and the Software Engineering Institute. Siemens software-development organizations in Germany and the United States are case-study sites at which we measure the effect of methods to improve the software-development process. To observe and quantify the impact of software-process improvement, we must measure the performance of a software-development organization over time. Comparison of performance across organizations is very difficult, since organizations define measures and collect performance data in different ways. However, we can separately track performance improvement in each organization if it defines measures consistently and develops similar products. We have defined basic measures for performance of a software-development organization. We limited ourselves to a small number of simple measures to reduce the complexity of collecting, analyzing, and maintaining the performance data. Improving the software-development process improves the quality of software products and the overall performance of the software-development organization. However, process is only one of several controllable factors in improving software quality and organization performance. Others include the skills and experience of the people developing the software, the technology used (e.g. CASE tools), product complexity, and environmental characteristics such as schedule pressure and communications." },
    { id: 6, field: this._fields[5], value: true }
  ];

  private _tasks: Task[] = [
    {
      id: 1,
      state: 2,
      data: this._data
    }
  ];

  private _phases: Phase[] = [
    {
      id: 1,
      name: "Stage 1",
      description: "based on the title assess whether the paper is related to global software engineering",
      fields: this._fields,
      tasks: this._tasks
    },
    {
      id: 2,
      name: "Stage 2",
      description: "based on the title assess whether the paper is related to global software engineering",
      fields: this._fields,
      tasks: this._tasks
    }
  ];

  
  public getPhases(): Promise<Phase[]> {
    return Promise.resolve(this._phases).then(list => list);
  }

  public getPhase(id:number): Promise<Phase> {
    return Promise.resolve(this._phases).then(phases => phases.find(phase => phase.id === id));
  }

  public getTask(id:number): Promise<Task> {
    return Promise.resolve(this._tasks).then(tasks => tasks.find(task => task.id === id));
  }
  
  
  public getTasks(uid: number){
    
  }
}
