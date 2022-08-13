"use strict";

import * as http from 'http';
import * as url from 'url';
import Controller from '../../Controller';
import NormalApiView from '../../../View/Api/NormalApiView';

class ProgramController extends Controller {
    public execute(parsedUrl: url.Url, _request: http.ServerRequest, response: http.ServerResponse, _postData: string): void {
        this.log.access.info("controller 'ProgramController' was called.");

	let querystring = require('querystring');
        let q = (parsedUrl.search === null || parsedUrl.search === undefined) ? undefined :  parsedUrl.search.substring(1);
        let type = querystring.parse(q).type;
        let time = querystring.parse(q).time;
        let length = querystring.parse(q)["length"];
        let ch = querystring.parse(q).ch;

        this.log.access.info("type = " + type);
        this.log.access.info("time = " + time);
        let model = this.modelFactory.get("ProgramModel");
        model.setOption({ type: type, time: time, length: Number(length), ch: ch });

        let view = new NormalApiView(response, "ProgramModel");
        view.setModels({ ProgramModel: model });

        model.addViewEvent(view);
        model.execute();
    }
}

export default ProgramController;

