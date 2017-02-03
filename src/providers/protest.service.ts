import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { CONFIG_TOKEN, IConfig } from '../providers/config';
import { LoggerService } from './logger.service';
import { HttpClient } from '../base';
import {Observable} from 'rxjs';

@Injectable()
export class ProtestService {

  public currentProtest:any = { id: 1 };
  private interval: number;
  private hasHttpError: boolean = false;

  constructor(private http: HttpClient, @Inject(CONFIG_TOKEN) private config: IConfig) {
  }

  checkIn(data:any)
  { 
    console.log(this.hasHttpError);
    if (this.hasHttpError)
      return;
    var obs = this.http.post('/', data);
    console.log('posting...');
    
    obs
    .timeout(2000)
    .map(res=>res.json()).subscribe(res => {
      this.currentProtest = res;
    },
      err => {
        this.handleError(data)
      }
    )
    
    return obs;
  }

  private handleError(data)
  {
    this.hasHttpError=true;
      if(localStorage['queue']){
        let queue: any[] = JSON.parse(localStorage['queue']);
        if (!queue.find(itm => itm.uuid === data.uuid && itm.ts === data.ts))
        {
          queue.push(data);
          localStorage['queue'] = JSON.stringify(queue);
          if (!this.interval)
            this.interval = setInterval(()=> {
              this.processQueue();
            }, 3000);
        }
      }
      else
      {
        localStorage['queue'] = JSON.stringify([data]);
        if (!this.interval)
          this.interval = setInterval(()=> {
            this.processQueue();
          }, 3000);
      }
  }

  public processQueue(){
      console.log(localStorage['queue']);
    if (localStorage['queue'])
    {
      this.hasHttpError = false;
      let queue: any[] = JSON.parse(localStorage['queue']);
      //ping the service
      this.checkIn(queue[0]).subscribe(res => {
        queue.splice(0,1);
        queue.forEach(data=>{
          this.checkIn(data);
        });
        clearInterval(this.interval);
        this.interval = undefined;
        localStorage.removeItem('queue');

      });
    }
  }
}
