"use strict";

import * as http from 'http';
import * as url from 'url';
import Controller from '../../Controller';
import NormalApiView from '../../../View/Api/NormalApiView';

class LiveProgramController extends Controller {
    public execute(parsedUrl: url.Url, _request: http.ServerRequest, response: http.ServerResponse, _postData: string): void {
        this.log.access.info("controller 'LiveProgramController' was called.");

        let querystring = require('querystring');
        let q = (parsedUrl.search === null || parsedUrl.search === undefined) ? undefined :  parsedUrl.search.substring(1);
        let type = querystring.parse(q).type;
        let time = querystring.parse(q).time;
        if(typeof time == "undefined") { time = 0; }

        let model = this.modelFactory.get("LiveProgramModel");
        model.setOption({ type: type, time: Number(time) });

        let view = new NormalApiView(response, "LiveProgramModel");
        view.setModels({ LiveProgramModel: model });

        model.addViewEvent(view);
        model.execute();
    }
}

export default LiveProgramController;

