"use strict";

import * as http from 'http';
import * as url from 'url';
import Controller from '../../Controller';
import NormalApiView from '../../../View/Api/NormalApiView';

class ProgramController extends Controller {
    public execute(parsedUrl: url.Url, _request: http.ServerRequest, response: http.ServerResponse, _postData: string): void {
        this.log.access.info("controller 'ProgramController' was called.");

	var querystring = require('querystring');
        let type = querystring.parse(parsedUrl.query).type;
        let time = querystring.parse(parsedUrl.query).time;
        let length = querystring.parse(parsedUrl.query)["length"];
        let ch = querystring.parse(parsedUrl.query).ch;

        let model = this.modelFactory.get("ProgramModel");
        model.setOption({ type: type, time: time, length: Number(length), ch: ch });

        let view = new NormalApiView(response, "ProgramModel");
        view.setModels({ ProgramModel: model });

        model.addViewEvent(view);
        model.execute();
    }
}

export default ProgramController;

